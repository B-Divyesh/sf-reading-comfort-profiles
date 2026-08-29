# Polish round 5 — complete adversarial-review closure

- Candidate reviewed: `773c2119a5bd36bf0d08b2cac8f593b91a7b7df8`
- Review report: `b0a376a87830cbe41b9c5afd7c7c761b2c64d600` (`.factory/review-5.md`)
- Repair commit: `b3e9fdbb1617154e0d1b51cf3fd8054209566493`
- Deployed URL: <https://reading-comfort-profiles.sociobot.in>
- Deployment: `6788a64f-c741-4b68-b795-a00bd8564af1`
- Result: **PASS — no blocking, major, medium, or minor review finding remains.**

All `review-*.md`, `polish-*.md`, and `verification*.md` records were reread. The table maps every finding, including already-closed findings, to its current regression evidence.

## Cumulative finding map

| Finding | Change retained or made | Test evidence | Screenshot and live check |
| --- | --- | --- | --- |
| F-1-1 | Route headings receive focus and the polite status announces direct, forward, and Back navigation. | `the ?demo=1 entry, forward navigation, and Back move focus and announce routes` | `qa-evidence/polish-5-live-audit/live-audit.json`; live `/?demo=1 → /demo/?demo=1 → Back`. |
| F-1-2 | Free, browser-local-profile, and offline facts remain in the first screen. | `landing page presents the audience, demo, and working download` | `qa-evidence/polish-5-live-audit/home-mobile-first-screen.png`; live `/`. |
| F-1-3 | Public copy promises only the tested Chromium package. | `@claim:chromium-package` | Live `/downloads/reading-comfort-profiles-chrome.zip` returned 200 in `live-audit.json`. |
| F-1-4 | Per-work-site restoration, independent hosts, pause/resume, and unchanged zoom remain covered. | `@claim:per-domain-profiles` | Packaged extension check in the clean suite; live package URL returned 200. |
| F-1-5 | Reading and code text change while headings, navigation, and controls retain size. | `@claim:semantic-layout` | Live demo in `demo-mobile-first-screen.png`; packaged extension exercised against it. |
| F-1-6 | Table cell spacing changes padding but preserves headings, values, and markup. | `@claim:table-spacing` | Live `/demo/?demo=1`; `demo-mobile-first-screen.png`. |
| F-1-7 | Published reading-text, line-spacing, and code-text endpoints remain exact. | `@claim:setting-ranges` | Packaged extension release artifact returned 200 on the live site. |
| F-1-8 | The larger pointer and high-contrast keyboard outline remain verified, including contrast. | `@claim:focus-cursor-visibility` | Packaged extension clean-suite check; live package URL check passed. |
| F-1-9 | The exact starter profiles and custom-profile cloning remain verified. | `@claim:starter-profiles`; `@claim:custom-profile-clone` | Packaged extension clean-suite check; live package URL check passed. |
| F-1-10 | Standard, stronger, and maximum contrast treatments remain distinct. | `@claim:contrast-treatments` | Packaged extension clean-suite check; live package URL check passed. |
| F-1-11 | Privacy/content promises map to storage, permissions, request, and DOM tests. | `@claim:privacy-local`; `@claim:extension-privacy`; `@claim:content-preservation` | `live-audit.json` records no external requests and demo-only storage; live `/demo/?demo=1`. |
| F-1-12 | The untestable canvas limitation remains absent; internal-page recovery is the stated, tested limitation. | `@claim:unsupported-pages` | Packaged extension clean-suite check; live package URL check passed. |
| F-1-13 | README opening remains split into short, direct sentences. | Copy audit and clean browser suite | `.factory/copy-audit.md`; live `/` remains within the same terminology system. |
| F-1-14 | The profile section is named for choosing a profile by work site. | `landing page presents the audience, demo, and working download` | `home-desktop-first-screen.png`; live `/#profiles`. |
| F-1-15 | Reading text, code text size, and table cell spacing use concrete headings. | Copy audit and clean browser suite | `home-desktop-first-screen.png`; live `/#profiles`. |
| F-1-16 | The controls section names the settings and the tested ranges. | `@claim:semantic-layout`; `@claim:setting-ranges` | `home-desktop-first-screen.png`; live `/#controls`. |
| F-1-17 | The optional data setting is named “Optional table cell spacing.” | `@claim:table-spacing` | `home-desktop-first-screen.png`; live `/#controls`. |
| F-1-18 | Keyboard shortcuts use profile-specific language. | `@claim:keyboard-shortcuts` | `home-desktop-first-screen.png`; live `/`. |
| F-1-19 | The installation section names the extension and browser-local profiles. | `@claim:extension-privacy`; `@claim:free-download` | `home-desktop-first-screen.png`; live `/#install`. |
| F-1-20 | The final CTA names the free Chromium download without a slogan. | `@claim:free-download`; `@claim:chromium-package` | Live `/downloads/reading-comfort-profiles-chrome.zip` returned 200. |
| F-1-21 | Earlier reader-facing implementation jargon remains removed; the residual round-five terms were rewritten in F-5-2. | Copy audit and clean browser suite | `.factory/copy-audit.md`; live `/` confirms the matching product vocabulary. |
| F-1-22 | Development recovery instructions remain two short sentences. | Copy audit | `README.md`; clean `npm run build` passed. |
| F-1-23 | Site and package build outputs remain separate direct sentences. | `npm run build` | Clean build produced `dist/site/` and `dist/extension/`; live download returned 200. |
| F-2-1 | The demo action and its complete result note stay within the 1440 × 900 first screen. | `desktop first screen keeps the sample action and its result visible` | `home-desktop-first-screen.png`; live boxes end at 760.83 px and 755.13 px in `live-audit.json`. |
| F-3-1 | On phones, realistic sample content precedes the full settings form. | `@claim:sample-demo` | `demo-mobile-first-screen.png`; live sample heading y=602.97 and note y=756.02 at 390 × 844. |
| F-3-2 | All public routes share one renderer for matching header/footer chrome. | `all public routes render the same site-wide header and footer` | Live `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` in `live-audit.json`. |
| F-3-3 | README and UI consistently use reading text, line spacing, and code text. | Copy audit and `@claim:semantic-layout` | `.factory/copy-audit.md`; live `/demo/?demo=1`. |
| F-4-1 | The invented pseudo-API/lore preview was replaced with the realistic request-review code. | `code preview uses the realistic request-review sample without product lore` | `home-desktop-first-screen.png`; live `/#profiles`. |
| F-5-1 | The persistent action now says **“Leave demo”** and removes only demo data before returning home. | `@claim:profile-settings` asserts the exact label, persistence, reset, isolated exit, and sentinel retention. | `demo-mobile-first-screen.png`; live `/?demo=1` in `live-audit.json`. |
| F-5-2 | README copy now says the sample is stored separately, the site works offline, it has Privacy/Terms pages, and the extension changes how pages look. | Copy audit and claims `privacy-local`, `offline-reload`, `content-preservation` | `.factory/copy-audit.md`; live `/`, `/privacy/`, and `/terms/` passed cold verification. |

## Clean-clone and claim evidence

- Fresh clone: `/tmp/rcp-polish5-clean-qPmpRw/repo` at `b3e9fdbb1617154e0d1b51cf3fd8054209566493`.
- `npm ci`, `npm test` (7 tests), `npm run check`, and `npm run build` passed.
- Each exact command in `.factory/claims.json` was run independently from that clone: **19/19 passed**.
- `CI=1 npm run test:e2e` passed: **33 passed, 1 intentional duplicate mobile-extension check skipped**. It exercises the packaged extension, all registered claims, isolated demo/reset/exit, offline reload, route focus/Back, metadata, actual 404 configuration, 200% mobile layout, 44 px targets, privacy requests, and serious/critical Axe checks.
- `npm audit --omit=dev` reported **0 vulnerabilities**.

## Deployment and cold-live evidence

- `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site` completed deployment `6788a64f-c741-4b68-b795-a00bd8564af1`.
- `verify-url.sh` passed fresh `https://reading-comfort-profiles.sociobot.in/`, `/?demo=1`, `/privacy/`, and `/terms/`: each returned 200 with the correct title, `lang`, one `h1`, `main`, image alt coverage, labelled buttons, and no console/page errors. Reports and route screenshots are in `qa-evidence/polish-5-live-audit/verify-*`.
- The independent cold browser audit in `qa-evidence/polish-5-live-audit/live-audit.json` records demo isolation/reset/exit, direct URL entry, focus/announcements, offline interaction, same-origin-only requests, link responses, route metadata, real unknown-route HTTP 404, and zero serious/critical Axe findings. Its one expected console network entry is the browser reporting the deliberate 404 document; normal routes have zero errors.
- Live Lighthouse in `qa-evidence/polish-5-live-lighthouse.json`: Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP **0.9 s**, LCP **1.2 s**, CLS **0.09**, TBT **60 ms**, transfer **61 KiB**.

No claim, copy, routing, demo, visual-identity, privacy, mobile, accessibility, or review finding is deferred.
