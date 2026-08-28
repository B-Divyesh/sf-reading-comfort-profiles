# Independent verification 3 — PASS

- Candidate: `e2073e8658d644ad7430a53b400bada8f7137396`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Verified: 2026-08-28 UTC
- Work order: `reading-comfort-profiles-verify-3`
- Result: **PASS — release candidate accepted**

Fresh evidence confirms that the prior deployment-only concern is resolved. The candidate passes the mandatory claims and first-read gates, the packaged Manifest V3 extension completes the brief's smallest useful workflow, the live deployment matches the candidate build, and no release-blocking defect was found. Product code was not changed.

## Mandatory gates

### Claims gate — PASS

`.factory/claims.json` exists and contains eight well-formed entries. A pre-install probe correctly found that the clean clone had no `@playwright/test`; after the required locked `npm ci`, every exact listed command was run independently through the production demo/build entry point. All passed:

| Claim | Result | Fresh evidence |
| --- | --- | --- |
| `sample-demo` | PASS | One click opened `/demo/`, showed the seeded quarterly access review, and created only `demo:reading-comfort-profiles`. |
| `profile-settings` | PASS | The listed test passed. Independent live checks changed text 14–28 px, line spacing 1.2–2×, code 13–26 px, contrast, and table spacing; values persisted, Reset restored the complete sample, and Start for real deleted demo storage. |
| `privacy-local` | PASS | The complete live demo flow stayed same-origin, created no cookie/WebSocket/beacon, and used only the demo-prefixed key. |
| `offline-reload` | PASS | A fresh service worker precached the hashed CSS/JS; with HTTP cache disabled and the browser offline, the styled demo reloaded and remained interactive without errors. |
| `free-download` | PASS | The same-origin 29,082-byte Chromium ZIP downloaded, passed `unzip -t`, and contained a valid MV3 extension with no sign-in or payment path. |
| `keyboard-shortcuts` | PASS | The live package exposes pause/resume, next, and previous commands with the three advertised default bindings. |
| `per-domain-profiles` | PASS | The live package applied Code focus to one domain, left a second domain on Calm reading, restored the first assignment, and paused/resumed a domain. |
| `extension-privacy` | PASS | The fresh extension profile contained one `chrome.storage.local` record, requested no history/cookies permission, and made no HTTP request beyond the two work pages deliberately opened. |

The live landing page and README were cross-checked against the registry. Material promises map to these entries: one-click isolated sample, semantic settings, per-domain return/pause, keyboard commands, local-only privacy, offline site, and free package. No unlisted product capability claim was found.

Evidence is retained under `.factory/qa-evidence/`, including cold desktop/mobile captures, focus captures, URL-verifier output, and the Lighthouse JSON.

### Cold first-read gate — PASS

Opened live `/` cold in fresh 1440×900 and 390×844 Chromium contexts.

- What it does: **“Adjust work sites for low-vision reading.”**
- Who it is for: **“For knowledge workers with low vision who need different reading settings across web-based work apps.”**
- What to click first: **“Try it with sample data.”** The adjacent note says it opens a separate demo and saves nothing to real profiles.
- Desktop action top: 780 px in a 900 px viewport. Mobile action: y=613.84–665.84 in an 844 px viewport.
- One live mobile click opened `/demo/`, displayed the persistent sample-data banner, realistic document/code/table data, Reset demo, and Start for real.

## Clean checkout and repository gates

The checkout began at the requested commit on `main`; only verifier evidence and reports were added afterward.

| Check | Result | Evidence |
| --- | --- | --- |
| `git rev-parse HEAD` | PASS | `e2073e8658d644ad7430a53b400bada8f7137396` |
| `npm ci` | PASS | 166 packages installed; 0 vulnerabilities |
| `npm run lint` | PASS | `tsc --noEmit` |
| `npm run check` | PASS | `tsc --noEmit` |
| `npm test` | PASS | 2 files; 7 tests |
| `npm run build` | PASS | Exact WXT extension and Vite production site emitted |
| `CI=1 npm run test:e2e` | PASS | 25 passed; 1 intentional mobile extension duplicate skipped |
| `npm audit --omit=dev` | PASS | 0 vulnerabilities |
| `verify-url.sh` on `/` and `/demo/` | PASS | 200, title/lang/main/one h1/alt/button checks, no console errors |

The build produced `dist/site/`, `dist/extension/`, and `dist/site/downloads/reading-comfort-profiles-chrome.zip`. The extension manifest reports version 1.0.2, MV3, Chrome 109 minimum, `storage` and `activeTab`, and no history or cookies permission.

## Independent end-to-end exercise

### Website and sandbox demo

- Normal: Calm, Balanced, and Code sample profiles changed the realistic prose/code/table workspace immediately.
- Boundaries: live controls accepted 14/28 px text, 1.2/2× spacing, 13/26 px code, all contrast choices, and both table-spacing states. Maximum values produced 28 px prose, 56 px computed line height, 26 px code, and no horizontal overflow.
- Persistence/recovery: settings survived reload; Reset restored 19 px, 1.65×, 17 px, stronger contrast, and roomy tables while returning focus to the profile selector. Structurally invalid saved demo data recovered to valid defaults without a page error.
- Isolation: Start for real deleted the demo key before returning home. The demo never read or wrote extension profile storage.
- All links crawled from the five public pages returned 200, including the package and source repository. A genuinely unknown route returned the designed page with HTTP 404.
- Screenshots at desktop and 390 px show a complete, legible glacial-ceramic interface with no clipping, broken asset, misleading generated text, or mobile layout loss.

### Downloaded extension in a clean consumer profile

The live ZIP was unpacked and loaded as the only extension in a new persistent Chromium profile.

- Default Calm reading applied 19 px prose, 1.65× line height, semantic code sizing, enhanced focus/cursor, and roomy tables.
- Keyboard operation reached maximum 28 px text, 2× line spacing, and 26 px code. Maximum contrast and table spacing applied; the representative page retained zero horizontal overflow.
- Code focus remained assigned to `reading-comfort-profiles.sociobot.in`; `example.com` independently used Calm reading; returning to the first domain restored Code focus.
- Space on the site switch removed the injected stylesheet and profile marker; Space again restored both.
- Whitespace-only custom-profile input stayed open, announced its error with `aria-invalid`/`aria-describedby`, and returned focus to the field. A valid name submitted with Enter, and reopening the dialog exposed no stale error state.
- Cancelled deletion retained the named profile; confirmed deletion removed it and returned the domain to Calm reading.
- A browser-internal page showed the designed unsupported-page recovery state.
- Storage contained only `readingComfortState`. Observed HTTP hosts were only the two pages explicitly visited; the extension sent no API, telemetry, analytics, or third-party request.

## Accessibility, keyboard, and responsive evidence

- Axe WCAG 2 A/AA and 2.1 AA: zero violations, including zero serious/critical, on live `/`, `/demo/`, `/privacy/`, `/terms/`, the real 404 response, and the packaged popup.
- Each public route has `lang="en"`, a route-specific title/canonical, one h1, one main landmark, valid heading flow, labels, and image alt handling.
- Keyboard-only use exposes the skip link with a 3 px lime outline and 5–6 px dark halo. Enter moves popup focus to `main`; subsequent Tab reaches the controls. Dialogs contain focus, name validation recovers, and Space operates switches.
- Every visible mobile target was at least 44×44 CSS px. The demo checkbox itself is 24×24, but its associated clickable label is 316×44.
- At 390 px, normal and 200% root text had `scrollWidth === clientWidth`. The primary sample action remained in the first viewport.
- `prefers-reduced-motion: reduce` matched, changed smooth scrolling to `auto`, and reduced animation/transition duration to 0.01 ms; focus presentation completed on the next paint.
- The documented intentionally light-only treatment passed automated contrast checks.

## Privacy, headers, caching, and offline

- A full live route/demo flow logged only same-origin requests. No cookie, account, form submission, analytics, beacon, WebSocket, third-party font/script/image, unlock, payment, or API call was observed.
- Source inspection found only local `chrome.storage.local`, demo `localStorage`, and the same-origin service-worker fetch path.
- Live documents return CSP (`default-src 'self'` and constrained directives), HSTS, `Referrer-Policy`, nosniff, frame denial, and a camera/geolocation/microphone Permissions Policy.
- HTML and `sw.js`: `public, must-revalidate, max-age=30`; hashed JS/CSS: `public, max-age=31536000, immutable`; ZIP: five minutes with revalidation. A conditional hashed-JS request returned 304.
- Fresh cache `reading-comfort-site-c82e1f6b0a17` contained both hashed bundles and all public routes. Update left no waiting/installing worker. Offline reload displayed the saved-offline notice, remained styled and interactive, and logged no errors.
- There is no backend, product-unlock endpoint, payment, or sign-in. Concurrency, persistence-service, health/build API, 429 allowance, Retry-After, and Entra tenant checks are not applicable.

## Deployment identity

The live deployment matches the candidate production output.

- All 16 served non-package files in `dist/site/` matched the live responses byte-for-byte: HTML routes, hashed JS/CSS, service worker, icons, images, manifest, robots, and sitemap.
- Live ZIP SHA-256: `4d8e3d5a1a3a5831be8a3a3bfd1864f2dac151c8d049ad020a07ebd97456e363`.
- Fresh ZIP SHA-256: `6ad5aca0f0f6f37efb072df1022fcd90c1a0743a7199907e8216dc846f5bbc50`.
- The archive hashes differ because a fresh build regenerates ZIP entry timestamps. All extracted extension files matched byte-for-byte, and the live archive passed integrity testing.
- The visible site footer and packaged manifest both identify version 1.0.2 / repair-2. Candidate `e2073e8` changes only the handoff documentation on top of the deployed repair payload at `5e9842f`.

## Performance

Fresh Lighthouse 13.4.1 mobile audit against the live URL:

- Performance 100; Accessibility 100; Best Practices 100; SEO 100
- FCP 1.024 s; LCP 1.202 s; CLS 0; TBT 81 ms
- Total transfer 61,855 bytes
- Initial JS 3,971 B raw / 1,490 B gzip
- CSS 17,883 B raw / 4,605 B gzip
- Mobile hero 18,004 B; fonts 0 B

All supplied performance budgets pass.

## Findings and limitations

No confirmed product defect was found.

Headless Chromium cannot synthesize operating-system extension accelerators, so the three manifest bindings and the background command handler were verified rather than a physical global shortcut dispatch. The same pause/profile behavior was exercised through keyboard-operable popup controls. Edge and Brave were not installed in this worker; the standard Chromium MV3 package was exercised in Chromium.

## Final decision

**PASS.** Candidate `e2073e8658d644ad7430a53b400bada8f7137396` is accepted at <https://reading-comfort-profiles.sociobot.in>. The previous deployment-only concern does not reproduce, the live deployment matches the candidate payload, and no release blocker remains.
