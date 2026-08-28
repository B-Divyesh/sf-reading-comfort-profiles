import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
import { unzipSync, strFromU8 } from 'fflate';

test('landing page presents the audience, demo, and working download', async ({ page, request }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  await page.goto('/');
  await expect(page).toHaveTitle('Reading Comfort Profiles — Adjust work sites');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('heading', { name: /low-vision reading/i })).toBeVisible();
  await expect(page.getByText(/knowledge workers with low vision/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Try it with sample data/ })).toBeVisible();
  const download = await request.get('/downloads/reading-comfort-profiles-chrome.zip');
  expect(download.ok()).toBeTruthy();
  expect((await download.body()).byteLength).toBeGreaterThan(10_000);
  expect(consoleErrors).toEqual([]);
});

test('@claim:sample-demo opens a seeded, isolated demo in one click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Try it with sample data/ }).click();
  await expect(page).toHaveURL(/\/demo\/$/);
  await expect(page.getByText('Demo — sample data, nothing is saved to your profiles')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quarterly access review' })).toBeVisible();
  await expect(page.getByText('Finance export')).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:reading-comfort-profiles']);
});

test('@claim:profile-settings changes, saves, and resets the sample profile', async ({ page }) => {
  await page.goto('/demo/');
  const font = page.locator('#demo-font');
  await font.fill('24');
  await expect(page.locator('#demo-font-output')).toHaveText('24 px');
  await page.reload();
  await expect(font).toHaveValue('24');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(font).toHaveValue('19');
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('demo:reading-comfort-profiles'))).toBeNull();
});

test('@claim:privacy-local keeps the complete demo flow same-origin and in demo storage', async ({ page }) => {
  const remoteRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin !== 'http://127.0.0.1:4173') remoteRequests.push(request.url());
  });
  await page.goto('/demo/');
  await page.selectOption('#demo-profile', 'code');
  await page.locator('#demo-tables').uncheck();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:reading-comfort-profiles']);
  expect(await page.context().cookies()).toEqual([]);
  expect(remoteRequests).toEqual([]);
});

test('@claim:offline-reload reloads the styled interactive demo offline after one visit', async ({ page, context }) => {
  const failedRequests: string[] = [];
  page.on('requestfailed', (request) => failedRequests.push(`${request.url()} ${request.failure()?.errorText}`));
  await page.goto('/demo/');
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBeTruthy();
  await expect.poll(() => page.evaluate(async () => {
    const urls = (await Promise.all((await caches.keys()).map(async (key) =>
      (await (await caches.open(key)).keys()).map((request) => request.url)
    ))).flat();
    return urls.some((url) => /\/assets\/main-[^/]+\.js$/.test(url))
      && urls.some((url) => /\/assets\/site-[^/]+\.css$/.test(url));
  })).toBeTruthy();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect.poll(() => failedRequests).toEqual([]);
  await page.selectOption('#demo-profile', 'code');
  await expect(page.locator('.demo-preview-head p')).toContainText('Code focus');
  await page.evaluate(() => window.dispatchEvent(new Event('offline')));
  await expect(page.getByText('The saved demo still works.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quarterly access review' })).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(243, 247, 245)');
  await page.locator('#demo-font').fill('23');
  await expect(page.locator('#demo-font-output')).toHaveText('23 px');
});

test('@claim:free-download provides the free Chromium package with no sign-in step', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByText('No account or payment is required.')).toBeVisible();
  const response = await request.get('/downloads/reading-comfort-profiles-chrome.zip');
  expect(response.ok()).toBeTruthy();
  const files = unzipSync(new Uint8Array(await response.body()));
  expect(files['manifest.json']).toBeDefined();
});

test('@claim:keyboard-shortcuts packages all three advertised browser commands', async ({ request }) => {
  const response = await request.get('/downloads/reading-comfort-profiles-chrome.zip');
  const files = unzipSync(new Uint8Array(await response.body()));
  const manifest = JSON.parse(strFromU8(files['manifest.json']!)) as { commands: Record<string, { suggested_key: { default: string } }> };
  expect(manifest.commands['toggle-comfort']?.suggested_key.default).toBe('Alt+Shift+R');
  expect(manifest.commands['next-profile']?.suggested_key.default).toBe('Alt+Shift+Period');
  expect(manifest.commands['previous-profile']?.suggested_key.default).toBe('Alt+Shift+Comma');
});

test('all public pages have semantics, metadata, and no serious axe findings', async ({ page }) => {
  for (const path of ['/', '/demo/', '/privacy/', '/terms/', '/404.html']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const results = await new AxeBuilder({ page: page as never }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? '')), path).toEqual([]);
  }
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social-preview\.jpg$/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
});

test('mobile and 200% text layouts do not overflow and standalone targets reach 44px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/demo/', '/privacy/', '/terms/']) {
    await page.goto(path);
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(1);
  }
  await page.goto('/');
  const targets = await page.locator('.site-header a, footer a, .hero-actions a, .compatibility a').evaluateAll((items) =>
    items.filter((item) => getComputedStyle(item).display !== 'none').map((item) => ({ label: item.textContent?.trim(), height: item.getBoundingClientRect().height }))
  );
  expect(targets.every((target) => target.height >= 44), JSON.stringify(targets)).toBeTruthy();
});

test('verifier regression: standalone links are at least 44 by 44 CSS pixels', async ({ page }) => {
  const expectTargetSize = async (selector: string): Promise<void> => {
    const box = await page.locator(selector).boundingBox();
    expect(box, selector).not.toBeNull();
    expect(box!.width, `${selector} width`).toBeGreaterThanOrEqual(44);
    expect(box!.height, `${selector} height`).toBeGreaterThanOrEqual(44);
  };

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expectTargetSize('.site-header > .wordmark');

  await page.goto('/404.html');
  await expectTargetSize('.hero-actions .text-link');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/privacy/');
  await expectTargetSize('.legal-content a[href^="https://github.com/"]');
});

test('verifier regression: structurally invalid demo storage safely resets', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem('demo:reading-comfort-profiles', JSON.stringify({
      profile: 'calm',
      fontSize: 19,
      lineHeight: null,
      codeSize: 17,
      contrast: 'stronger',
      roomyTables: true
    }));
  });

  await page.goto('/demo/');
  await expect(page.locator('#demo-line')).toHaveValue('1.65');
  await expect(page.locator('#demo-line-output')).toHaveText('1.65×');
  await expect(page.getByRole('heading', { name: 'Quarterly access review' })).toBeVisible();
  expect(pageErrors).toEqual([]);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('demo:reading-comfort-profiles') ?? 'null'))).toMatchObject({
    profile: 'calm', lineHeight: 1.65
  });
});

test('host policy defines CSP, immutable hashed assets, and a true 404 override', () => {
  const policy = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8')) as {
    globalHeaders: Record<string, string>;
    routes: Array<{ route: string; headers: Record<string, string> }>;
    responseOverrides: Record<string, { rewrite: string; statusCode: number }>;
  };
  expect(policy.globalHeaders['Content-Security-Policy']).toContain("default-src 'self'");
  expect(policy.routes.find((route) => route.route === '/assets/*')?.headers['Cache-Control']).toContain('immutable');
  expect(policy.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
});
