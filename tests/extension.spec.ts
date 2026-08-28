import { expect, test, chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdtempSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

test('@claim:chromium-package @claim:per-domain-profiles @claim:semantic-layout @claim:table-spacing @claim:setting-ranges @claim:focus-cursor-visibility @claim:starter-profiles @claim:custom-profile-clone @claim:contrast-treatments @claim:extension-privacy @claim:content-preservation @claim:profile-deletion @claim:unsupported-pages verifies the packaged extension end to end', async ({}, testInfo) => {
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
    await workPage.goto('http://127.0.0.1:4173/demo/?extension-fixture=1');
    await workPage.waitForSelector('html[data-reading-comfort="calm-reading"]');
    await expect(workPage.locator('#reading-comfort-profiles-style')).toHaveCount(1);
    await workPage.locator('#demo-tables').uncheck();
    const originalContent = await workPage.locator('main').evaluate((main) => ({
      text: main.textContent,
      elements: main.querySelectorAll('*').length,
      table: main.querySelector('table')?.innerHTML
    }));
    const stableBefore = await workPage.evaluate(() => {
      const heading = document.querySelector('h1')!;
      const button = document.querySelector<HTMLButtonElement>('#reset-demo')!;
      const box = button.getBoundingClientRect();
      return { headingFont: getComputedStyle(heading).fontSize, buttonFont: getComputedStyle(button).fontSize, width: box.width, height: box.height };
    });

    const popup = await context.newPage();
    await workPage.bringToFront();
    await popup.goto(`chrome-extension://${extensionId}/popup.html`);
    await popup.waitForSelector('#settings:not(.hidden)');
    await expect(popup.locator('#domain-label')).toHaveText('127.0.0.1');
    await expect(popup.locator('h1')).toHaveCount(1);
    await expect(popup.locator('#profile-select option')).toHaveText(['Calm reading', 'Balanced work', 'Code focus']);
    await expect(popup.locator('#font-size')).toHaveAttribute('min', '14');
    await expect(popup.locator('#font-size')).toHaveAttribute('max', '28');
    await expect(popup.locator('#line-height')).toHaveAttribute('min', '1.2');
    await expect(popup.locator('#line-height')).toHaveAttribute('max', '2');
    await expect(popup.locator('#code-size')).toHaveAttribute('min', '13');
    await expect(popup.locator('#code-size')).toHaveAttribute('max', '26');

    const accessibility = await new AxeBuilder({ page: popup as never })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibility.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);

    await popup.selectOption('#profile-select', 'code-focus');
    await workPage.waitForSelector('html[data-reading-comfort="code-focus"]');
    await popup.locator('#font-size').fill('14');
    await popup.locator('#line-height').fill('1.2');
    await popup.locator('#code-size').fill('13');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain('--rcp-font-size: 14px');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain('--rcp-line-height: 1.2');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain('--rcp-code-size: 13px');
    await popup.locator('#font-size').fill('28');
    await popup.locator('#line-height').fill('2');
    await popup.locator('#code-size').fill('26');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain('--rcp-font-size: 28px');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain('--rcp-line-height: 2');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain('--rcp-code-size: 26px');

    const adjustedStyles = await workPage.evaluate(() => ({
      paragraph: getComputedStyle(document.querySelector('.demo-document p')!).fontSize,
      code: getComputedStyle(document.querySelector('.demo-document code')!).fontSize,
      heading: getComputedStyle(document.querySelector('h1')!).fontSize,
      button: getComputedStyle(document.querySelector('#reset-demo')!).fontSize,
      buttonBox: (() => { const box = document.querySelector('#reset-demo')!.getBoundingClientRect(); return { width: box.width, height: box.height }; })()
    }));
    expect(adjustedStyles.paragraph).toBe('28px');
    expect(adjustedStyles.code).toBe('26px');
    expect(adjustedStyles.heading).toBe(stableBefore.headingFont);
    expect(adjustedStyles.button).toBe(stableBefore.buttonFont);
    expect(adjustedStyles.buttonBox.width).toBeCloseTo(stableBefore.width, 1);
    expect(adjustedStyles.buttonBox.height).toBeCloseTo(stableBefore.height, 1);

    for (const [value, filter] of [['standard', 'contrast(1)'], ['stronger', 'contrast(1.14)'], ['maximum', 'contrast(1.28)']] as const) {
      await popup.selectOption('#contrast', value);
      await expect.poll(() => workPage.locator('.demo-document p').evaluate((item) => getComputedStyle(item).filter)).toBe(filter);
    }

    const focusCss = await workPage.locator('#reading-comfort-profiles-style').textContent();
    expect(focusCss).toContain('cursor: url("data:image/svg+xml');
    expect(focusCss).toContain('outline: 3px solid #b7e065');
    expect(contrastRatio('#b7e065', '#173d3a')).toBeGreaterThanOrEqual(4.5);

    const tableBefore = await workPage.locator('.demo-document td').first().evaluate((cell) => getComputedStyle(cell).paddingTop);
    await popup.click('#table-toggle');
    await expect.poll(() => workPage.locator('#reading-comfort-profiles-style').textContent()).toContain(':where(th, td)');
    const tableAfter = await workPage.locator('.demo-document td').first().evaluate((cell) => getComputedStyle(cell).paddingTop);
    expect(parseFloat(tableAfter)).toBeGreaterThan(parseFloat(tableBefore));
    await expect(workPage.locator('table thead th')).toHaveText(['Request', 'Status']);
    await expect(workPage.locator('table tbody td')).toHaveText(['Finance export', 'Ready', 'Vendor portal', 'Review', 'Team archive', 'Ready']);

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
    const clonedProfile = await popup.evaluate(async () => {
      const stored = await chrome.storage.local.get('readingComfortState');
      const state = stored.readingComfortState as { profiles: Array<Record<string, unknown>>; domainProfiles: Record<string, string> };
      return state.profiles.find((profile) => profile.id === state.domainProfiles['127.0.0.1']);
    });
    expect(clonedProfile).toMatchObject({ name: 'Quiet review', fontSize: 28, lineHeight: 2, codeFontSize: 26, contrast: 'maximum', focusCursor: true, tableSpacing: true });
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

    await workPage.reload();
    await workPage.waitForSelector('html[data-reading-comfort^="quiet-review-"]');
    const secondSameHost = await context.newPage();
    await secondSameHost.goto('http://127.0.0.1:4173/terms/');
    await secondSameHost.waitForSelector('html[data-reading-comfort^="quiet-review-"]');
    const otherHost = await context.newPage();
    await otherHost.goto('http://localhost:4173/privacy/');
    await otherHost.waitForSelector('html[data-reading-comfort="calm-reading"]');

    await workPage.bringToFront();
    const browserZoom = await worker.evaluate(async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      return tab?.id ? chrome.tabs.getZoom(tab.id) : null;
    });
    expect(browserZoom).toBe(1);

    const finalContent = await workPage.locator('main').evaluate((main) => ({
      text: main.textContent,
      elements: main.querySelectorAll('*').length,
      table: main.querySelector('table')?.innerHTML
    }));
    expect(finalContent).toEqual(originalContent);

    await workPage.bringToFront();
    await popup.click('#site-toggle');
    await workPage.waitForSelector('html:not([data-reading-comfort])');
    await expect(workPage.locator('#reading-comfort-profiles-style')).toHaveCount(0);
    await popup.click('#site-toggle');
    await workPage.waitForSelector('html[data-reading-comfort^="quiet-review-"]');
    const localStorageEvidence = await popup.evaluate(async () => ({
      manifestPermissions: chrome.runtime.getManifest().permissions ?? [],
      keys: Object.keys(await chrome.storage.local.get())
    }));
    expect(localStorageEvidence.manifestPermissions).not.toContain('history');
    expect(localStorageEvidence.manifestPermissions).not.toContain('cookies');
    expect(localStorageEvidence.keys).toEqual(['readingComfortState']);
    expect([...networkHosts].sort()).toEqual(['127.0.0.1', 'localhost']);

    await popup.click('#delete-profile-button');
    await expect(popup.locator('#delete-dialog')).toBeVisible();
    await expect(popup.locator('#delete-name')).toHaveText('Quiet review');
    await popup.click('#confirm-delete');
    await expect(popup.locator('#profile-select option:checked')).toHaveText('Calm reading');
    await expect(popup.locator('#profile-select option', { hasText: 'Quiet review' })).toHaveCount(0);

    const internalPage = await context.newPage();
    await internalPage.goto('chrome://extensions/');
    await internalPage.bringToFront();
    await popup.reload();
    await expect(popup.locator('#unsupported-state')).toBeVisible();
    await expect(popup.getByRole('heading', { name: 'This page stays unchanged' })).toBeVisible();
  } finally {
    await context.close();
    rmSync(userDataDir, { recursive: true, force: true });
  }
});

function contrastRatio(foreground: string, background: string): number {
  const luminance = (hex: string): number => {
    const channels = hex.slice(1).match(/.{2}/g)!.map((value) => parseInt(value, 16) / 255)
      .map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
