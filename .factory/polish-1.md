# Polish round 1 — adversarial review closure

- Reviewed candidate: `e2073e8658d644ad7430a53b400bada8f7137396`
- Review report: `e8292637f45fef2d31b879c2e88df01fc6d06a46` (`.factory/review-1.md`)
- Deployed repair payload: `e8cbd5ef3589c353511f91ed684933949161246b`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Result: **PASS — every finding is closed**

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Added programmatically focusable destination headings, a polite route status, navigation markers, bfcache handling, and focus/announcement on forward and Back navigation. | Playwright `the ?demo=1 entry, forward navigation, and Back move focus and announce routes`; live `/ → /demo/?demo=1 → Back` returned focused `H1` and the correct announcement both ways. |
| F-1-2 | Replaced the hero kicker with three first-screen facts: free, profiles stay in the browser, and offline after first visit. | `landing page presents the audience, demo, and working download`; `qa-evidence/polish-1-live-home-mobile.png`; live action y=638–690 at 390×844. |
| F-1-3 | Removed Edge and Brave promises. Copy now says the Chromium package is tested in Chromium; added `chromium-package`. | `@claim:chromium-package`; live ZIP is byte-identical to the tested package. |
| F-1-4 | Registered automatic same-work-site return, independent host assignments, pause/resume, and unchanged browser zoom. | `@claim:per-domain-profiles` reloads and opens a second same-host page, compares `localhost`, checks zoom `1`, and pauses/resumes. |
| F-1-5 | Rewrote the prose/code copy plainly and registered computed-style plus stable-heading/control geometry checks. | `@claim:semantic-layout` asserts 28 px prose, 26 px code, and unchanged heading/button size. |
| F-1-6 | Rewrote the table promise precisely and registered padding, text, and structure checks. | `@claim:table-spacing` compares padding and preserves every heading, value, and table node. |
| F-1-7 | Replaced jargon with exact control language and registered every text, line-spacing, and code endpoint. | `@claim:setting-ranges` checks 14–28 px, 1.2–2, and 13–26 px in the packaged extension. |
| F-1-8 | Replaced palette jargon with a direct pointer/focus description and registered visual-rule and contrast checks. | `@claim:focus-cursor-visibility` verifies both cursor data URIs, the 3 px outline, and 4.5:1+ contrast. |
| F-1-9 | Removed “useful” and “fit”; registered the three exact starters and full-value custom cloning. | `@claim:starter-profiles`; `@claim:custom-profile-clone`. |
| F-1-10 | Registered the three named contrast choices and their distinct computed effects. | `@claim:contrast-treatments` checks `contrast(1)`, `contrast(1.14)`, and `contrast(1.28)`. |
| F-1-11 | Replaced implementation jargon with observable privacy statements; strengthened permission, storage, request, and DOM-preservation assertions. | `@claim:extension-privacy`, `@claim:content-preservation`, and `@claim:privacy-local`; live demo requested only its own origin and set no cookies. |
| F-1-12 | Removed the untested canvas promise. User-facing limits now state only the semantic HTML targets the extension handles. | README/Terms copy audit; `@claim:unsupported-pages` covers the separately stated internal-browser-page limit. |
| F-1-13 | Split the 29-word README opener into direct 12- and 20-word sentences and removed “semantic.” | `.factory/copy-audit.md`; README opening review. |
| F-1-14 | Replaced “One fit does not fit every task” and “Your working set” with “Choose a profile for each work site” and “Profiles for work sites.” | Landing heading assertion and `qa-evidence/polish-1-home-mobile.png`. |
| F-1-15 | Replaced all three mood headings with “Reading text and line spacing,” “Code text size,” and “Table cell spacing.” | `.factory/copy-audit.md`; `qa-evidence/polish-1-live-home-mobile.png`. |
| F-1-16 | Replaced “Quietly precise” and the vague heading with “Reading controls” and a page-control-specific heading; rewrote the range sentence. | `.factory/copy-audit.md`; `@claim:semantic-layout`; `@claim:setting-ranges`. |
| F-1-17 | Replaced “Optional table breathing room” with “Optional table cell spacing.” | `.factory/copy-audit.md`; `@claim:table-spacing`. |
| F-1-18 | Replaced “Keyboard path” and the “fit” metaphor with “Keyboard shortcuts for profiles.” | `@claim:keyboard-shortcuts`; `.factory/copy-audit.md`. |
| F-1-19 | Replaced “Your settings stay with you” with “Install the extension and store profiles locally.” | `.factory/copy-audit.md`; `@claim:extension-privacy`. |
| F-1-20 | Removed both slogans and used “Download the free Chromium extension.” | `.factory/copy-audit.md`; `@claim:free-download`; `qa-evidence/polish-1-live-home-mobile.png`. |
| F-1-21 | Removed Manifest V3, local-first, runtime-code, and API jargon from reader-facing README copy. | README opening and privacy review; `.factory/copy-audit.md`. |
| F-1-22 | Split the development instruction into two short sentences that explain the output folder and fallback action. | README “Develop”; copy contains no sentence over 22 words. |
| F-1-23 | Split the build-output sentence into separate site and package results. | README “Test and build”; copy contains no sentence over 22 words. |

The review’s additional audit notes are also closed: “How it fits,” the illustration caption, “Your working set,” “Quietly precise,” “Keyboard path,” and “Fit your first work site” were all replaced with task names. User-facing terminology now consistently uses **profile**, **work site**, **demo**, **reading settings**, and **Chromium package**.

## Cumulative regression evidence

Every earlier verification issue remains fixed. The full browser suite covers the isolated demo, malformed demo recovery, offline cache, 200% text, 44×44 targets, custom-profile Enter submission, stale error cleanup, CSP/cache configuration, route metadata, true 404, and extension popup accessibility.

- Clean no-local clone: `/tmp/rcp-polish-clean-E2uiZp`
- Locked install: `npm ci` — pass, zero vulnerabilities
- Unit/build: `npm test` — 7 passed; `npm run build` — pass
- Every command in `.factory/claims.json`: 19/19 passed individually
- Full gate: `npm run verify` — 7 unit tests and 27 browser tests passed; one intentional duplicate mobile extension run skipped
- Axe integration: zero serious/critical findings on `/`, `/demo/`, `/privacy/`, `/terms/`, the real 404, and the packaged popup
- Live URL verifier: home and `/?demo=1` passed title/lang/main/h1/alt/button/console checks
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.86 s, LCP 1.05 s, CLS 0, TBT 46 ms, 61,175 bytes
- Live offline reload: sample content visible, styled `rgb(243, 247, 245)`, zero failed requests
- Live 404: `/missing-polish-live` returned HTTP 404 with the designed page
- Live package SHA-256: `d60e223d0182da87fd86ec66cdadd4fb354816c9eb261be64b364d9e862a6a65`, identical to `dist/site/downloads/reading-comfort-profiles-chrome.zip`

## Evidence files

- Home: `qa-evidence/polish-1-live-home-mobile.png`, `qa-evidence/polish-1-live-home-desktop.png`
- Demo: `qa-evidence/polish-1-live-demo-mobile.png`
- Route captures: `qa-evidence/polish-1-404-mobile.png`, `polish-1-privacy-mobile.png`, `polish-1-terms-mobile.png`
- URL verifier: `qa-evidence/polish-1-live-verify-home/`, `qa-evidence/polish-1-live-verify-demo/`
- Performance: `qa-evidence/polish-1-live-lighthouse.json`

No finding from the current or earlier reports remains unresolved.
