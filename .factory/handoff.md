# Handoff — Reading Comfort Profiles v1

## What shipped

- A production WXT + TypeScript Manifest V3 extension with three starter profiles and custom profile creation/deletion.
- Per-domain profile assignment and pause state, saved only in `browser.storage.local`.
- Conservative semantic styling for prose, lists, code, tables, line height, contrast, large cursor, and keyboard focus; navigation and control typography are not globally resized.
- Valid Chrome keyboard commands: `Alt+Shift+R` toggles the current domain, `Alt+Shift+.` selects the next profile, and `Alt+Shift+,` selects the previous profile.
- Explicit loading, unsupported-page, storage-error, save-feedback, deletion-confirmation, and paused states in the popup.
- A responsive, offline-capable static landing site at `dist/site/`, with a packaged Chrome extension at `dist/site/downloads/reading-comfort-profiles-chrome.zip` and an unpacked copy at `dist/extension/`.
- Privacy and terms pages, MIT license, complete README, robots/sitemap, service worker, and no runtime analytics, remote fonts, or third-party scripts.
- A product-specific “glacial minimal ceramics” system in `.factory/design.md` and one original factory-generated hero image. The reviewed responsive WebP exports are 18 KB and 50 KB; provenance and the exact prompt are stored alongside the source.

## Verification

Run the full local gate with:

```sh
npm install
npm run verify
```

Verified on 2026-08-28:

- `npm run check`: passed with strict TypeScript.
- `npm test`: 7/7 unit tests passed.
- `npm run build`: passed; WXT extension total is 49.46 KB and Vite emitted `dist/site/index.html`.
- `npm run test:e2e`: 9 passed, 1 intentionally skipped duplicate. Desktop and 390 px mobile checks cover semantics, download integrity, console errors, legal pages, and overflow. The desktop extension test loads the unpacked MV3 build in Chromium, confirms content-script injection, changes the domain profile, pauses the domain, and runs axe on the popup.
- Axe: no serious or critical findings on the landing site or extension popup.
- Lighthouse 13 mobile simulated: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5 s, CLS 0, total blocking time 0 ms.
- Budgets: initial site JS 0.99 KB, CSS 14.48 KB, no webfonts, hero sources 18 KB/50 KB; all below contract limits.
- Manual screenshot review at 1440×1000 and 390×844 confirmed visual hierarchy and responsive stacking.

## Build outputs

- Static deploy root: `dist/site/`
- Extension archive: `dist/site/downloads/reading-comfort-profiles-chrome.zip`
- Unpacked extension: `dist/extension/`

The exact deploy build command is `npm run build:site`.

## Known gaps and honest limits

- Distribution is an unsigned ZIP for local/unpacked Chromium installation. Store signing and publication are factory deployment work.
- Canvas-rendered text, cross-origin embedded frames, closed shadow roots, and browser-internal pages cannot be restyled.
- The extension deliberately does not force page colors or replace semantic structure; site-specific CSS can occasionally override or visually conflict with a profile. The per-domain pause command is the immediate recovery path.
- Firefox and Safari packages were not produced in v1; the implementation targets Chromium MV3 as ordered.
