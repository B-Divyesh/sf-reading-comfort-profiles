# Adversarial first-read review 3

- Product: Reading Comfort Profiles
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Reviewed: 2026-08-29 UTC
- Candidate: `a3b4ce995fc6ca044b0b970abeba31ee6414e977`
- Contexts: fresh Chromium at 390 × 844 and 1440 × 900; clean clone at `/tmp/rcp-review3-clean-E8oqw5/repo`
- Verdict: **FAIL**

The landing first screen is clear, all 19 registered claim commands pass, and the live demo is isolated and works offline. The product still fails because a phone visitor who selects the sample action does not see realistic sample content on the next screen. Two minor copy/structure findings also remain. A PASS requires zero findings.

## Findings

### F-3-1 — BLOCKING — the phone demo hides the realistic sample below the first screen

**Location and exact copy:** Live `/demo/?demo=1` at 390 × 844. The first screen contains **“Adjust the sample work page.”**, the explanatory paragraph, and the beginning of **“Reading settings.”** The realistic sample begins with **“Quarterly access review”** at y=1,254; its content begins at y=1,387. Both are entirely below the 844 px viewport.

**Why this fails:** The one-click path opens the right route, but the first screen after the click does not show the product acting on the promised access-review document, code decision, or request table. A phone visitor sees setup controls before evidence of the result. This fails the mandatory demo condition even though the sample becomes available after substantial scrolling.

**Concrete fix:** On the phone layout, place a compact live preview before the full controls or show it beside a reduced intro. The initial 390 × 844 viewport must contain **“Quarterly access review”** and at least one realistic content result, such as the review note or **“Finance export — Ready.”** Add a mobile Playwright assertion that those sample elements intersect the viewport after the single landing-page click; `toBeVisible()` alone is insufficient because it passes for off-screen elements.

### F-3-2 — Minor — the site-wide header and footer are not consistent

**Location and exact copy:** The landing header is **“Profiles · Demo · Download”**. Demo, Privacy, Terms, and 404 use **“Home · Demo · Privacy · Download.”** The landing footer includes the wordmark, **“Source”**, and image provenance; legal and 404 footers omit the wordmark and provenance, while demo omits **“Source.”**

**Why this matters:** Navigation and ownership information change by route. A visitor cannot rely on the same Privacy link or footer links being in the same site-wide chrome, which fails the required consistent header/footer skeleton.

**Concrete fix:** Render one shared header and footer on every route. Use the same links everywhere—for example, Profiles (`/#profiles`), Demo, Privacy, and Download in the header; the wordmark, one-line description, Privacy, Terms, Source, version/build, and provenance in the footer. Mark only the current route with `aria-current`.

### F-3-3 — Minor — the README uses three names for the same controls

**Location and exact quote:** README, **“Independent base text, line-height, and code-size controls.”** The live UI and the rest of the README instead use **“Reading text,” “Line spacing,”** and **“Code text size.”**

**Why this matters:** “Base text,” “line-height,” and “code-size” sound like implementation terms and break the one-term-per-concept rule. A first-time reader has to decide whether they refer to the same three controls.

**Concrete fix:** Rewrite the bullet as **“Separate controls for reading text, line spacing, and code text.”** Use those three terms throughout visitor-facing copy.

## Cold first read

### Phone, 390 × 844

Before scrolling, I understand this as a browser extension that adjusts reading settings on work websites. It is for knowledge workers with low vision who use web-based work apps. I should select **“Try it with sample data.”** The adjacent sentence says the action opens an isolated demo and leaves profiles unchanged. The action is fully visible at y=638–690, and the note is fully visible at y=702–743.

### Desktop, 1440 × 900

The same three answers are clear. The sample action is fully visible at y=709–761, and its complete consequence is visible beside it at y=715–755. The generated ceramic/ice illustration reinforces reading adjustment rather than obscuring the job.

The cold landing-page gate passes at both sizes. F-3-1 applies to the screen after selecting the sample action.

## Copy audit

Counts treat hyphenated compounds, URLs, code paths, and numbers as one word. Punctuation-only marks are not words. The tables include every sentence plus standalone headings, labels, links, and buttons because those units are also subject to the plain-words rules. Repeated wordmarks, keyboard keycaps, decorative section numbers, numeric control readouts, and fenced code are not sentences and are excluded. No sentence exceeds 22 words, no banned marketing adjective appears, and every button names an action or result. F-3-3 is the only copy flag.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear navigation action. |
| You’re offline. | 2 | Clear status. |
| This page still works; the extension download needs a connection. | 10 | Clear recovery information. |
| Profiles | 1 | Concrete navigation label. |
| Demo | 1 | Concrete navigation label. |
| Download | 1 | Result-naming action. |
| Free | 1 | `free-download`. |
| Profiles stay in your browser | 5 | `extension-privacy`. |
| Site works offline after first visit | 6 | `offline-reload`. |
| Adjust work sites for low-vision reading. | 6 | Plain job headline. |
| For knowledge workers with low vision who need different reading settings across web-based work apps. | 15 | Names audience and situation. |
| Try it with sample data | 5 | Result-naming action; `sample-demo`. |
| Opens an isolated demo; your profiles stay unchanged. | 8 | `sample-demo`. |
| Download for Chromium | 3 | Result-naming action. |
| Tested in Chromium | 3 | `chromium-package`. |
| Use profiles for documents, code, and tables. | 7 | Concrete illustration caption. |
| Calm reading | 2 | Sample profile name; `starter-profiles`. |
| Private | 1 | Concrete assurance label. |
| No browsing history or page content is collected. | 8 | `extension-privacy`; `content-preservation`. |
| Works offline | 2 | Concrete assurance label. |
| The product site reloads offline after your first visit. | 9 | `offline-reload`. |
| No account or payment is required. | 6 | `free-download`. |
| Profiles for work sites | 4 | Concrete section label. |
| Choose a profile for each work site. | 7 | Concrete section heading. |
| A sales table, a code review, and a long document need different settings. | 13 | Concrete examples. |
| Save a profile to each work site for automatic return. | 10 | `per-domain-profiles`. |
| Document | 1 | Concrete sample label. |
| Calm reading | 2 | Sample profile name. |
| Reading text and line spacing | 5 | Concrete feature heading. |
| Change paragraph text and line spacing while page controls keep their original size. | 13 | `semantic-layout`. |
| Code review | 2 | Concrete sample label. |
| Code focus | 2 | Sample profile name. |
| Code text size | 3 | Concrete feature heading. |
| Change monospace text without changing surrounding headings or navigation. | 9 | `semantic-layout`. |
| Dashboard | 1 | Concrete sample label. |
| Balanced work | 2 | Sample profile name. |
| Table cell spacing | 3 | Concrete feature heading. |
| Add cell spacing without changing table headings, values, or structure. | 10 | `table-spacing`. |
| Reading comfort | 2 | Concrete mock-interface label. |
| Adjust this page | 3 | Result-naming mock-interface heading. |
| On | 1 | Clear state. |
| Active on docs.example.com | 3 | Clear state. |
| Reading text | 2 | Concrete control label. |
| Line spacing | 2 | Concrete control label. |
| Visible focus & cursor | 3 | Concrete control label. |
| Reading controls | 2 | Concrete section label. |
| Change reading settings without changing page controls. | 7 | `semantic-layout`. |
| Type | 1 | Concrete category label. |
| Text and line spacing | 4 | Concrete feature heading. |
| Set reading text from 14 to 28 px and line spacing from 1.2 to 2. | 15 | `setting-ranges`. |
| Code | 1 | Concrete category label. |
| Code text size | 3 | Concrete feature heading. |
| Set code text separately from headings, navigation, and page controls. | 10 | `semantic-layout`. |
| Focus | 1 | Concrete category label. |
| Pointer and focus outline | 4 | Concrete feature heading. |
| Turn on a larger pointer and a high-contrast keyboard focus outline. | 11 | `focus-cursor-visibility`. |
| Data | 1 | Concrete category label. |
| Optional table cell spacing | 4 | Concrete feature heading. |
| Turn on spacing where tightly packed rows slow you down. | 10 | `table-spacing`. |
| Keyboard shortcuts for profiles. | 4 | Concrete section heading. |
| Pause or resume this site | 5 | `keyboard-shortcuts`. |
| Next saved profile | 3 | `keyboard-shortcuts`. |
| Previous saved profile | 3 | `keyboard-shortcuts`. |
| Install | 1 | Concrete section label. |
| Install the extension and store profiles locally. | 7 | Concrete section heading. |
| The extension is free and needs no account. | 8 | `free-download`. |
| Your profiles stay in your browser. | 6 | `extension-privacy`. |
| Download extension | 2 | Result-naming action. |
| Unzip the download | 3 | Concrete instruction heading. |
| Keep the resulting folder somewhere you won’t delete it. | 9 | Direct instruction. |
| Open your extension manager | 4 | Concrete instruction heading. |
| Visit chrome://extensions and switch on Developer mode. | 7 | Direct instruction. |
| Load the folder | 3 | Concrete instruction heading. |
| Choose “Load unpacked,” then select the unzipped folder. | 8 | Direct instruction. |
| Set a profile for your first work site | 8 | Concrete instruction heading. |
| Open the extension, choose a profile, and adjust it once. | 10 | Direct instruction. |
| Download the free Chromium extension. | 5 | Concrete CTA; `free-download`; `chromium-package`. |
| Download for free | 3 | Result-naming action. |
| Adjust work sites for low-vision reading. | 6 | Product one-liner. |
| Built by Param Factory. | 4 | Attribution. |
| Privacy | 1 | Concrete legal link. |
| Terms | 1 | Concrete legal link. |
| Source | 1 | Concrete source link. |
| Version 1.0.4 | 2 | Build identity. |
| Build polish-2 | 2 | Build identity. |
| Original hero imagery was AI-generated for this product. | 8 | Asset provenance, not a runtime AI claim. |
| © 2026 Sociobot. | 2 | Copyright notice. |

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Reading Comfort Profiles | 3 | Product name. |
| Reading Comfort Profiles is a free browser extension for knowledge workers with low vision. | 14 | `free-download`. |
| Save one reading profile for each work site. | 8 | `per-domain-profiles`. |
| Change text, code, contrast, focus, pointer size, and table spacing without changing browser zoom. | 14 | Registered extension claims. |
| It has no account or analytics. | 6 | `free-download`; `extension-privacy`. |
| Your profile settings stay in your browser. | 7 | `extension-privacy`. |
| Live site: https://reading-comfort-profiles.sociobot.in | 3 | Direct link. |
| Try the sample workspace | 4 | Concrete heading. |
| Open https://reading-comfort-profiles.sociobot.in/?demo=1 or select Try it with sample data on the landing page. | 13 | `sample-demo`. |
| The demo includes an access-review document, code decision, and table. | 10 | `sample-demo`; `semantic-layout`; `table-spacing`. |
| It uses only the separate demo:reading-comfort-profiles browser-storage key. | 8 | `privacy-local`. |
| Reset demo restores the sample. | 5 | `profile-settings`. |
| Start for real removes the demo key before returning home. | 10 | `profile-settings`. |
| What v1 includes | 3 | Concrete heading. |
| Three starter profiles: Calm reading, Balanced work, and Code focus | 10 | `starter-profiles`. |
| Custom profiles copied from the current profile settings | 8 | `custom-profile-clone`. |
| Per-work-site profile assignment and pause state | 6 | `per-domain-profiles`. |
| Independent base text, line-height, and code-size controls | 7 | Flagged in F-3-3. |
| Standard, stronger, and maximum text contrast treatments | 7 | `contrast-treatments`. |
| Optional large pointer, high-contrast focus ring, and roomier tables | 9 | `focus-cursor-visibility`; `table-spacing`. |
| Keyboard commands for pause/resume and profile cycling | 7 | `keyboard-shortcuts`. |
| A Chromium package tested in Chromium | 6 | `chromium-package`. |
| Offline-capable static product site with privacy and terms pages | 9 | `offline-reload`; route crawl. |
| The extension changes presentation through CSS. | 6 | `content-preservation`. |
| It does not edit page text or element structure. | 9 | `content-preservation`. |
| Develop | 1 | Concrete heading. |
| Requirements: Node.js 22+ and npm. | 5 | Direct setup requirement. |
| npm run dev — WXT extension development mode | 7 | Concrete command caption. |
| npm run dev:site — landing site on a local Vite server | 10 | Concrete command caption. |
| Development mode creates an unpacked Chromium extension in .output/chrome-mv3. | 9 | Direct setup result. |
| If it does not open automatically, load that folder from your browser’s extension manager. | 14 | Direct recovery instruction. |
| Test and build | 3 | Concrete heading. |
| npm test — unit tests | 4 | Concrete command caption. |
| npm run check — TypeScript | 4 | Concrete command caption. |
| npm run build — extension, ZIP, and site | 7 | Concrete command caption. |
| npm run test:e2e — Chromium desktop/mobile and axe checks | 8 | Concrete command caption. |
| npm run verify — all gates in sequence | 7 | Concrete command caption. |
| Run npm run build:site to create the deployable site in dist/site/. | 11 | Direct build instruction. |
| The packaged extension is dist/site/downloads/reading-comfort-profiles-chrome.zip. | 5 | Direct build result. |
| The unpacked extension is in dist/extension/. | 6 | Direct build result. |
| Install the packaged extension | 4 | Concrete heading. |
| Download and unzip reading-comfort-profiles-chrome.zip. | 4 | Direct instruction. |
| Open chrome://extensions in Chromium. | 4 | Direct instruction. |
| Enable Developer mode. | 3 | Direct instruction. |
| Choose Load unpacked and select the unzipped folder. | 8 | Direct instruction. |
| Keyboard commands default to: | 4 | Concrete heading. |
| Alt+Shift+R: pause or resume the current work site | 8 | `keyboard-shortcuts`. |
| Alt+Shift+.: use the next profile | 5 | `keyboard-shortcuts`. |
| Alt+Shift+,: use the previous profile | 5 | `keyboard-shortcuts`. |
| Project layout | 2 | Concrete developer heading. |
| src/entrypoints/: WXT popup, content script, and background worker | 8 | Appropriate developer reference. |
| src/lib/: state model, local storage, and generated semantic CSS | 9 | Appropriate developer reference. |
| site/: static landing, privacy, terms, and service worker | 8 | Appropriate developer reference. |
| assets/src/: original full-resolution generated art and provenance | 7 | Appropriate developer reference. |
| .factory/design.md: product-specific visual system and asset record | 7 | Appropriate developer reference. |
| .factory/handoff.md: verification and release handoff | 5 | Appropriate developer reference. |
| Privacy and license | 3 | Concrete heading. |
| Read the deployed privacy policy and terms. | 7 | Direct instruction. |
| The source is available under the MIT License. | 8 | Confirmed by `LICENSE`. |

## Demo and sandbox verification

- **Entry:** PASS. One landing-page click reaches `/demo/?demo=1`.
- **Immediate sample:** **FAIL / F-3-1.** Desktop shows the sample heading at y=700 and sample content from y=797, but phone content begins below y=1,254.
- **Banner:** PASS. The sticky banner says **“Demo — sample data, nothing is saved to your profiles”** and exposes **“Reset demo”** and **“Start for real.”**
- **Reset:** PASS. Reading text changed from 19 px to 24 px, survived reload, and Reset restored 19 px while focusing the profile selector.
- **Isolation:** PASS. A pre-existing `real:sentinel` value remained unchanged through edit, reload, Reset, and exit. Demo mode wrote only `demo:reading-comfort-profiles`; Start for real removed that key and retained the sentinel. Extension profiles use a separate `chrome.storage.local` origin, and demo code never reads or writes it.
- **Privacy:** PASS. The complete live flow requested only `https://reading-comfort-profiles.sociobot.in`, set no cookies, and logged no console or page errors.
- **Offline:** PASS. After service-worker activation, the live demo reloaded with Chromium offline and cache disabled, produced no failed request, retained styling, and still changed profile and reading text.

## Claims verification

`.factory/claims.json` contains 19 entries. From the clean clone, `npm ci`, `npm test`, `npm run check`, and `npm run build` passed before the exact registered commands were run independently. All 19 commands passed. The full `npm run verify` then passed with 7 unit tests and 29 Playwright tests; one intentional duplicate mobile extension run was skipped.

| Claim | Result |
| --- | --- |
| `sample-demo` | PASS |
| `profile-settings` | PASS |
| `privacy-local` | PASS |
| `offline-reload` | PASS |
| `free-download` | PASS |
| `chromium-package` | PASS |
| `keyboard-shortcuts` | PASS |
| `per-domain-profiles` | PASS |
| `semantic-layout` | PASS |
| `table-spacing` | PASS |
| `setting-ranges` | PASS |
| `focus-cursor-visibility` | PASS |
| `starter-profiles` | PASS |
| `custom-profile-clone` | PASS |
| `contrast-treatments` | PASS |
| `extension-privacy` | PASS |
| `content-preservation` | PASS |
| `profile-deletion` | PASS |
| `unsupported-pages` | PASS |

The live landing page was reread after the tests. Every visitor-facing product capability maps to the registry; no unlisted capability claim was found. The live ZIP and clean-build ZIP have identical unpacked files; their archive hashes differ only because packaging timestamps are not deterministic.

## Earlier findings rechecked

Every earlier review, both polish reports, and the prior handoff were read. Each earlier finding was checked against the live site and current code, not its recorded closure status.

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 | Fixed. Live landing → demo → Back focuses the destination `h1` and announces each route title; `main.ts` retains the focus/live-region logic and its regression test passes. |
| F-1-2 | Fixed. Free, local-profile, and offline facts are all visible before scrolling at 390 × 844 and 1440 × 900. |
| F-1-3 | Fixed. Visitor copy names only Chromium; `chromium-package` passes against the packaged extension. |
| F-1-4 | Fixed. `per-domain-profiles` passes restoration on the same host, separation by host, pause/resume, and unchanged browser zoom. |
| F-1-5 | Fixed. Landing copy is concrete; `semantic-layout` changes prose/code while preserving heading and button geometry. |
| F-1-6 | Fixed. Copy names cell spacing; `table-spacing` preserves headings, values, and markup. |
| F-1-7 | Fixed. Published reading, line-spacing, and code endpoints are asserted by `setting-ranges`. |
| F-1-8 | Fixed. Copy names the pointer/focus result; `focus-cursor-visibility` verifies the rules and at least 4.5:1 contrast. |
| F-1-9 | Fixed. `starter-profiles` verifies all three names and `custom-profile-clone` verifies copied settings. |
| F-1-10 | Fixed. `contrast-treatments` verifies standard, stronger, and maximum effects. |
| F-1-11 | Fixed. Current privacy/content statements map to `privacy-local`, `extension-privacy`, and `content-preservation`; the live request log is same-origin only. |
| F-1-12 | Fixed. The untested canvas limitation remains absent; `unsupported-pages` covers the published browser-internal-page limit. |
| F-1-13 | Fixed. The README opener remains split; neither sentence exceeds 22 words. |
| F-1-14 | Fixed. The live heading is **“Choose a profile for each work site.”** |
| F-1-15 | Fixed. The three headings remain **“Reading text and line spacing,” “Code text size,”** and **“Table cell spacing.”** |
| F-1-16 | Fixed. The controls section names reading settings and publishes tested numeric ranges in plain words. |
| F-1-17 | Fixed. The heading remains **“Optional table cell spacing.”** |
| F-1-18 | Fixed. The heading remains **“Keyboard shortcuts for profiles.”** |
| F-1-19 | Fixed. The heading remains **“Install the extension and store profiles locally.”** |
| F-1-20 | Fixed. The final CTA remains **“Download the free Chromium extension.”** with **“Download for free.”** |
| F-1-21 | Fixed. The visitor-facing README opener still omits Manifest V3, local-first, runtime-code, and API jargon. F-3-3 is a different terminology issue in the feature list. |
| F-1-22 | Fixed. Development output and fallback action remain two short sentences. |
| F-1-23 | Fixed. Site and package build results remain separate direct sentences. |
| F-2-1 | Fixed. At 1440 × 900 the sample action ends at y=761 and the full result note ends at y=755; both are inside the live first viewport. The dedicated regression test passes. |

No earlier finding is reissued.

## Structure, accessibility, and visual identity

- Titles follow the required route patterns and stay under 60 characters: home uses **“Reading Comfort Profiles — Adjust work sites”**; Demo, Privacy, Terms, and 404 put the route name before the product.
- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` each have `lang="en"`, one `h1`, a `main`, ordered headings, description, canonical, Open Graph/Twitter metadata, SVG favicon, apple-touch icon, and a polite route-status region.
- `robots.txt`, `sitemap.xml`, the manifest, icons, social image, download, all rendered links, and the source link return 200. A random unknown route returns the designed page with HTTP 404.
- Live CSP is a response header with `frame-ancestors 'none'`; HSTS, `Referrer-Policy`, `X-Content-Type-Options`, frame denial, and a restrictive permissions policy are present. No CSP or console error occurred.
- Browser Back restores the landing URL, moves focus to its `h1`, and announces **“Reading Comfort Profiles — Adjust work sites.”** Deep links load the correct route.
- Live axe checks found zero serious or critical issues on all five routes. The supplied URL verifier passed home, demo, Privacy, and Terms with one `h1`, `lang`, `main`, alt text, and no console error. The local suite passes 200% text, mobile overflow, touch-target, and popup checks; site and popup CSS both define reduced-motion fallbacks.
- The first-load site JavaScript is 4.85 KB raw / 1.84 KB gzip in the clean build, below the 150 KB limit.
- The glacial-ceramic identity is distinct: generated porcelain/ice art, fjord and lichen colors, asymmetric ceramic radii, incised rules, and restrained native type match `.factory/design.md`. It is not a centered-gradient or generic three-card SaaS template.
- Header/footer consistency fails only as described in F-3-2.

## Missed leverage

No additional AI feature is implied by the brief. Profile selection and CSS adjustments are deterministic, local actions; a model would add privacy and cost without improving the core job. Repository search found no embedded provider key or runtime AI call. Import/export or sync would be optional future portability features, not an obvious missing part of the brief’s smallest useful per-work-site extension.

## What would make this perfect

1. Show realistic sample content in the initial 390 × 844 demo viewport and add a true viewport-intersection regression test.
2. Use one shared header/footer across every public route.
3. Replace the README’s alternate control terms with **“reading text,” “line spacing,”** and **“code text.”**

The next review can pass only when these three findings are closed and no new finding appears in a full rerun.
