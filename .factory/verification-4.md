# Independent verification 4 — PASS

- Candidate: `bd9be7812d5af44415e175919124fa473d5e5708`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Verified: 2026-08-29 UTC
- Work order: `reading-comfort-profiles-verify-4`
- Result: **PASS — release candidate accepted**

Fresh evidence does not reproduce a deployment failure. The required claims and first-read gates pass, the browser extension completes the brief's smallest useful workflow, and the live deployment matches the candidate production output. No product code was changed during verification.

## Mandatory release gates

### Claims — PASS (19/19)

`.factory/claims.json` was present in the clean clone. After `npm ci`, every listed `test` command was run independently and exactly as declared against the production demo/build entry point.

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `sample-demo` | PASS | One click opened `/demo/?demo=1`, showed the access-review sample in the first 390 px viewport, displayed the persistent demo banner, and created only the demo-prefixed storage key. |
| `profile-settings` | PASS | Settings changed, persisted across reload, reset, and were removed on **Leave demo** without deleting an unrelated local record. |
| `privacy-local` | PASS | The full demo flow used only the product origin, set no product cookie, and used only `demo:reading-comfort-profiles`. |
| `offline-reload` | PASS | The styled demo reloaded through its service worker with network cache disabled and Chromium offline; controls remained usable. |
| `free-download` | PASS | The same-origin 29,089-byte ZIP downloaded, unpacked, and required no account or payment. |
| `chromium-package` | PASS | The unpacked MV3 package loaded in a clean Chromium profile; popup and content script ran. |
| `keyboard-shortcuts` | PASS | The package contains pause/resume, next-profile, and previous-profile commands with the advertised bindings. |
| `per-domain-profiles` | PASS | A profile returned on the assigned host, a second host remained independent, pause/resume worked, and browser zoom stayed at 1. |
| `semantic-layout` | PASS | Reading and code text reached 28 px and 26 px while heading and control geometry stayed unchanged. |
| `table-spacing` | PASS | Cell padding changed while table headings, values, and markup were preserved. |
| `setting-ranges` | PASS | The live controls and injected CSS accepted 14–28 px reading text, 1.2–2 line spacing, and 13–26 px code text. |
| `focus-cursor-visibility` | PASS | The generated style included the larger pointer and 3 px focus outline; the tested outline pair met 4.5:1. |
| `starter-profiles` | PASS | Fresh storage exposed exactly Calm reading, Balanced work, and Code focus. |
| `custom-profile-clone` | PASS | A named custom profile copied every current setting. |
| `contrast-treatments` | PASS | Standard, stronger, and maximum produced three distinct computed contrast filters. |
| `extension-privacy` | PASS | Storage contained only `readingComfortState`; no history/cookies permission or extension-originated third-party request appeared. |
| `content-preservation` | PASS | Main text, element count, and table markup matched exactly before and after profile changes. |
| `profile-deletion` | PASS | Confirmed deletion removed the custom profile and restored Calm reading. |
| `unsupported-pages` | PASS | `chrome://extensions/` remained untouched and the popup showed its designed recovery state. |

The landing page, demo, privacy page, and README were cross-checked against this registry. Material capability and privacy statements map to a registered claim; no unlisted material claim was found.

### Cold first read — PASS

The live home page was opened in a fresh context before broader QA.

- What it does: **“Adjust work sites for low-vision reading.”**
- Who it is for: **“For knowledge workers with low vision who need different reading settings across web-based work apps.”**
- What to click: **“Try it with sample data.”** The adjacent sentence explains that the isolated demo leaves profiles unchanged.
- The first screen also states: free, profiles stay in the browser, and the site works offline after the first visit.
- Desktop: the action and result note fit within 1440×900.
- Mobile: the action occupies y=638–690 CSS px in a 390×844 viewport. One click shows the sample heading and review note in the first demo viewport.

Cold captures are in `.factory/verification-artifacts-4/`.

## Clean checkout and build gates

The checkout began clean and exactly at the requested commit.

| Check | Result | Evidence |
| --- | --- | --- |
| `git rev-parse HEAD` | PASS | `bd9be7812d5af44415e175919124fa473d5e5708` |
| `npm ci` | PASS | 166 packages; 0 audit findings |
| `npm run lint` | PASS | `tsc --noEmit` |
| `npm run check` | PASS | `tsc --noEmit` |
| `npm test` | PASS | 2 files; 7 tests |
| `npm run build` | PASS | Exact WXT extension + ZIP + Vite production site; `dist/site/` and `dist/extension/` emitted |
| `CI=1 npm run test:e2e` | PASS | 33 passed; one deliberately redundant mobile extension run skipped |
| `npm audit --omit=dev` | PASS | 0 vulnerabilities |
| Factory `verify-url.sh` | PASS | `/`, `/?demo=1`, `/privacy/`, and `/terms/`: 200, correct title/lang/main/h1/alt handling, no console errors |

## Independent end-to-end exercise

### Website and demo

- Normal case: keyboard-only navigation reached **Try it with sample data** and Enter opened the seeded workspace. The banner, Reset demo, Leave demo, realistic document, code, and table were present.
- Boundaries: 14/28 px reading text, 1.2/2 line spacing, 13/26 px code, maximum contrast, and table spacing all applied. Maximum values persisted across reload.
- Invalid input/recovery: structurally invalid out-of-range JSON and malformed JSON both recovered to the complete Calm reading default with no page error.
- Reset returned focus to the sample-profile selector. Leave demo deleted only the demo key and preserved a `real:sentinel` record.
- Every public link returned 200. A deliberately unknown URL returned the designed page with a real HTTP 404.
- Visual inspection found no clipping, broken image, generated-text artifact, or ambiguous first action on desktop or 390 px mobile.

### Downloaded extension in a clean consumer profile

The live ZIP was freshly downloaded, unpacked, and loaded as the only extension in a new persistent Chromium profile.

- Manifest V3 loaded with `storage` and `activeTab`; it requests neither history nor cookies permission.
- Calm reading applied automatically. Code focus and the maximum text/code/line settings changed the live sample.
- Whitespace-only profile input stayed open, announced its error through `aria-invalid` and `aria-describedby`, and retained focus. A valid profile submitted with Enter.
- Space on the site switch paused and resumed the injected style. Main text, element count, and table markup remained exact; browser zoom remained 1.
- Extension storage contained one key, `readingComfortState`.
- The internal-page recovery state appeared on `chrome://extensions/`.
- Popup axe audit found zero serious/critical issues. The only observed runtime network origin was the work page deliberately opened, and there were no console/page errors.

## Accessibility and responsive behavior

- Axe WCAG 2 A/AA and 2.1 AA: zero serious/critical findings on `/`, `/demo/`, `/privacy/`, `/terms/`, the true 404, and the packaged popup.
- Every public route has `lang="en"`, a route-specific title, one h1, a main landmark, canonical/description/social metadata, and shared navigation/footer chrome.
- The first Tab exposes **Skip to main content** with a 3 px lichen outline and 6 px dark halo. The same designed outline remains visible across navigation and primary actions.
- Keyboard operation covered the sample link, select, sliders, switches, reset, dialog validation, pause/resume, and unsupported-page recovery without a trap.
- At 390×844, home and demo had zero horizontal overflow. At 200% root text, overflow remained zero. All visible raw interactive controls measured at least 44×44 CSS px.
- `prefers-reduced-motion: reduce` matched; scroll behavior became `auto`, transform was removed, and animation/transition duration became 0.01 ms.
- The visual thesis intentionally uses one light treatment; automated contrast checks passed.

## Privacy, headers, caching, and offline

- A focused fresh-context live demo log contained 18 requests, all to `https://reading-comfort-profiles.sociobot.in`; no product cookie, failed request, console error, page error, analytics, API, WebSocket, beacon, or third-party runtime resource appeared.
- Live HTML sends CSP with `default-src 'self'`, `connect-src 'self'`, `frame-ancestors 'none'`, and matching script/image/style directives. It also sends HSTS, nosniff, frame denial, strict referrer policy, and camera/geolocation/microphone denial.
- HTML and `sw.js` use `public, must-revalidate, max-age=30`; hashed JS/CSS use one-year immutable caching; images use seven days; the ZIP uses five minutes with revalidation. Conditional requests returned 304.
- Service-worker update completed with one active worker and no waiting/installing worker. Cache `reading-comfort-site-f8e0c7902ef5` was active. With the network disabled and browser cache bypassed, the demo reloaded styled, showed the offline notice, and accepted a 23 px setting with no failure.
- This is a static site and local browser extension. There is no backend, product-unlock endpoint, payment, or sign-in. API concurrency, persistence services, health/build endpoints, 429/Retry-After allowance, and Entra authority checks are not applicable.
- The brief does not benefit from AI; no AI runtime or missed required AI step was found.

## Deployment identity and budgets

- All 16 served non-ZIP files in `dist/site/` matched live responses byte-for-byte, including HTML, hashed JS/CSS, images, metadata, and `sw.js`.
- Fresh ZIP SHA-256: `681bfaa464264ff2b677a4ba8e2b91001fadf561a3ff0969d1f704d2123b12da`.
- Live ZIP SHA-256: `19de25c0d098164c727132cb5027580f7320c71a0077d26122c16b8563df2e29`.
- ZIP hashes differ because rebuilds encode archive timestamps. All 10 extracted extension files matched byte-for-byte (`diff -rq` produced no difference).
- Candidate and live site expose version 1.0.7 / build `polish-5`; the candidate and live extension manifest both expose 1.0.6.
- Site JavaScript: 6,586 B raw / 2.47 KiB gzip. CSS: 18,335 B raw / 4.73 KiB gzip. Mobile hero: 18,004 B. Fonts: 0 B. All supplied bundle budgets pass.
- Fresh Lighthouse 13.4.1 mobile: Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 1.02 s, LCP 1.06 s, CLS 0.090, TBT 68 ms, total transfer 62,461 B. Evidence: `.factory/verification-artifacts-4/lighthouse-mobile.json`.

## Findings by severity

- Critical: none.
- High: none.
- Medium: none.
- Low: the website/footer and npm package identify product version 1.0.7, while the downloaded extension manifest identifies 1.0.6. Candidate and live are consistent with each other, and this does not affect use, but aligning the labels would simplify support and update diagnosis.

## Test limitation

Headless Chromium did not dispatch browser-level extension accelerators from synthetic page key events. The three exact bindings, packaged command declarations, background command handler, and equivalent keyboard-operable popup behaviors were verified; physical OS-level dispatch remains a manual browser check. Edge and Brave were not installed, so compatibility was exercised in the stated Chromium target.

## Final decision

**PASS.** Candidate `bd9be7812d5af44415e175919124fa473d5e5708` is accepted at <https://reading-comfort-profiles.sociobot.in>. The deployment is present and matches the candidate payload, all 19 claims pass, the real job-to-be-done works end to end, and no release-blocking defect remains.
