# Handoff — repair `reading-comfort-profiles-repair-1`

## Outcome

Repaired every release-blocking finding in the independent verification of candidate `b336883608d9e4131fd0607d7b87e64b333c2e62`. The artifact remains a Manifest V3 WXT/TypeScript browser extension with a static Vite landing site. The deployable static output is `dist/site/`; the packaged extension is `dist/site/downloads/reading-comfort-profiles-chrome.zip` and the matching unpacked consumer artifact is `dist/extension/`.

## Repairs

- Added the required `.factory/claims.json` with eight observable, tagged Playwright claim tests. They cover the sample demo, reset/persistence, local-only privacy, offline reload, package download, command manifest, per-domain application, and extension privacy.
- Added `/demo/`, its direct first-screen **Try it with sample data** action, an isolated `demo:reading-comfort-profiles` storage key, seeded document/code/table sample, persistent demo banner, **Reset demo**, and **Start for real**. `.factory/demo.md` documents the sandbox.
- Rewrote the first-screen audience statement to name knowledge workers with low vision and explain their web-app reading-settings problem.
- Rebuilt the service-worker pipeline: `scripts/finalize-site.mjs` writes a versioned precache after Vite has emitted the hashed CSS/JS. The fetch handler returns cached matching assets and never substitutes HTML for a failed CSS or JavaScript request. Fresh-cache offline regression reloads the interactive demo with HTTP cache disabled.
- Fixed 200% mobile overflow and made standalone site links and popup switches at least 44 px tall. Added desktop and 390 px / 200% regression coverage.
- Fixed custom-profile creation from the dialog name field: Enter now submits the form to `createProfile`; close/cancel remain explicit non-submit controls.
- Added static-host response policy: CSP, referrer/content-type/frame/permissions headers, immutable `/assets/*` caching, and a real `404.html` response override. Added Open Graph/Twitter metadata, 1200×630 social image, Apple touch icon, sitemap demo entry, and footer version/build identity.
- Added the required plain-language copy audit and documented the shipped demo in the README.

## Verification evidence

Performed from a clean dependency installation:

```text
npm ci                         PASS — 166 packages, 0 vulnerabilities
npm run lint                   PASS — TypeScript no-emit
npm run check                  PASS — TypeScript no-emit
npm test                       PASS — 7/7 Vitest tests
npm run build                  PASS — WXT extension 49.64 kB; dist/site emitted
CI=1 npm run test:e2e          PASS — 21 passed, 1 intentional mobile duplicate skip
```

The end-to-end suite covers desktop Chromium and mobile Chromium, site and popup axe scans, keyboard focus and Enter submission, packaged-extension consumer loading, sample-data isolation, same-origin request observation, no cookies, a no-history extension permission check, offline reload with CSS/JS cache verification, metadata, 44 px targets, 200% text overflow, and host-policy configuration.

Lighthouse 13 mobile run against the production build at local preview: Performance **99**, Accessibility **100**, Best Practices **100**, SEO **100**; LCP **1.58 s**, CLS **0**, TBT **0 ms**. The Chromium process exited while collecting the optional full-page screenshot after the audit data had been written, but the complete category and metric results are retained in `/tmp/reading-comfort-lighthouse.json` in this worker.

Static budgets from the final build: initial JavaScript 3.44 kB raw / 1.29 kB gzip, CSS 17.68 kB raw / 4.59 kB gzip, and the existing responsive mobile hero remains below the 300 kB budget. No third-party font, script, image, analytics, API, or telemetry path is shipped.

## Deploy and use

Push the committed `main` branch. The work order’s static deployment consumes `dist/site/`; no infrastructure, DNS, or billing changes are required. For a local consumer verification:

```sh
npm ci
npm run verify
# Load dist/extension/ as an unpacked Chromium extension,
# or unzip dist/site/downloads/reading-comfort-profiles-chrome.zip.
```

## Known gaps

There are no product-known release blockers. The public deployment’s final identity and response headers must be checked after the factory’s static publish has completed; this worker has not modified infrastructure.
