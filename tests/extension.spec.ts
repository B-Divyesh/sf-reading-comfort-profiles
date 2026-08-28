import { expect, test, chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdtempSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

test('@claim:per-domain-profiles @claim:extension-privacy applies independent local profiles and supports profile creation with Enter', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'One extension smoke test is sufficient.');
  const userDataDir = mkdtempSync('/tmp/rcp-extension-test-');
  const extensionPath = resolve('dist/extension');
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
  });
  const networkHosts = new Set<string>();
  context.on('request', (request) => {
    if (request.url().startsWith('http')) networkHosts.add(new URL(request.url()).hostname);
  });

  try {
    let worker = context.serviceWorkers()[0];
    if (!worker) worker = await context.waitForEvent('serviceworker');
    const extensionId = new URL(worker.url()).host;
    const workPage = await context.newPage();
    await workPage.goto('http://127.0.0.1:4173/privacy/');
    await workPage.waitForSelector('html[data-reading-comfort="calm-reading"]');
    await expect(workPage.locator('#reading-comfort-profiles-style')).toHaveCount(1);

    const popup = await context.newPage();
    await workPage.bringToFront();
    await popup.goto(`chrome-extension://${extensionId}/popup.html`);
    await popup.waitForSelector('#settings:not(.hidden)');
    await expect(popup.locator('#domain-label')).toHaveText('127.0.0.1');
    await expect(popup.locator('h1')).toHaveCount(1);

    const accessibility = await new AxeBuilder({ page: popup as never })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibility.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);

    await popup.selectOption('#profile-select', 'code-focus');
    await workPage.waitForSelector('html[data-reading-comfort="code-focus"]');
    await popup.click('#new-profile-button');
    await popup.fill('#profile-name', '   ');
    await popup.press('#profile-name', 'Enter');
    await expect(popup.locator('#profile-dialog')).toBeVisible();
    await expect(popup.locator('#profile-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(popup.locator('#profile-name')).toHaveAttribute('aria-describedby', 'name-error');
    await popup.fill('#profile-name', 'Quiet review');
    await popup.press('#profile-name', 'Enter');
    await expect(popup.locator('#profile-dialog')).not.toBeVisible();
    await expect(popup.locator('#profile-select')).toHaveValue(/quiet-review-/);
    await expect(popup.locator('#profile-select option:checked')).toHaveText('Quiet review');
    await popup.click('#new-profile-button');
    await expect(popup.locator('#profile-name')).not.toHaveAttribute('aria-invalid', 'true');
    await expect(popup.locator('#profile-name')).not.toHaveAttribute('aria-describedby', 'name-error');
    await expect(popup.locator('#name-error')).toBeHidden();
    await popup.click('#cancel-profile');

    const switchSizes = await popup.locator('.switch').evaluateAll((switches) => switches.map((item) => {
      const box = item.getBoundingClientRect();
      return { width: box.width, height: box.height };
    }));
    expect(switchSizes.every(({ width, height }) => width >= 44 && height >= 44)).toBeTruthy();

    await popup.click('#site-toggle');
    await workPage.waitForSelector('html:not([data-reading-comfort])');
    await expect(workPage.locator('#reading-comfort-profiles-style')).toHaveCount(0);
    const localStorageEvidence = await popup.evaluate(async () => ({
      manifestPermissions: chrome.runtime.getManifest().permissions ?? [],
      keys: Object.keys(await chrome.storage.local.get())
    }));
    expect(localStorageEvidence.manifestPermissions).not.toContain('history');
    expect(localStorageEvidence.keys).toEqual(['readingComfortState']);
    expect([...networkHosts]).toEqual(['127.0.0.1']);
  } finally {
    await context.close();
    rmSync(userDataDir, { recursive: true, force: true });
  }
});
