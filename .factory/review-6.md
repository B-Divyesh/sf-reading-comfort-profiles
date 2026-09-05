# Review 6 — Adjust work sites for low-vision reading

- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Reviewed: 2026-09-05 UTC
- Implementation candidate: `bd9be7812d5af44415e175919124fa473d5e5708`
- Documentation baseline: `af3d849de58af1209afc6016abe575b2ec0a7df7`
- Verdict: **FAIL**
- Findings: **4**
- Untested public claims: **2**

## Decision

**FAIL.** The product works end to end, the live output matches the accepted implementation, all 19 declared claim commands exit successfully, and the main accessibility and performance gates pass. This review cannot declare PASS because the work order requires zero findings and zero untested claims.

There is one medium finding and three low findings. The registered keyboard-shortcut test proves declarations, not the advertised shortcut results. The privacy page also makes an unregistered statement that is false as written. The earlier version mismatch remains. A build/test dependency now has a patchable moderate advisory.

## First screen before scrolling

I opened the live home page in separate fresh Chromium browsers at 1440 × 900 and 390 × 844 before scrolling.

- Job: **“Adjust work sites for low-vision reading.”**
- Audience: **“For knowledge workers with low vision who need different reading settings across web-based work apps.”**
- First action: **“Try it with sample data.”**
- Result beside the action: **“Opens an isolated demo; your profiles stay unchanged.”**
- Facts: Free; profiles stay in the browser; the site works offline after the first visit.

The action and its full explanation were visible in both first screens. On desktop they ended at y=761 and y=755. On the phone they ended at y=690 and y=743. The ceramic and ice image, fjord palette, asymmetric surfaces, and large type match `.factory/design.md` and do not look like a generic site template.

## Findings

### F-6-1 — Medium — keyboard shortcut results are not tested

The landing page, popup, README, and `keyboard-shortcuts` registry entry promise keyboard commands that pause or resume a site and cycle profiles. The exact claim command passes, but its only assertions unzip the package and inspect three manifest bindings. It never dispatches a browser command or proves that any command changes the active page or selected profile.

This is an incomplete claim test under the supplied rule that a test must assert the promised observable result, not only that a declaration exists. It also leaves the brief’s one-key disable constraint unproved. The extension test proves equivalent popup actions, but those are not browser-level shortcut dispatch.

Required resolution: add an automated command-handler outcome test for all three commands and a documented physical-browser shortcut check where OS dispatch cannot be automated. Keep the public claim only if the outcome is proved.

### F-6-2 — Low — the privacy page falsely says the website has no forms

The live privacy page says: **“The product website has no analytics, cookies, accounts, forms, or third-party resources.”** The live demo contains one `FORM`, `#demo-controls`, around its reading controls. The form is local-only and sends nothing, so this is a wording and claims defect rather than a data leak.

“No forms” is not listed in `.factory/claims.json`, and no claim command checks it. This is one unregistered and false public claim.

Required resolution: say that the site has no forms that submit data, then add that statement to the local-privacy claim test, or remove “forms” from the sentence.

### F-6-3 — Low — public version labels disagree

The npm package and live footer identify version 1.0.7. The candidate and downloaded extension manifests identify version 1.0.6. The live and candidate files agree with each other, so this is not a deployment mismatch. It makes support and update diagnosis ambiguous.

Required resolution: use one release version in `package.json`, the site footer, and the extension manifest.

### F-6-4 — Low — the build/test ZIP dependency has a patchable advisory

`npm audit` reports GHSA-px8p-9vwx-vf98 for direct development dependency `fflate@0.8.2`. A malformed ZIP64 archive can make `unzipSync` loop indefinitely. Version 0.8.3 is a non-major fix. The package is used by the build script and tests and is not included in the browser runtime; `npm audit --omit=dev` reports zero vulnerabilities.

Required resolution: update `fflate` to 0.8.3 or later and rerun build and ZIP tests.

## Claims review

Every exact `test` command in `.factory/claims.json` was run independently from a clean checkout after installing the documented Node/npm prerequisites.

| Claim | Command result | Observable evidence |
| --- | --- | --- |
| `sample-demo` | PASS | One click opened the isolated seeded workspace on a phone viewport. |
| `profile-settings` | PASS | Settings persisted, Reset restored defaults, and Leave demo preserved unrelated local data. |
| `privacy-local` | PASS | Demo requests stayed same-origin, cookies stayed empty, and demo storage stayed isolated. |
| `offline-reload` | PASS | A fresh service-worker context reloaded styled, interactive sample content offline. |
| `free-download` | PASS | The free same-origin ZIP downloaded and contained a manifest without a sign-in path. |
| `chromium-package` | PASS | The packaged MV3 extension loaded in a fresh Chromium profile. |
| `keyboard-shortcuts` | COMMAND PASS / CLAIM INCOMPLETE | The test checks manifest IDs and bindings only; see F-6-1. |
| `per-domain-profiles` | PASS | Same-host return, separate hosts, pause/resume, and browser zoom 1 passed. |
| `semantic-layout` | PASS | Reading and code text changed while heading and button geometry stayed fixed. |
| `table-spacing` | PASS | Cell padding changed while headings, values, and markup remained exact. |
| `setting-ranges` | PASS | 14–28 px text, 1.2–2 line spacing, and 13–26 px code endpoints passed. |
| `focus-cursor-visibility` | PASS | Cursor and focus CSS plus at least 4.5:1 outline contrast passed. |
| `starter-profiles` | PASS | Calm reading, Balanced work, and Code focus were present in a fresh profile. |
| `custom-profile-clone` | PASS | A new profile copied all current settings. |
| `contrast-treatments` | PASS | Standard, stronger, and maximum produced distinct filters. |
| `extension-privacy` | PASS | One local record, no history/cookies permission, and no third-party requests passed. |
| `content-preservation` | PASS | Main text, element count, and table markup stayed exact. |
| `profile-deletion` | PASS | Confirmed deletion removed the profile and restored Calm reading. |
| `unsupported-pages` | PASS | A Chromium internal page stayed unchanged and the popup showed recovery guidance. |

The landing page, demo, README, privacy page, terms page, and popup were cross-checked against the registry. F-6-1 is one incomplete registered claim. F-6-2 is one unregistered public claim. Untested claim count: **2**.

## Demo and installed extension

The live one-click sample is realistic and isolated.

- The persistent label reads **“Demo — sample data, nothing is saved to your profiles.”**
- **Quarterly access review** and its review note appear in the first 390 × 844 demo viewport.
- Maximum reading text, line spacing, code text, contrast, and compact table settings persisted after reload.
- Reset restored 19 px, 1.65, 17 px, stronger contrast, and roomy tables, then focused the sample-profile selector.
- Leave demo deleted `demo:reading-comfort-profiles` and preserved a seeded `real:sentinel` value.
- Malformed JSON and valid but out-of-range stored values recovered to complete defaults without console or page errors.
- The whole live demo flow used only the product origin and set no cookies.

The clean suite loaded `dist/extension/` as the only extension in a new Chromium user-data directory. It exercised normal, minimum, maximum, persistence, separate-host, pause, deletion, invalid profile name, unsupported-page, content-preservation, and privacy paths. The live ZIP’s ten extracted files match the candidate ZIP’s extracted files byte for byte.

## Accessibility, keyboard, mobile, and motion

- Live Axe WCAG 2 A/AA and 2.1 AA scans found zero violations on home, demo, privacy, terms, and a real unknown-route response.
- The factory URL verifier passed home, direct demo, privacy, and terms with no console errors, missing alt text, unlabeled buttons, or semantic failures.
- Each route has `lang="en"`, one `h1`, a `main`, a skip link, route-specific title, and shared header/footer.
- Tab exposed a 205 × 46 px skip link with a 3 px lichen outline and 6 px dark halo. Enter reached `#main`.
- Keyboard Enter opened the demo. The new heading received focus, and the polite live region announced **“Demo — Reading Comfort Profiles.”**
- Select arrows, range End, checkbox Space, Reset, dialog validation, popup controls, and navigation were keyboard operable without a trap.
- The 390 px home, demo, privacy, and terms routes had zero horizontal overflow at 200% root text.
- Under reduced motion, scroll behavior was `auto` and animation/transition duration was 0.01 ms.
- Fresh mobile Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 0.91 s, LCP 1.22 s, CLS 0.090, TBT 0 ms, total transfer 62,470 bytes.

## Offline, privacy, routes, and headers

- A fresh live service-worker context had one activated worker, none waiting or installing, and cache `reading-comfort-site-f8e0c7902ef5` with the hashed JS and CSS.
- With the browser network and HTTP cache disabled, `/demo/` reloaded styled and interactive. Code focus and 23 px text worked, and the offline notice appeared.
- All rendered links returned 200, including the ZIP and this product’s public source repository.
- A deliberately unknown URL returned the designed page with HTTP 404, one `h1`, one `main`, a correct title, and ways home and to the demo. This expected 404 is not a defect.
- Live CSP, HSTS, nosniff, frame denial, referrer policy, and camera/geolocation/microphone denial are present. Hashed assets use one-year immutable caching.
- The privacy page provides a working public repository route for privacy questions and explains local deletion. No product API, analytics, cookie, account, payment, or third-party runtime request was observed.
- This is a static site and browser extension. Backend tenant isolation, SQLite restart persistence, health endpoints, and 429/Retry-After checks are not applicable.
- The brief does not benefit from an AI step. No AI runtime or missed required AI feature was found.

## Candidate and live output

The live runtime is the implementation at `bd9be7812d5af44415e175919124fa473d5e5708`. The later repository commit `af3d849de58af1209afc6016abe575b2ec0a7df7` changes only verification documentation and evidence.

- All 16 served non-ZIP candidate site files matched live responses byte for byte.
- Local rebuilt ZIP SHA-256: `2d80b890c025a26866acd0552568857dd7340e0b8642a6292bc3754132d692ad`.
- Live ZIP SHA-256: `19de25c0d098164c727132cb5027580f7320c71a0077d26122c16b8563df2e29`.
- ZIP hashes differ because archive timestamps are generated. All ten extracted extension files match byte for byte.
- Site JS is 6,586 bytes raw / 2,491 bytes gzip. CSS is 18,335 bytes raw / 4,727 bytes gzip. The mobile hero is 18,004 bytes. Fonts are 0 bytes.

## Clean-checkout gates

| Check | Result |
| --- | --- |
| Documented `npm install` in a second clean candidate checkout | PASS; Playwright 1.58.2 installed |
| `npm run lint` | PASS |
| `npm run check` | PASS |
| `npm test` | PASS; 7 tests |
| `npm run build` | PASS; `dist/site/` and `dist/extension/` produced |
| Every exact claim command | 19/19 commands PASS; F-6-1 remains incomplete by assertion scope |
| `CI=1 npm run test:e2e` | PASS; 33 passed, one deliberate mobile extension duplicate skipped |
| `npm audit --omit=dev` | PASS; zero runtime vulnerabilities |
| Full `npm audit` | FAIL; one moderate development advisory, F-6-4 |

An initial reviewer command attempted the first claim before installing dependencies in that temporary checkout. It was discarded. The documented installation was then verified in a new clean checkout, and every claim command was rerun successfully.

## Earlier finding disposition

Every earlier review, polish report, verification report, and handoff was read. Earlier closures were rechecked against live behavior and current tests.

| Earlier finding | Current evidence and disposition |
| --- | --- |
| F-1-1 | Fixed: landing → demo and Back focus the destination `h1` and announce its title. |
| F-1-2 | Fixed: free, browser-local, and offline facts are visible before scrolling. |
| F-1-3 | Fixed: public compatibility copy names tested Chromium only. |
| F-1-4 | Fixed: same-host restoration, separate hosts, pause, and unchanged zoom pass. |
| F-1-5 | Fixed: semantic prose/code changes preserve headings and controls. |
| F-1-6 | Fixed: table padding changes preserve content and structure. |
| F-1-7 | Fixed: all published range endpoints pass. |
| F-1-8 | Fixed: pointer and focus rules plus contrast pass. |
| F-1-9 | Fixed: starter names and full clone values pass. |
| F-1-10 | Fixed: all three contrast treatments pass. |
| F-1-11 | Fixed for the wording reviewed then: storage, requests, and DOM preservation pass. F-6-2 is a different later privacy sentence. |
| F-1-12 | Fixed: the untested canvas statement remains absent. |
| F-1-13 through F-1-23 | Fixed: current landing and README copy retains the short, concrete replacements recorded in the copy audit. |
| F-2-1 | Fixed: desktop action and complete result note fit within 900 px. |
| F-3-1 | Fixed: realistic sample heading and review text begin in the first phone viewport. |
| F-3-2 | Fixed: all public routes use the same rendered header and footer. |
| F-3-3 | Fixed: reading text, line spacing, and code text are used consistently. |
| F-4-1 | Fixed: the code preview uses the realistic request-review snippet without product lore. |
| F-5-1 | Fixed: the demo exit is labeled **Leave demo** and removes only demo state. |
| F-5-2 | Fixed: the identified README implementation jargon is absent. |
| Verification 1 findings 1–11 | Fixed: registry/demo/audience/offline/resize/targets/Enter/CSP/404/metadata/cache/copy-audit regressions all pass current checks. |
| Verification 2 findings 1–3 | Fixed: 44 px targets, cleared dialog error state, and malformed demo recovery pass. |
| Verification 3 limitations | Still environmental only: Chromium is the stated target; physical OS shortcut dispatch remains unproved and is now F-6-1 under this stricter contract. |
| Verification 4 low finding | Still open and reissued as F-6-3: site/package 1.0.7 versus extension 1.0.6. |

## Final verdict

**FAIL — 4 findings, including 2 untested public claims.** Product code was not changed during this review.
