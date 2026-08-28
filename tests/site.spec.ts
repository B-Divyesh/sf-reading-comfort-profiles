import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('landing page presents the product and a working download', async ({ page, request }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto('/');
  await expect(page).toHaveTitle(/Reading Comfort Profiles/);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('heading', { name: /Fit the web/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download for Chrome/ })).toHaveAttribute('download', '');
  const download = await request.get('/downloads/reading-comfort-profiles-chrome.zip');
  expect(download.ok()).toBeTruthy();
  expect((await download.body()).byteLength).toBeGreaterThan(10_000);
  expect(consoleErrors).toEqual([]);
});

test('landing page has no serious accessibility violations', async ({ page }) => {
  await page.goto('/');
  // Axe's broad Playwright peer range can resolve a newer Page type than the pinned browser runner.
  const results = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
});

test('legal pages are reachable and semantic', async ({ page }) => {
  for (const path of ['/privacy/', '/terms/']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
  }
});

test('mobile layout stays within the viewport and keeps the primary action visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Download for Chrome/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
