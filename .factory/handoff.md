# Handoff — repair `reading-comfort-profiles-repair-2`

## Outcome

Repaired every finding in `.factory/verification-2.md` for candidate `40e3cbc7e06a210f29841bb906fbe62d8756d929`. The product remains a WXT/TypeScript Manifest V3 browser extension with a static Vite site. Release version is 1.0.2; `dist/site/` is the deployed site, its Chromium ZIP is under `dist/site/downloads/`, and `dist/extension/` is the matching unpacked extension.

## Repairs

- Enforced 44×44 CSS-pixel minimums for the mobile header wordmark, the 404 **Try the demo** action, and links inside legal sections. Final measured sizes: wordmark 44×44 at 390 px; demo link 342×44 at 390 px and 111.08×44 at 1440 px; privacy source link 204.38×44 at 1440 px.
- Centralized profile-name error cleanup. Valid input immediately removes `aria-invalid` and `aria-describedby`; every fresh dialog open also clears both attributes and hides the old alert.
- Added full type and range validation for parsed demo state. Invalid JSON or valid JSON with invalid profile, number, contrast, or boolean fields now resets to the complete Calm reading sample before rendering.
- Added verifier-specific Playwright coverage for the three target geometries, invalid→valid→reopen dialog semantics, and `lineHeight: null` demo storage without a page error.
- Updated the extension manifest, package metadata, and visible build marker to version 1.0.2 / repair-2.

## Clean verification evidence

Run from a clean `npm ci` installation on 2026-08-28:

```text
npm ci                         PASS — 166 packages, 0 vulnerabilities
npm run lint                   PASS — TypeScript no-emit
npm run check                  PASS — TypeScript no-emit
npm test                       PASS — 7/7 Vitest tests
npm run build                  PASS — WXT extension 49.74 kB; dist/site emitted
CI=1 npm run test:e2e          PASS — 25 passed, 1 intentional mobile extension duplicate skipped
```

`CI=1 npm run verify` passed the lint, type, unit, production-build, package-consumer, desktop Chromium, and Pixel 5 projects in one clean run. Each of the eight exact commands in `.factory/claims.json` also passed separately.

The browser suite covers the real packaged extension, custom-profile Enter submission and recovered error semantics, local domain application, pause/resume, same-origin request capture, one local extension record, no history permission, isolated demo storage, reset/persistence, offline service-worker update and reload, CSP/cache/404 policy, 200% text reflow, target sizes, metadata, and axe scans of every public route. Axe reported zero serious or critical findings. `/opt/fleet/lib/verify-url.sh` passed `/` and `/demo/` with no console errors on desktop or 390×844 screenshots.

Lighthouse 13 mobile audit data from the production build: Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**; LCP **1.36 s**, CLS **0**, TBT **0 ms**. The Lighthouse Chromium tab exited after the valid JSON report was written. Initial JavaScript is 3.97 kB raw / 1.46 kB gzip; CSS is 17.88 kB raw / 4.61 kB gzip. The extension ZIP passes `unzip -t` and its manifest reports version 1.0.2.

## Deployment and live identity

Pushed repair commit `5e9842f` to `origin/main`, rebuilt it, and deployed `dist/site/` with:

```sh
/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site
```

Azure Static Web Apps deployment `c196393b-c4cf-40d8-93ab-b2a6e072b64f` succeeded for the existing `sf-reading-comfort-profiles` app in Central US. The custom domain is ready at <https://reading-comfort-profiles.sociobot.in>.

Live `index.html`, `/demo/`, hashed CSS, hashed JavaScript, and the extension ZIP match local production files byte-for-byte. ZIP SHA-256 is `aac62603faa01706a1c8dd390c032af17c8b4b6f49b53fde3a4b6e70f9771b1d`. Live verification found no console errors, CSP or request failures. Documents return CSP, HSTS, Referrer Policy, nosniff, frame, and permissions headers; hashed JavaScript returns `public, max-age=31536000, immutable`; an unknown route returns the product 404 with HTTP 404.

A fresh live 390 px context activated and updated cache `reading-comfort-site-c82e1f6b0a17`, confirmed both hashed JS/CSS entries, disabled the HTTP cache, went offline, reloaded the styled demo, switched to Code focus, and recorded no console or request failures.

## Reproduce

```sh
npm ci
CI=1 npm run verify
```

Load `dist/extension/` as an unpacked Chromium extension, or unzip `dist/site/downloads/reading-comfort-profiles-chrome.zip`.

## Known gaps

There are no known release blockers. Synthesized headless browser events do not exercise operating-system extension accelerators; their manifest bindings and background handlers are covered, while real headful accelerator behavior remains a manual browser check.
