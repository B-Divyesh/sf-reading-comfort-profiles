# Polish round 3 — complete adversarial-review closure

- Reviewed candidate: `a3b4ce995fc6ca044b0b970abeba31ee6414e977`
- Review reports read in full: `.factory/review-1.md`, `.factory/review-2.md`, `.factory/review-3.md`
- Earlier closure records read in full: `.factory/polish-1.md`, `.factory/polish-2.md`, and every `verification*.md`
- Repair commit: `b8083c392d84bf7cd6a40e8288d2c313f4d489d4`
- Deployed URL: <https://reading-comfort-profiles.sociobot.in>
- Deployment: `e58d803f-3497-45bf-b2d3-f9053cf8b38c`
- Result: **PASS — no blocking, major, medium, or minor finding remains.**

## Cumulative finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Route headings are focusable and route status announces forward and Back navigation. | `the ?demo=1 entry, forward navigation, and Back move focus and announce routes`; live `polish-3-live-checks.json`. |
| F-1-2 | First screen keeps Free, local-profile, and offline facts visible. | `landing page presents the audience, demo, and working download`; live home verifier. |
| F-1-3 | Visitor copy promises only the tested Chromium package. | `@claim:chromium-package`; live download verified. |
| F-1-4 | Same-work-site return, separate-site state, pause/resume, and unchanged zoom remain covered. | `@claim:per-domain-profiles` in `tests/extension.spec.ts`. |
| F-1-5 | Reading/code copy names the controls; semantic text changes preserve headings and controls. | `@claim:semantic-layout`. |
| F-1-6 | Table-spacing copy is precise and the test preserves headings, values, and markup. | `@claim:table-spacing`. |
| F-1-7 | Published text, line-spacing, and code-text endpoints remain asserted. | `@claim:setting-ranges`. |
| F-1-8 | Pointer/focus result and outline contrast remain covered. | `@claim:focus-cursor-visibility`. |
| F-1-9 | Exact starter profiles and custom-profile cloning remain covered. | `@claim:starter-profiles`; `@claim:custom-profile-clone`. |
| F-1-10 | All three named contrast treatments remain covered. | `@claim:contrast-treatments`. |
| F-1-11 | Privacy and content statements map to observable storage, permissions, requests, and DOM tests. | `@claim:privacy-local`; `@claim:extension-privacy`; `@claim:content-preservation`; live same-origin request check. |
| F-1-12 | The untestable canvas limitation remains absent from visitor copy. | README and copy audit reread. |
| F-1-13 | README opener remains short, direct, and free of unexplained jargon. | `.factory/copy-audit.md`. |
| F-1-14 | The profile section names the work-site task. | `landing page presents the audience, demo, and working download`. |
| F-1-15 | Reading, code, and table headings name their controls. | `.factory/copy-audit.md`. |
| F-1-16 | Reading-controls heading and range sentence remain concrete. | `@claim:semantic-layout`; `@claim:setting-ranges`. |
| F-1-17 | The optional data control is named table cell spacing. | `.factory/copy-audit.md`; `@claim:table-spacing`. |
| F-1-18 | The keyboard section names profile shortcuts. | `@claim:keyboard-shortcuts`. |
| F-1-19 | The install section names extension installation and browser-local profiles. | `.factory/copy-audit.md`; `@claim:extension-privacy`. |
| F-1-20 | The final action names the free Chromium extension. | `@claim:free-download`; live home verifier. |
| F-1-21 | Reader-facing README copy omits implementation jargon. | `.factory/copy-audit.md`. |
| F-1-22 | Development output and recovery instructions remain separate short sentences. | README/copy-audit reread. |
| F-1-23 | Site and package build output instructions remain separate short sentences. | README/copy-audit reread. |
| F-2-1 | The desktop action and its complete consequence remain inside 1440 × 900. | `desktop first screen keeps the sample action and its result visible`. |
| F-3-1 | On phones, the real sample preview now precedes the settings form; the 390 × 844 claim test requires both its heading and review note to intersect the viewport. | `@claim:sample-demo`; [local mobile proof](qa-evidence/polish-3-demo-mobile.png); [live mobile proof](qa-evidence/polish-3-live-demo/mobile-first-viewport.png); live geometry in `polish-3-live-checks.json`. |
| F-3-2 | All public routes render a single shared header/footer from `site/src/chrome.ts`, with identical links, wordmark, description, version/build, provenance, and current-route markers. | `all public routes render the same site-wide header and footer`; live `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` check in `polish-3-live-checks.json`. |
| F-3-3 | README now calls the controls reading text, line spacing, and code text, matching the UI. | `.factory/copy-audit.md`; README reread. |

## Verification and live recheck

- Fresh clone: `/tmp/rcp-polish3-clean-sqEACn/repo` at repair commit `b8083c3`.
- `npm ci`, `npm test` (7 unit tests), `npm run check`, and `npm run build`: passed.
- Every exact command in `.factory/claims.json` ran independently in that fresh clone: **19/19 passed**.
- `CI=1 npm run test:e2e`: **31 passed, 1 expected mobile extension duplicate skipped**. It covers the extension, local demo isolation/reset, malformed data recovery, mobile/200% layout, routing/focus, real 404 configuration, offline reload, axe, and security/cache configuration.
- `npm audit --omit=dev`: 0 vulnerabilities.
- Deployment through `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site`: succeeded; deployment id above.
- Cold live verifier checks for `/`, `/?demo=1`, `/privacy/`, and `/terms/`: 200, correct route title, `lang`, one `h1`, `main`, image alt coverage, labelled buttons, and zero console/page errors. Evidence: `qa-evidence/polish-3-live-{home,demo,privacy,terms}/verify.json`.
- Cold live 390 × 844 flow: the one-click demo focused and announced the destination heading; “Quarterly access review” was y=603–674 and the review note started at y=756; only `demo:reading-comfort-profiles` existed. The sample remained usable after offline reload. Evidence: `qa-evidence/polish-3-live-checks.json`.
- Live unknown route returned HTTP 404 with the designed page and no unexpected console issue; serious/critical axe findings: 0. Evidence: `qa-evidence/polish-3-live-404/check.json`.
- Live Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.1 s, CLS 0.09, TBT 0 ms, transfer 61 KiB. Evidence: `qa-evidence/polish-3-live-lighthouse.json`.
- Deployed `index.html` and main JS hash-match `dist/site`; the live ZIP passed `unzip -t` and its extracted extension files match `dist/extension` exactly.

No deferred work, stub, or unresolved review item remains.
