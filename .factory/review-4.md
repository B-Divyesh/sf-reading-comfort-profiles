# Adversarial first-read review 4

- Product: Reading Comfort Profiles
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Reviewed: 2026-08-29 UTC
- Candidate: `688bf036365f7dad6b87887dab742e28dfd078d5`
- Contexts: fresh Chromium at 390 × 844 and 1440 × 900; clean clone at `/tmp/rcp-review4-clean-1suQ2t/repo`
- Verdict: **FAIL**

The first screen, demo, claim tests, routing, accessibility baseline, privacy behavior, and earlier repairs pass. One minor copy finding remains. A PASS requires zero findings.

## Findings

### F-4-1 — Minor — the code preview uses invented product lore and an unlisted outcome slogan

**Location and exact quote:** Landing page, **Code review** panel:

```js
const comfort = local;
profile.apply(workSite);
// eyes stay oriented
```

**Why this loses or misleads a first-time visitor:** The snippet looks like a product API, but the extension exposes no such API. “Comfort” as a variable and **“eyes stay oriented”** are metaphor/slogan copy rather than realistic work code. The final comment also implies an orientation outcome that no entry in `.factory/claims.json` states or tests. It does not help a visitor understand the code-text control.

**Concrete fix:** Replace the three lines with realistic sample work code already used by the demo, for example:

```js
if (request.needsReview) {
  assignTo(manager);
}
```

Keep the panel heading and explanation; they already state the tested result clearly.

## Cold first read

### Phone, 390 × 844

Before scrolling, I understand that this browser extension adjusts work websites for easier low-vision reading. It is for knowledge workers with low vision who use browser-based work apps. I should select **“Try it with sample data.”** The adjacent sentence says that this opens an isolated demo and leaves profiles unchanged.

Evidence: the headline ends at y=497, the action at y=690, and the complete result note at y=743. All fit inside the 844 px viewport. The page has no horizontal overflow and logs no console or page error.

### Desktop, 1440 × 900

The same three answers are clear before scrolling. The action ends at y=761 and its complete result note ends at y=755. Both fit inside the 900 px viewport. No blocking first-read finding applies.

Exact first-screen copy:

- What it does: **“Adjust work sites for low-vision reading.”**
- Who it is for: **“For knowledge workers with low vision who need different reading settings across web-based work apps.”**
- What to select first: **“Try it with sample data.”**
- What happens: **“Opens an isolated demo; your profiles stay unchanged.”**

## Copy audit

Counts treat hyphenated terms, URLs, paths, numbers, and keyboard combinations as one word. Punctuation-only marks are not words. The tables include sentences, headings, labels, links, buttons, and the one slogan-like code comment because the supplied plain-words standard applies to all visible product words. Repeated text is listed at each meaningful landing-page location. No natural-language sentence exceeds 22 words and no banned marketing adjective appears. F-4-1 is the only copy flag.

### Landing page

| Visible copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Clear action. |
| You’re offline. | 2 | Clear status. |
| This page still works; the extension download needs a connection. | 10 | Clear status and consequence; `offline-reload`. |
| Reading Comfort Profiles | 3 | Product name. |
| Profiles | 1 | Concrete navigation label. |
| Demo | 1 | Concrete navigation label. |
| Privacy | 1 | Concrete navigation label. |
| Download | 1 | Result-naming verb. |
| Free | 1 | `free-download`. |
| Profiles stay in your browser | 5 | `extension-privacy`. |
| Site works offline after first visit | 6 | `offline-reload`. |
| Adjust work sites for low-vision reading. | 6 | Plain job headline. |
| For knowledge workers with low vision who need different reading settings across web-based work apps. | 15 | Names the audience and situation. |
| Try it with sample data | 5 | Result-naming action; `sample-demo`. |
| Opens an isolated demo; your profiles stay unchanged. | 8 | `sample-demo`. |
| Download for Chromium | 3 | Result-naming action. |
| Tested in Chromium | 3 | `chromium-package`. |
| Use profiles for documents, code, and tables. | 7 | Concrete image caption. |
| Calm reading | 2 | Starter profile name. |
| Private | 1 | Concrete assurance label. |
| No browsing history or page content is collected. | 8 | `extension-privacy`; request/storage inspection. |
| Works offline | 2 | Concrete assurance label. |
| The product site reloads offline after your first visit. | 9 | `offline-reload`. |
| Free | 1 | Concrete assurance label. |
| No account or payment is required. | 6 | `free-download`. |
| Profiles for work sites | 4 | Concrete section label. |
| Choose a profile for each work site. | 7 | Concrete section heading. |
| A sales table, a code review, and a long document need different settings. | 13 | Useful examples. |
| Save a profile to each work site for automatic return. | 10 | `per-domain-profiles`. |
| Document | 1 | Concrete sample label. |
| Calm reading | 2 | Starter profile name. |
| Reading text and line spacing | 5 | Concrete feature heading. |
| Change paragraph text and line spacing while page controls keep their original size. | 13 | `semantic-layout`. |
| Code review | 2 | Concrete sample label. |
| Code focus | 2 | Starter profile name. |
| Code text size | 3 | Concrete feature heading. |
| Change monospace text without changing surrounding headings or navigation. | 9 | `semantic-layout`. |
| eyes stay oriented | 3 | **Flag: F-4-1.** Uninformative slogan and unlisted implied outcome. |
| Dashboard | 1 | Concrete sample label. |
| Balanced work | 2 | Starter profile name. |
| Table cell spacing | 3 | Concrete feature heading. |
| Add cell spacing without changing table headings, values, or structure. | 10 | `table-spacing`. |
| Reading comfort | 2 | Mock extension label. |
| Adjust this page | 3 | Concrete mock-interface heading. |
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
| Turn on spacing where tightly packed rows slow you down. | 10 | Concrete use case; `table-spacing`. |
| Keyboard shortcuts | 2 | Concrete section label. |
| Keyboard shortcuts for profiles. | 4 | Concrete section heading. |
| Pause or resume this site | 5 | `keyboard-shortcuts`. |
| Alt + Shift + R | 1 | Tested keyboard combination. |
| Next saved profile | 3 | `keyboard-shortcuts`. |
| Alt + Shift + . | 1 | Tested keyboard combination. |
| Previous saved profile | 3 | `keyboard-shortcuts`. |
| Alt + Shift + , | 1 | Tested keyboard combination. |
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
| Adjust work sites for low-vision reading. | 6 | Footer product line. |
| Built by Param Factory. | 4 | Attribution. |
| Privacy | 1 | Concrete legal link. |
| Terms | 1 | Concrete legal link. |
| Source | 1 | Concrete source link. |
| Version 1.0.5 | 2 | Build identity. |
| Build polish-3 | 2 | Build identity. |
| Original hero imagery was AI-generated for this product. | 8 | Asset provenance, not a runtime capability. |
| © 2026 Sociobot. | 2 | Copyright notice. |

The remaining visible code tokens, `const comfort = local;` and `profile.apply(workSite);`, are included in F-4-1 rather than treated as natural-language sentences.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Reading Comfort Profiles | 3 | Product name. |
| Reading Comfort Profiles is a free browser extension for knowledge workers with low vision. | 14 | `free-download`. |
| Save one reading profile for each work site. | 8 | `per-domain-profiles`. |
| Change text, code, contrast, focus, pointer size, and table spacing without changing browser zoom. | 14 | Registered extension claims. |
| It has no account or analytics. | 6 | `free-download`; `extension-privacy`. |
| Your profile settings stay in your browser. | 7 | `extension-privacy`. |
| Live site: https://reading-comfort-profiles.sociobot.in | 3 | Direct link. |
| Try the sample workspace | 4 | Concrete heading. |
| Open https://reading-comfort-profiles.sociobot.in/?demo=1 or select Try it with sample data on the landing page. | 13 | Direct instruction; `sample-demo`. |
| The demo includes an access-review document, code decision, and table. | 10 | `sample-demo`. |
| It uses only the separate demo:reading-comfort-profiles browser-storage key. | 8 | `privacy-local`. |
| Reset demo restores the sample. | 5 | `profile-settings`. |
| Start for real removes the demo key before returning home. | 10 | `profile-settings`. |
| What v1 includes | 3 | Concrete heading. |
| Three starter profiles: Calm reading, Balanced work, and Code focus | 10 | `starter-profiles`. |
| Custom profiles copied from the current profile settings | 8 | `custom-profile-clone`. |
| Per-work-site profile assignment and pause state | 6 | `per-domain-profiles`. |
| Separate controls for reading text, line spacing, and code text | 9 | `semantic-layout`; consistent terminology. |
| Standard, stronger, and maximum text contrast treatments | 7 | `contrast-treatments`. |
| Optional large pointer, high-contrast focus ring, and roomier tables | 9 | `focus-cursor-visibility`; `table-spacing`. |
| Keyboard commands for pause/resume and profile cycling | 7 | `keyboard-shortcuts`. |
| A Chromium package tested in Chromium | 6 | `chromium-package`. |
| Offline-capable static product site with privacy and terms pages | 9 | `offline-reload`; route crawl. |
| The extension changes presentation through CSS. | 6 | Developer-facing implementation note; `content-preservation`. |
| It does not edit page text or element structure. | 9 | `content-preservation`. |
| Develop | 1 | Concrete heading. |
| Requirements: Node.js 22+ and npm. | 5 | Direct setup requirement. |
| npm install | 2 | Concrete command. |
| npm run dev — WXT extension development mode | 7 | Concrete command caption. |
| npm run dev:site — landing site on a local Vite server | 10 | Concrete command caption. |
| Development mode creates an unpacked Chromium extension in .output/chrome-mv3. | 9 | Direct setup result. |
| If it does not open automatically, load that folder from your browser’s extension manager. | 14 | Direct recovery instruction. |
| Test and build | 3 | Concrete heading. |
| npm test — unit tests | 4 | Concrete command caption. |
| npm run check — TypeScript | 4 | Concrete command caption. |
| npm run build — extension + zip + site | 6 | Concrete command caption. |
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
| src/entrypoints/: WXT popup, content script, and background worker | 8 | Developer reference. |
| src/lib/: state model, local storage, and generated semantic CSS | 9 | Developer reference. |
| site/: static landing, privacy, terms, and service worker | 8 | Developer reference. |
| assets/src/: original full-resolution generated art and provenance | 7 | Developer reference. |
| .factory/design.md: product-specific visual system and asset record | 7 | Developer reference. |
| .factory/handoff.md: verification and release handoff | 5 | Developer reference. |
| Privacy and license | 3 | Concrete heading. |
| Read the deployed privacy policy and terms. | 7 | Direct instruction. |
| The source is available under the MIT License. | 8 | Confirmed by `LICENSE`. |

Terminology is otherwise consistent: **profile**, **work site**, **demo**, **reading settings**, **reading text**, **line spacing**, **code text**, and **Chromium package** each name one concept.

## Demo and sandbox

- **One-click entry:** PASS. One selection from `/` reaches `/demo/?demo=1`.
- **Immediate sample:** PASS. At 390 × 844, **“Quarterly access review”** is at y=603–674 and the realistic review note begins at y=756. At 1440 × 900, the heading is at y=700–735 and the note begins at y=831. Both viewports show the product in use without scrolling.
- **Banner:** PASS. It says **“Demo — sample data, nothing is saved to your profiles”** and exposes **Reset demo** and **Start for real**.
- **Reset:** PASS. Reading text changed from 19 to 24, survived reload, then Reset restored 19 and focused the sample-profile control.
- **Isolation:** PASS. A pre-existing `real:sentinel` remained unchanged. Demo use created only `demo:reading-comfort-profiles`; Start for real removed that key and retained the sentinel.
- **Requests and privacy:** PASS. The complete landing/demo/reset/exit flow requested only the live origin, using document, hashed CSS/JS, icon, and hero-image URLs. It created no cookie and logged no console or page error.
- **Offline:** PASS. After service-worker activation and browser HTTP-cache disablement, `/demo/` reloaded offline, retained its styling and sample, and accepted a profile change with zero failed requests.

## Claims

All exact commands from `.factory/claims.json` ran independently after `npm ci`, `npm test`, `npm run check`, and `npm run build` in the clean clone. No listed test failed and no landing/README capability sentence lacks a corresponding registered claim, apart from the slogan-like implied outcome in F-4-1.

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

The live ZIP passes `unzip -t`; all ten extracted files match the clean build byte-for-byte. Different ZIP hashes are limited to generated archive timestamps. The live `index.html` matches the clean build exactly.

## Earlier findings rechecked

Every earlier review, polish report, verification report, and handoff was read. Each finding was checked in live behavior and current source/tests rather than accepted from its closure note.

| Earlier finding | Current confirmation |
| --- | --- |
| F-1-1 | Fixed. Forward and Back navigation focus the destination `h1` and update the polite route status; source logic and regression pass. |
| F-1-2 | Fixed. Free, browser-local profiles, and offline availability appear in both first viewports. |
| F-1-3 | Fixed. Public copy promises Chromium only; the packaged extension loads in Chromium. |
| F-1-4 | Fixed. Same-site return, separate-site state, pause/resume, and unchanged zoom pass. |
| F-1-5 | Fixed. Prose/code sizes change while headings and controls retain their geometry. |
| F-1-6 | Fixed. Table padding changes while headings, values, and markup remain unchanged. |
| F-1-7 | Fixed. Every published reading, line-spacing, and code endpoint is asserted. |
| F-1-8 | Fixed. Cursor and focus rules plus at least 4.5:1 outline contrast are asserted. |
| F-1-9 | Fixed. The three starter names and full custom-profile cloning pass. |
| F-1-10 | Fixed. Standard, stronger, and maximum treatments produce distinct tested filters. |
| F-1-11 | Fixed. Storage, permissions, complete request logs, and DOM preservation confirm current privacy/content statements. |
| F-1-12 | Fixed. The untested canvas statement remains absent; the published internal-page behavior is tested. |
| F-1-13 | Fixed. The README opening remains split into short plain sentences. |
| F-1-14 | Fixed. The live heading names profile choice by work site. |
| F-1-15 | Fixed. The three feature headings name reading text, code text, and table spacing. |
| F-1-16 | Fixed. The controls heading and range sentence are concrete and tested. |
| F-1-17 | Fixed. The table control is named **“Optional table cell spacing.”** |
| F-1-18 | Fixed. The shortcut section names keyboard shortcuts for profiles. |
| F-1-19 | Fixed. The installation heading names the extension and local profile storage. |
| F-1-20 | Fixed. The final heading and action name the free Chromium download. |
| F-1-21 | Fixed. Visitor-facing README copy avoids the previously identified implementation jargon. |
| F-1-22 | Fixed. Development output and fallback are two short sentences. |
| F-1-23 | Fixed. Build outputs are stated in separate direct sentences. |
| F-2-1 | Fixed. The desktop sample action and its complete consequence fit within 900 px. |
| F-3-1 | Fixed. The first phone demo viewport shows the sample heading and realistic review text. |
| F-3-2 | Fixed. One source renderer supplies identical header/footer markup on all five public documents, with route-specific current markers. |
| F-3-3 | Fixed. README now uses **reading text**, **line spacing**, and **code text** consistently. |

No earlier finding is reissued.

## Structure, accessibility, and visual identity

- `/`, `/demo/`, `/privacy/`, `/terms/`, and `/404.html` have route-specific titles under 60 characters, one `h1`, `lang="en"`, a `main`, descriptions, canonicals, Open Graph/Twitter metadata, a 1200 × 630 social image, SVG favicon, apple-touch icon, skip link, shared chrome, and a polite route-status region.
- An unknown URL returns the designed page with HTTP 404. All intended internal links, the download, and the external source link return 200. The 404 document’s self-referential skip fragment retains the containing 404 status and is not a dead destination.
- Deep links load directly. Forward and Back navigation restore the correct URL, focus the destination heading, and announce its title.
- Live Axe checks found zero WCAG 2 A/AA or WCAG 2.1 AA violations on home, demo, privacy, terms, the static 404, and the real unknown-route response. `verify-url.sh` passed home, demo, privacy, and terms with no console errors.
- Mobile and 200% text regression checks pass without horizontal overflow. Standalone links and controls covered by the suite meet the 44 × 44 px target rule. Reduced-motion CSS removes meaningful transition motion.
- The live CSP is delivered as a response header and includes `frame-ancestors 'none'`; HSTS, nosniff, frame denial, referrer policy, and restricted permissions are present. No CSP error occurred.
- Initial JavaScript is 2,491 bytes gzip, below the 150 KB site-structure budget.
- The generated porcelain/ice image, fjord/lichen palette, asymmetric ceramic surfaces, calibration rules, and restrained motion match `.factory/design.md`. The page does not resemble a generic gradient-hero/three-icon-card SaaS template.

## Missed leverage

No additional AI action is implied. Profile application is deterministic CSS work, and a model would add cost and privacy exposure without improving the core job. No provider key or runtime model call exists. Sync conflicts with the brief’s local-storage constraint; import/export would be optional portability, not an obviously missing part of the stated smallest useful product.

## Verification summary

- `npm ci`: PASS, 0 vulnerabilities
- `npm test`: PASS, 7 tests
- `npm run check`: PASS
- `npm run build`: PASS; `dist/site/` and `dist/extension/` produced
- Every exact claim command: PASS, 19/19
- `CI=1 npm run test:e2e`: PASS, 31 passed and one intentional mobile extension duplicate skipped
- `npm audit --omit=dev`: PASS, 0 vulnerabilities
- Live route/link/request/offline checks: PASS except the copy finding above

## What would make this perfect

Replace the invented code-preview lines with the demo’s realistic request-review snippet. Then rerun the copy audit and claim cross-check. If no new finding appears, the next review can pass.
