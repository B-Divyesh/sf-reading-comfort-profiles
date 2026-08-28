# Independent verification 2 — FAIL

- Candidate: `40e3cbc7e06a210f29841bb906fbe62d8756d929`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Verified: 2026-08-28 UTC
- Work order: `reading-comfort-profiles-verify-2`
- Result: **FAIL — do not release**

The product's core path works and all declared claim commands pass. The release still fails the supplied non-negotiable accessibility contract: multiple real touch targets are smaller than 44×44 CSS px, and the custom-profile form can reopen with a stale invalid state after successful recovery. A lower-severity malformed-demo-state error was also reproduced. Product code was not changed.

## Mandatory first-read gate — PASS

The live page was opened cold in fresh desktop and 390×844 Chromium contexts.

- What it does: adjusts text, code, contrast, focus, and table spacing by work site.
- Who it is for: knowledge workers with low vision using web-based work apps.
- What to click first: **Try it with sample data**. The adjacent note says it opens a separate demo and does not save to real profiles.
- The primary action ended at 918 px in a 1000 px desktop viewport and 739 px in an 844 px mobile viewport.
- One click opened `/demo/` with a realistic access-review document, code, table, controls, persistent demo banner, **Reset demo**, and **Start for real**.

## Claims gate — PASS

`.factory/claims.json` exists. Each listed command was run separately after `npm ci`, through the production demo/build entry point. All eight passed:

| Claim | Exact command result | Observable evidence |
| --- | --- | --- |
| `sample-demo` | PASS, 1 test | One click opened `/demo/`; seeded heading and request data appeared; only `demo:reading-comfort-profiles` existed. |
| `profile-settings` | PASS, 1 test | A value persisted across reload, reset to 19 px, and **Start for real** deleted the demo key. |
| `privacy-local` | PASS, 1 test | Full demo flow stayed same-origin, set no cookies, and used only the demo-prefixed key. |
| `offline-reload` | PASS, 1 test | Fresh service-worker cache reloaded styled, interactive demo content offline with HTTP cache disabled. |
| `free-download` | PASS, 1 test | Same-origin ZIP downloaded and unpacked with `manifest.json`; no sign-in step was present. |
| `keyboard-shortcuts` | PASS, 1 test | ZIP manifest contained all three command IDs and advertised bindings. |
| `per-domain-profiles` | PASS, 1 test | Fresh packaged extension applied Code focus to the host and paused the host. |
| `extension-privacy` | PASS, 1 test | Fresh packaged extension used one local record, no history permission, and no third-party HTTP request. |

The two extension claims share one tagged end-to-end test, so each exact grep command runs that same packaged-extension flow. Headless Chromium did not dispatch `Alt+Shift+R` as an operating-system extension accelerator; the packaged manifest and background command handler were inspected, but the real accelerator remains a headful-browser verification limitation.

## Clean checkout and repository gates

The initial tree was clean, on `main`, and exactly at the candidate.

| Check | Result | Evidence |
| --- | --- | --- |
| `git rev-parse HEAD` | PASS | `40e3cbc7e06a210f29841bb906fbe62d8756d929` |
| `npm ci` | PASS | 166 packages installed; 0 vulnerabilities |
| `npm run lint` | PASS | `tsc --noEmit`, exit 0 |
| `npm run check` | PASS | `tsc --noEmit`, exit 0 |
| `npm test` | PASS | 2 files; 7 tests |
| `npm run build` | PASS | WXT extension 49.64 kB; `dist/site/` emitted |
| `CI=1 npm run test:e2e` | PASS | 21 passed; 1 intentional mobile extension duplicate skipped |
| `/opt/fleet/lib/verify-url.sh` | PASS | HTTP 200, title/lang/main present, one h1, no missing alt, no unlabeled button, no console error; 566 ms script load |

## Independent product exercise

### Website and demo

Passed in fresh live contexts:

- Normal case: selected each sample profile and observed the document status and presentation update.
- Boundaries: reading text 14–28 px, line height 1.2–2, and code text 13–26 px all accepted their endpoints. Maximum values, maximum contrast, and compact tables persisted after reload.
- Reset restored 19 px, 1.65×, 17 px, stronger contrast, and roomy tables, then returned focus to the profile selector.
- **Start for real** removed `demo:reading-comfort-profiles` before returning home.
- A 390 px viewport had no horizontal overflow; the same passed at 200% root text size. The primary demo action remained in the first viewport.
- All rendered internal links, the ZIP, and the external source link returned 200. An unknown route returned the product 404 body with HTTP 404.
- The generated hero was visually inspected at desktop and mobile sizes; no text artifact, brand, watermark, seam, or misleading product UI was found.

### Packaged extension in a clean Chromium profile

Passed:

- Loaded `dist/extension/` as the sole unpacked extension and applied the default profile to a live HTTPS work page.
- Switched profiles and applied 28 px text, 2× line height, 26 px code, and maximum contrast; the injected style reflected each boundary.
- The same maximum profile produced no horizontal overflow on the representative document/code/table demo at 800 px.
- A whitespace-only custom-profile name kept the dialog open, displayed its error, set `aria-invalid`, and returned focus to the name field. A valid name then created the profile with Enter.
- Cancel deletion retained the custom profile; confirmed deletion removed it and returned the domain to Calm reading.
- The site switch worked with Space, immediately removed/reapplied the injected profile, and reported paused/active state.
- A browser-internal page produced the designed unsupported-page recovery screen.

## Findings

### Medium — release-blocking under the supplied accessibility baseline

1. **Several touch targets are below the mandatory 44×44 CSS px size.** At 390 px, the header home/wordmark link measures **40×44 px** because its text is hidden. On the 404 page, the standalone **Try the demo** link measures **342×23.25 px**; at desktop it measures **111.08×23.25 px**. The privacy page's inline source link measures **204.38×20 px** at desktop. The labeled 24×24 demo checkbox is not included in this finding because its enclosing label supplies a 44 px clickable target. This violates the work order's explicit target-size baseline and is the primary release blocker.

2. **Recovered profile-name errors leave stale accessibility state.** Entering spaces sets `aria-invalid="true"` and `aria-describedby="name-error"`, as expected. After entering a valid name, creating the profile, and reopening the new-profile dialog, the fresh empty field still exposes both attributes while the referenced error is hidden. A screen reader is told that the untouched new field is already invalid. The dialog must clear those attributes when reopened or once valid input is accepted.

### Low

3. **Structurally invalid demo storage causes a page error before Reset recovers it.** Valid JSON with invalid field types, such as `lineHeight: null`, reaches `toFixed()` and raises `Cannot read properties of null (reading 'toFixed')`. **Reset demo** remains operable and restores valid defaults, but the initial load is partly rendered and logs an uncaught error. Invalid JSON is already handled; parsed values also need schema/range validation.

No critical or high defects were found.

## Accessibility, keyboard, and responsive evidence

- Axe with WCAG 2 A/AA and 2.1 AA tags: **0 violations**, including 0 serious/critical, on live `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` at 390 px; packaged popup also had 0 serious/critical violations.
- Every page has `lang="en"`, one `h1`, a `main`, labeled controls, and image alt handling. The verifier found no unlabeled button or missing image alt.
- Keyboard-only smoke tests reached and activated the skip link, demo action, form controls, dialog submission, and site switch. The visible focus treatment measured a 3 px outline on the site and a non-zero designed outline in the popup; no trap was found.
- `prefers-reduced-motion: reduce` reduced transition/animation duration to 0.01 ms.
- Desktop 1440×1000 and mobile 390×844 layouts were visually inspected. Normal and 200% site layouts had no horizontal overflow.
- The product's intentionally light-only treatment is documented in `.factory/design.md`; automated contrast checks reported no violation.

## Privacy and network evidence

- The recorded cold landing and complete demo flow requested only `https://reading-comfort-profiles.sociobot.in`. Observed live URLs were the document, hashed local JavaScript/CSS, local icon/hero, and `/demo/`.
- No cookies, analytics, beacon, WebSocket, external font/script/image, API call, or telemetry request was observed.
- Demo state used only `localStorage["demo:reading-comfort-profiles"]`.
- The packaged extension used only `chrome.storage.local["readingComfortState"]`; its manifest requests `storage`, `activeTab`, and `<all_urls>`, with no `history` or `cookies` permission. Extension use produced HTTP traffic only to the test work page.
- Source inspection found no unlock, payment, sign-in, or server-side product endpoint. Rate-limit/429, backend concurrency, persistence-service, health/build API, and Entra authority checks are therefore not applicable. No AI feature is implied by this local CSS preference tool.

## Deployment identity

The live deployment matches the candidate production output.

- `index.html`, demo, legal pages, 404, hashed JavaScript/CSS, service worker, manifest, sitemap, robots file, icons, and all images matched the fresh build byte-for-byte.
- Local ZIP SHA-256: `c89e8f94eed4de1e84ae7608db63adb9f12c206ecb1d4c593e6ccd81f690cbc0`.
- Live ZIP SHA-256: `39527c962ad3a45c1bd86642d95d96bbe479830929d611e841cccbd1df61f974`.
- The archive-only difference is entry timestamps (fresh build 18:13 UTC; deployed build 10:40 UTC). All 10 extracted files match byte-for-byte, including manifest and scripts.
- `staticwebapp.config.json` is deployment configuration rather than a served asset; live response behavior matches it.

## Headers, caching, offline, and budgets

- Browser-observed document headers include CSP, HSTS, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and a restricted Permissions Policy. No CSP error occurred.
- HTML and `sw.js`: `public, must-revalidate, max-age=30`; hashed JS/CSS: `public, max-age=31536000, immutable`; images: 7 days; ZIP: 5 minutes with revalidation. A conditional hashed-JS request returned 304.
- Service worker activated, controlled the page, had no waiting worker after `registration.update()`, and used cache `reading-comfort-site-e98f7184ff2d`. The styled demo reloaded and remained interactive offline with the HTTP cache disabled.
- Fresh live Lighthouse mobile: Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP **1.1 s**, LCP **1.2 s**, CLS **0**, TBT **0 ms**, total transfer **61,666 bytes**.
- A Reset interaction under 4× CPU throttling produced a maximum Event Timing duration of **32 ms** (lab interaction proxy; field INP is not available from a one-user verification run).
- Initial JS: **3,447 B raw / 1,321 B gzip**; CSS: **17,680 B raw / 4,585 B gzip**; mobile hero: **18,004 B**; fonts: **0 B**. All stated budgets pass.

## Final decision

**FAIL.** The functional and deployment repairs are effective, but the candidate does not satisfy the explicit 44×44 target requirement or accurate form-state requirement. Increase every standalone target to at least 44×44 px, clear profile-name error attributes on recovery/reopen, validate parsed demo state, then rerun this verification from a new candidate commit.
