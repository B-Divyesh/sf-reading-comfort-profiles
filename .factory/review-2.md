# Adversarial first-read review 2

- Product: Reading Comfort Profiles
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Reviewed: 2026-08-29 UTC
- Contexts: fresh Chromium at 390 × 844 and 1440 × 900; separate clean local clone at `8695b1d1373be2f01365f61502f9d3a155101838`
- Verdict: **FAIL**

There is one remaining finding. The product is otherwise clear, tryable, local-first, and well-tested, but the desktop first screen does not fully show the explanation of what the sample-data action does. A PASS requires zero findings.

## Findings

### F-2-1 — Minor — the desktop sample action’s result explanation is below the first screen

**Location and exact quote:** Landing hero, adjacent action note: **“Opens a separate demo. Nothing is saved to your profiles.”**

**Evidence:** At 1440 × 900, the primary action is visible at y=803.7–855.7, but its explanatory note begins at y=881.7 and ends at y=942.6. The second sentence is below the viewport. The flex layout wraps the note onto a new line below the button rather than placing it next to the action. At 390 × 844 both the button and full note are visible.

**Why this matters:** The first-screen requirement is a result-naming primary action with an adjacent explanation of what happens after clicking. A desktop visitor can identify the action, but cannot see, without scrolling, that it opens an isolated demo and leaves real profiles unchanged.

**Concrete fix:** Keep the full note in the 1440 × 900 first viewport. For example, increase the hero-copy/action row’s available width or put a concise one-line note beside the button: **“Opens an isolated demo; your profiles stay unchanged.”** Add a 1440 × 900 Playwright assertion that the button and entire note are within the viewport.

## Cold first read

### Phone, 390 × 844

Before scrolling, I understand this as a browser extension that adjusts reading settings on work websites. It is for knowledge workers with low vision. I should click **“Try it with sample data.”** The full result note is visible. The action is 350 × 52 px at y=638–690.

### Desktop, 1440 × 900

Before scrolling, I understand this as a browser extension that adjusts reading settings on work websites. It is for knowledge workers with low vision. I should click **“Try it with sample data.”** The action is visible, but F-2-1 applies because the full consequence of clicking it is not.

The exact first-screen copy that establishes the job and audience is **“Adjust work sites for low-vision reading.”** and **“For knowledge workers with low vision who need different reading settings across web-based work apps.”** Neither is blocking; both answer the first two cold-read questions.

## Copy audit

Counts treat hyphenated terms and numbers as one word. This lists every reader-facing sentence or standalone copy unit on the landing page and README, excluding code samples, paths inside code blocks, and repeated wordmarks. No item exceeds 22 words, uses a banned marketing adjective, relies on a mood/metaphor heading, uses inconsistent visitor terminology, or has a non-result-naming button. Capability statements are covered by the named claim test unless noted as direct instruction or attribution.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Navigation action. |
| You’re offline. | 2 | Clear status. |
| This page still works; the extension download needs a connection. | 10 | Clear offline status. |
| Profiles | 1 | Concrete navigation label. |
| Demo | 1 | Concrete navigation label. |
| Download | 1 | Result-naming action. |
| Free | 1 | `free-download`. |
| Profiles stay in your browser | 5 | `extension-privacy`. |
| Site works offline after first visit | 6 | `offline-reload`. |
| Adjust work sites for low-vision reading. | 6 | Plain job headline. |
| For knowledge workers with low vision who need different reading settings across web-based work apps. | 15 | Plain audience and situation. |
| Try it with sample data | 5 | Result-naming action; `sample-demo`. |
| Opens a separate demo. | 4 | `sample-demo`; layout issue is F-2-1. |
| Nothing is saved to your profiles. | 6 | `sample-demo`. |
| Download for Chromium | 3 | Result-naming action. |
| Tested in Chromium | 3 | `chromium-package`. |
| Use profiles for documents, code, and tables. | 7 | Concrete illustration caption. |
| Calm reading | 2 | Profile name; `starter-profiles`. |
| Private | 1 | Assurance label. |
| No browsing history or page content is collected. | 8 | `extension-privacy`, `content-preservation`. |
| Works offline | 2 | Assurance label. |
| The product site reloads offline after your first visit. | 9 | `offline-reload`. |
| No account or payment is required. | 6 | `free-download`. |
| Profiles for work sites | 4 | Concrete section label. |
| Choose a profile for each work site. | 7 | Concrete section heading. |
| A sales table, a code review, and a long document need different settings. | 13 | Useful example. |
| Save a profile to each work site for automatic return. | 10 | `per-domain-profiles`. |
| Document | 1 | Concrete sample label. |
| Reading text and line spacing | 5 | Concrete feature heading. |
| Change paragraph text and line spacing while page controls keep their original size. | 13 | `semantic-layout`. |
| Code review | 2 | Concrete sample label. |
| Code text size | 3 | Concrete feature heading. |
| Change monospace text without changing surrounding headings or navigation. | 9 | `semantic-layout`. |
| Dashboard | 1 | Concrete sample label. |
| Table cell spacing | 3 | Concrete feature heading. |
| Add cell spacing without changing table headings, values, or structure. | 10 | `table-spacing`. |
| Reading controls | 2 | Concrete section label. |
| Change reading settings without changing page controls. | 7 | `semantic-layout`. |
| Text and line spacing | 4 | Concrete feature heading. |
| Set reading text from 14 to 28 px and line spacing from 1.2 to 2. | 15 | `setting-ranges`. |
| Set code text separately from headings, navigation, and page controls. | 10 | `semantic-layout`. |
| Pointer and focus outline | 4 | Concrete feature heading. |
| Turn on a larger pointer and a high-contrast keyboard focus outline. | 11 | `focus-cursor-visibility`. |
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
| Unzip the download | 3 | Concrete instruction. |
| Keep the resulting folder somewhere you won’t delete it. | 9 | Concrete instruction. |
| Open your extension manager | 4 | Concrete instruction. |
| Visit chrome://extensions and switch on Developer mode. | 7 | Concrete instruction. |
| Load the folder | 3 | Concrete instruction. |
| Choose “Load unpacked,” then select the unzipped folder. | 8 | Concrete instruction. |
| Set a profile for your first work site | 8 | Concrete instruction heading. |
| Open the extension, choose a profile, and adjust it once. | 10 | Concrete instruction. |
| Download the free Chromium extension. | 5 | Concrete CTA; `free-download`, `chromium-package`. |
| Download for free | 3 | Result-naming action. |
| Adjust work sites for low-vision reading. | 6 | Footer product line. |
| Built by Param Factory. | 4 | Attribution. |
| Privacy | 1 | Concrete legal link. |
| Terms | 1 | Concrete legal link. |
| Source | 1 | Concrete source link. |
| Version 1.0.3. | 2 | Build identity. |
| Build polish-1. | 2 | Build identity. |
| Original hero imagery was AI-generated for this product. | 8 | Asset provenance, not a product AI claim. |

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Reading Comfort Profiles | 3 | Product name. |
| Reading Comfort Profiles is a free browser extension for knowledge workers with low vision. | 14 | `free-download`. |
| Save one reading profile for each work site. | 8 | `per-domain-profiles`. |
| Change text, code, contrast, focus, pointer size, and table spacing without changing browser zoom. | 14 | `semantic-layout`, `setting-ranges`, `focus-cursor-visibility`, `table-spacing`, `per-domain-profiles`. |
| It has no account or analytics. | 6 | `free-download`, `extension-privacy`. |
| Your profile settings stay in your browser. | 7 | `extension-privacy`. |
| Live site: https://reading-comfort-profiles.sociobot.in | 3 | Direct link. |
| Try the sample workspace | 4 | Concrete heading. |
| Open https://reading-comfort-profiles.sociobot.in/?demo=1 or select Try it with sample data on the landing page. | 13 | `sample-demo`. |
| The demo includes an access-review document, code decision, and table. | 10 | `sample-demo`. |
| It uses only the separate demo:reading-comfort-profiles browser-storage key. | 8 | `privacy-local`. |
| Reset demo restores the sample. | 5 | `profile-settings`. |
| Start for real removes the demo key before returning home. | 10 | `profile-settings`. |
| What v1 includes | 3 | Concrete heading. |
| Three starter profiles: Calm reading, Balanced work, and Code focus | 10 | `starter-profiles`. |
| Custom profiles copied from the current profile settings | 8 | `custom-profile-clone`. |
| Per-work-site profile assignment and pause state | 6 | `per-domain-profiles`. |
| Independent base text, line-height, and code-size controls | 7 | `semantic-layout`, `setting-ranges`. |
| Standard, stronger, and maximum text contrast treatments | 7 | `contrast-treatments`. |
| Optional large pointer, high-contrast focus ring, and roomier tables | 9 | `focus-cursor-visibility`, `table-spacing`. |
| Keyboard commands for pause/resume and profile cycling | 7 | `keyboard-shortcuts`. |
| A Chromium package tested in Chromium | 6 | `chromium-package`. |
| Offline-capable static product site with privacy and terms pages | 9 | `offline-reload`; direct route check. |
| The extension changes presentation through CSS. | 6 | `content-preservation`. |
| It does not edit page text or element structure. | 9 | `content-preservation`. |
| Develop | 1 | Concrete heading. |
| Requirements: Node.js 22+ and npm. | 5 | Setup instruction. |
| Development mode creates an unpacked Chromium extension in .output/chrome-mv3. | 9 | Setup instruction. |
| If it does not open automatically, load that folder from your browser’s extension manager. | 14 | Setup instruction. |
| Test and build | 3 | Concrete heading. |
| Run npm test for unit tests. | 6 | Setup instruction. |
| Run npm run check for TypeScript. | 6 | Setup instruction. |
| Run npm run build for the extension, ZIP, and site. | 10 | Setup instruction. |
| Run npm run test:e2e for Chromium desktop/mobile and axe checks. | 10 | Setup instruction. |
| Run npm run verify for all gates in sequence. | 9 | Setup instruction. |
| Run npm run build:site to create the deployable site in dist/site/. | 11 | Setup instruction. |
| The packaged extension is dist/site/downloads/reading-comfort-profiles-chrome.zip. | 5 | Setup instruction. |
| The unpacked extension is in dist/extension/. | 6 | Setup instruction. |
| Install the packaged extension | 4 | Concrete heading. |
| Download and unzip reading-comfort-profiles-chrome.zip. | 4 | Concrete instruction. |
| Open chrome://extensions in Chromium. | 4 | Concrete instruction. |
| Enable Developer mode. | 3 | Concrete instruction. |
| Choose Load unpacked and select the unzipped folder. | 8 | Concrete instruction. |
| Keyboard commands default to: | 4 | Concrete heading. |
| Alt+Shift+R: pause or resume the current work site | 8 | `keyboard-shortcuts`. |
| Alt+Shift+.: use the next profile | 5 | `keyboard-shortcuts`. |
| Alt+Shift+,: use the previous profile | 5 | `keyboard-shortcuts`. |
| Project layout | 2 | Developer heading. |
| src/entrypoints/: WXT popup, content script, and background worker | 8 | Developer-reference label. |
| src/lib/: state model, local storage, and generated semantic CSS | 9 | Developer-reference label. |
| site/: static landing, privacy, terms, and service worker | 8 | Developer-reference label. |
| assets/src/: original full-resolution generated art and provenance | 7 | Developer-reference label. |
| .factory/design.md: product-specific visual system and asset record | 7 | Developer-reference label. |
| .factory/handoff.md: verification and release handoff | 5 | Developer-reference label. |
| Privacy and license | 3 | Concrete heading. |
| Read the deployed privacy policy and terms. | 7 | Concrete instruction. |
| The source is available under the MIT License. | 8 | Concrete statement. |

## Demo, privacy, claims, and sandbox

- **One-click demo:** PASS. A fresh live landing context reached `/demo/?demo=1` in one click. Its first screen already showed a realistic quarterly access review, code decision, and request table.
- **Banner and reset:** PASS. The persistent banner says **“Demo — sample data, nothing is saved to your profiles”** and includes **Reset demo** and **Start for real**. Reading text changed from 19 to 24, survived reload, then Reset restored 19.
- **Isolation:** PASS. Only `localStorage["demo:reading-comfort-profiles"]` appeared during demo use. Start for real removed it and returned to `/`. The demo did not touch extension storage.
- **Privacy/offline:** PASS. The complete live request log contained only `https://reading-comfort-profiles.sociobot.in`, with no cookie, console error, page error, or third-party request. After service-worker activation, the live demo reloaded offline, remained styled (`rgb(243, 247, 245)`), changed profile, and changed settings with zero failed requests.

`.factory/claims.json` contains 19 claims. From a fresh local clone after `npm ci`, `npm test`, `npm run check`, and `npm run build` passed. Every exact registered command passed independently:

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

All live landing and README capability statements were cross-checked against this registry. No unlisted claim was found.

## Earlier findings rechecked

All earlier review findings are fixed in both live behavior and current code. The table records the direct regression evidence for each individual `F-1` identifier.

| Earlier finding | Status and confirmation |
| --- | --- |
| F-1-1 | Fixed: live landing → demo → Back focuses each destination `h1` and announces its route title. |
| F-1-2 | Fixed: first screen shows Free, local-profile, and offline facts. |
| F-1-3 | Fixed: visitor copy promises only a tested Chromium package. |
| F-1-4 | Fixed: `per-domain-profiles` passes same-host return, separate-host state, pause/resume, and unchanged zoom. |
| F-1-5 | Fixed: `semantic-layout` passes changed prose/code and stable heading/control geometry. |
| F-1-6 | Fixed: `table-spacing` passes changed padding with preserved headings, values, and markup. |
| F-1-7 | Fixed: `setting-ranges` passes all stated endpoints. |
| F-1-8 | Fixed: `focus-cursor-visibility` passes cursor, focus outline, and contrast checks. |
| F-1-9 | Fixed: `starter-profiles` and `custom-profile-clone` pass exact starter names and full settings copy. |
| F-1-10 | Fixed: `contrast-treatments` passes the three stated treatments. |
| F-1-11 | Fixed: privacy/content promises map to `privacy-local`, `extension-privacy`, and `content-preservation`. |
| F-1-12 | Fixed: the untested canvas limitation is removed from visitor copy. |
| F-1-13 | Fixed: README opening is split into short plain sentences. |
| F-1-14 | Fixed: profile section uses a concrete heading. |
| F-1-15 | Fixed: prose, code, and table feature headings name their controls. |
| F-1-16 | Fixed: the reading-controls heading and range sentence are concrete and plain. |
| F-1-17 | Fixed: table feature uses “Optional table cell spacing.” |
| F-1-18 | Fixed: keyboard section names keyboard shortcuts and profiles. |
| F-1-19 | Fixed: install section names extension installation and local profile storage. |
| F-1-20 | Fixed: final CTA names the free Chromium extension and download result. |
| F-1-21 | Fixed: visitor-facing README removed Manifest V3/local-first/runtime/API jargon. |
| F-1-22 | Fixed: development instruction is two short sentences. |
| F-1-23 | Fixed: build-output instruction is split and direct. |

`.factory/polish-1.md`, all earlier `verification*.md` files, and the previous handoff were also read. Their target-size, form-error recovery, malformed-demo storage, CSP, offline, real-404, metadata, and cache regressions remain covered by the current tests and live checks; no regression was observed.

## Structure, accessibility, and identity

- All tested routes have a route-specific title, one `h1`, meta description, canonical URL, OG/Twitter image, favicon/apple touch icon, `lang="en"`, skip link, main, header, footer, and polite route-status region.
- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` returned the correct documents. An unknown live URL returned the designed 404 with HTTP 404. All crawled site links and the source repository returned 200.
- The live headers include CSP with `frame-ancestors 'none'`, `Referrer-Policy`, `X-Content-Type-Options`, frame denial, and restrictive permissions policy. No CSP console error occurred.
- The product has a distinct glacial-ceramic visual identity: pale ceramic surfaces, green/fjord palette, ice-lens art, asymmetric radii, and deliberately large controls match `.factory/design.md`; it is not a generic SaaS template.
- No extra AI feature is implied by the brief. The product has no embedded provider key and no decorative AI interaction. Import/export or sync are not implied by this intentionally local, per-work-site browser extension.

## What would make this perfect

Make the entire sample-action consequence visible beside or immediately beneath the primary button at 1440 × 900, then add the stated viewport regression test. With F-2-1 closed and no new findings, this review can pass.
