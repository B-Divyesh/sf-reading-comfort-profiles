import { expect, test, chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdtempSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

test('unpacked extension applies, switches, and pauses a domain profile', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'One extension smoke test is sufficient.');
  const userDataDir = mkdtempSync('/tmp/rcp-extension-test-');
  const extensionPath = resolve('.output/chrome-mv3');
  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'chromium',
    headless: true,
    args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
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
    await popup.click('#site-toggle');
    await workPage.waitForSelector('html:not([data-reading-comfort])');
    await expect(workPage.locator('#reading-comfort-profiles-style')).toHaveCount(0);
  } finally {
    await context.close();
    rmSync(userDataDir, { recursive: true, force: true });
  }
});
