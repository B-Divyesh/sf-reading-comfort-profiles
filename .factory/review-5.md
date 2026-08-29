# Adversarial first-read review 5

- Product: Reading Comfort Profiles
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Date: 2026-08-29 UTC
- Contexts: new Chromium contexts at 390 x 844 and 1440 x 900; clean local clone for all tests
- Verdict: **FAIL**

The first screen makes the job, audience, and first action clear. The sample demo is real, isolated, and immediately useful. All 19 registered claim commands pass. This is nevertheless a fail because the exit action in the persistent demo banner does not name its actual result, and three user-facing README sentences use implementation jargon where ordinary words would be clearer. A pass requires zero findings.

## Cold first read

### 390 px phone, before scrolling

I understand this as a free Chromium browser extension that changes reading settings on work websites. It is for knowledge workers with low vision. I should select **“Try it with sample data”** to open an isolated sample workspace without changing my profiles.

The exact text that provides those answers is:

- Job: **“Adjust work sites for low-vision reading.”**
- Audience: **“For knowledge workers with low vision who need different reading settings across web-based work apps.”**
- First action and result: **“Try it with sample data”** and **“Opens an isolated demo; your profiles stay unchanged.”**

All three fact lines, the action, and its consequence are visible without scrolling. The action was 350 x 52 CSS px at y=638–690; its explanation ended at y=743.

### 1440 px desktop, before scrolling

I reach the same conclusion. The action was at y=709–761 and its complete consequence was at y=715–755, inside the 900 px viewport. The ceramic/ice illustration, restrained green palette, asymmetric surfaces, and reading-lens imagery match the product-specific visual thesis. This does not look like a generic SaaS template.

## Findings

### F-5-1 — Minor — the demo exit action does not name the result

**Location / exact quote:** Persistent demo banner, button **“Start for real”**. README: **“Start for real removes the demo key before returning home.”**

**Why this loses a first-time visitor:** The button returns the visitor to the landing page; it neither starts the extension nor installs it. “Start for real” names an intention, not the result of this click. This conflicts with the result-naming action rule and makes the exit less predictable on a phone.

**Concrete fix:** Change the banner action to **“Leave demo”**. Change the README sentence to **“Leave demo removes the sample settings before returning home.”** Add a browser assertion that the action label is “Leave demo” and that it removes only `demo:reading-comfort-profiles` before navigating home.

### F-5-2 — Minor — README visitor copy uses avoidable implementation jargon

**Location / exact quotes:**

- **“It uses only the separate `demo:reading-comfort-profiles` browser-storage key.”**
- **“Offline-capable static product site with privacy and terms pages”**
- **“The extension changes presentation through CSS.”**

**Why this loses a first-time visitor:** “Browser-storage key,” “static product site,” and “CSS” describe implementation rather than the effect a person can use. These sentences occur in the sample and feature description, not solely beside a development command.

**Concrete fix:** Replace them with, respectively: **“The sample settings are stored separately in your browser.”**; **“The site works offline after the first visit. It includes Privacy and Terms pages.”**; and **“The extension changes how pages look.”** Keep the exact storage namespace in `.factory/demo.md`, where it is useful verifier documentation.

## Demo and sandbox verification

- Opening `/?demo=1` in a new 390 px context redirected to `/demo/?demo=1`, focused **“Adjust the sample work page.”**, and announced **“Demo — Reading Comfort Profiles.”**
- The persistent banner read **“Demo — sample data, nothing is saved to your profiles.”** The realistic **“Quarterly access review”** heading appeared at y=603–674 and the review note began at y=756, both in the first viewport.
- The only local-storage key was `demo:reading-comfort-profiles`. Changing the reading size to 24 persisted through reload; **Reset demo** restored 19; exiting removed that key.
- The live request log for the landing and full demo flow contained only `https://reading-comfort-profiles.sociobot.in` requests. No cookies were present in the matching clean-test flow.
- The clean-clone `@claim:offline-reload` test passed after service-worker activation and browser offline mode. It proved that the interactive sample reloads and remains adjustable offline.

The missing label clarity in F-5-1 is not a weak or missing demo. The demo itself passes; only its exit wording needs repair.

## Claims audit

`.factory/claims.json` contains 19 claims. From a new clone at `773c2119a5bd36bf0d08b2cac8f593b91a7b7df8`, every exact listed command passed independently. `npm test`, `npm run check`, `npm run build`, and `CI=1 npm run test:e2e` also passed; the full browser run reported 33 passed and one intentional duplicate mobile extension test skipped.

| Claim IDs | Result | Observable evidence checked |
| --- | --- | --- |
| `sample-demo`, `profile-settings` | Pass | Seeded workspace, persisted sample state, reset, isolated exit. |
| `privacy-local`, `offline-reload` | Pass | Same-origin request log, demo-only storage, cookie check, offline reload. |
| `free-download`, `chromium-package` | Pass | No-account download and unpacked Chromium package. |
| `keyboard-shortcuts`, `per-domain-profiles` | Pass | Three manifest commands; same-site restoration, separate site, pause, unchanged zoom. |
| `semantic-layout`, `table-spacing`, `setting-ranges` | Pass | Target text changes, stable controls/headings, preserved table markup, exact endpoints. |
| `focus-cursor-visibility`, `starter-profiles`, `custom-profile-clone`, `contrast-treatments` | Pass | Focus/cursor rule and contrast, starter profiles, clone values, three contrast options. |
| `extension-privacy`, `content-preservation`, `profile-deletion`, `unsupported-pages` | Pass | Permissions/storage/requests, unchanged DOM, deletion fallback, internal-page recovery. |

I cross-checked every visitor-reliance claim on the landing page and README against those IDs. The download, free/no-account, local storage, offline, demo, profile, range, layout, table, keyboard, package, and content-preservation statements all have registered coverage. The two findings above are clarity issues, not unlisted feature claims. Product identity and generated-art provenance in the footer are not user-reliance product claims.

## Copy audit

Word counts use visible word tokens. Headings, labels, actions, and fragments are included because they are read as standalone copy; code samples and keycap notation are excluded. No listed landing or README sentence exceeds 22 words. `F-5-1` and `F-5-2` are the only flags.

### Landing page

| Copy | Words | Audit |
| --- | ---: | --- |
| Free | 1 | Plain fact; `free-download`. |
| Profiles stay in your browser | 5 | Plain privacy fact; `extension-privacy`. |
| Site works offline after first visit | 6 | Plain offline fact; `offline-reload`. |
| Adjust work sites for low-vision reading. | 6 | Clear job headline. |
| For knowledge workers with low vision who need different reading settings across web-based work apps. | 15 | Clear audience and situation. |
| Try it with sample data | 5 | Result-naming action. |
| Opens an isolated demo; your profiles stay unchanged. | 8 | Clear immediate consequence; `sample-demo`. |
| Download for Chromium · Tested in Chromium | 6 | Clear and covered by `chromium-package`. |
| Use profiles for documents, code, and tables. | 7 | Concrete use cases. |
| Private | 1 | Plain fact label. |
| No browsing history or page content is collected. | 8 | `extension-privacy`. |
| Works offline | 2 | Plain fact label. |
| The product site reloads offline after your first visit. | 9 | `offline-reload`. |
| No account or payment is required. | 7 | `free-download`. |
| Choose a profile for each work site. | 7 | Concrete section heading. |
| A sales table, a code review, and a long document need different settings. | 13 | Concrete examples. |
| Save a profile to each work site for automatic return. | 10 | `per-domain-profiles`. |
| Reading text and line spacing | 5 | Concrete heading. |
| Change paragraph text and line spacing while page controls keep their original size. | 13 | `semantic-layout`. |
| Code text size | 3 | Concrete heading. |
| Change monospace text without changing surrounding headings or navigation. | 9 | `semantic-layout`. |
| Table cell spacing | 3 | Concrete heading. |
| Add cell spacing without changing table headings, values, or structure. | 10 | `table-spacing`. |
| Change reading settings without changing page controls. | 7 | Concrete section heading. |
| Set reading text from 14 to 28 px and line spacing from 1.2 to 2. | 15 | `setting-ranges`. |
| Set code text separately from headings, navigation, and page controls. | 10 | `semantic-layout`. |
| Turn on a larger pointer and a high-contrast keyboard focus outline. | 11 | `focus-cursor-visibility`. |
| Turn on spacing where tightly packed rows slow you down. | 10 | Concrete action; `table-spacing`. |
| Keyboard shortcuts for profiles. | 4 | Concrete section heading. |
| Pause or resume this site | 5 | Clear command label; `keyboard-shortcuts`. |
| Next saved profile | 3 | Clear command label; `keyboard-shortcuts`. |
| Previous saved profile | 3 | Clear command label; `keyboard-shortcuts`. |
| Install the extension and store profiles locally. | 7 | Concrete section heading. |
| The extension is free and needs no account. | 8 | `free-download`. |
| Your profiles stay in your browser. | 6 | `extension-privacy`. |
| Download extension | 2 | Result-naming action. |
| Unzip the download | 3 | Concrete instruction. |
| Keep the resulting folder somewhere you won’t delete it. | 9 | Concrete instruction. |
| Open your extension manager | 4 | Concrete instruction. |
| Visit `chrome://extensions` and switch on Developer mode. | 8 | Concrete Chromium instruction. |
| Load the folder | 3 | Concrete instruction. |
| Choose “Load unpacked,” then select the unzipped folder. | 8 | Concrete instruction. |
| Set a profile for your first work site | 8 | Concrete instruction. |
| Open the extension, choose a profile, and adjust it once. | 10 | Concrete instruction. |
| Download the free Chromium extension. | 5 | Concrete final heading; `free-download`, `chromium-package`. |
| Download for free | 3 | Result-naming action. |
| Adjust work sites for low-vision reading. | 6 | Product footer one-liner. |
| Built by Param Factory. | 4 | Attribution, not a feature claim. |
| Original hero imagery was AI-generated for this product. | 9 | Provenance, consistent with `.factory/design.md`. |

### README

| Copy | Words | Audit |
| --- | ---: | --- |
| Reading Comfort Profiles is a free browser extension for knowledge workers with low vision. | 14 | Clear audience; `free-download`. |
| Save one reading profile for each work site. | 8 | `per-domain-profiles`. |
| Change text, code, contrast, focus, pointer size, and table spacing without changing browser zoom. | 14 | Covered by extension feature claims. |
| It has no account or analytics. | 6 | `free-download`, `extension-privacy`. |
| Your profile settings stay in your browser. | 7 | `extension-privacy`. |
| Open the demo URL or select Try it with sample data on the landing page. | 16 | Clear demo entry. |
| The demo includes an access-review document, code decision, and table. | 10 | `sample-demo`. |
| It uses only the separate `demo:reading-comfort-profiles` browser-storage key. | 8 | **F-5-2:** implementation jargon. |
| Reset demo restores the sample. | 5 | `profile-settings`. |
| Start for real removes the demo key before returning home. | 10 | **F-5-1:** the label does not name its click result. |
| Three starter profiles: Calm reading, Balanced work, and Code focus. | 10 | `starter-profiles`. |
| Custom profiles copied from the current profile settings. | 8 | `custom-profile-clone`. |
| Per-work-site profile assignment and pause state. | 6 | `per-domain-profiles`. |
| Separate controls for reading text, line spacing, and code text. | 10 | `setting-ranges`. |
| Standard, stronger, and maximum text contrast treatments. | 7 | `contrast-treatments`. |
| Optional large pointer, high-contrast focus ring, and roomier tables. | 9 | `focus-cursor-visibility`, `table-spacing`. |
| Keyboard commands for pause/resume and profile cycling. | 7 | `keyboard-shortcuts`. |
| A Chromium package tested in Chromium. | 6 | `chromium-package`. |
| Offline-capable static product site with privacy and terms pages. | 9 | **F-5-2:** “static” is implementation jargon. |
| The extension changes presentation through CSS. | 6 | **F-5-2:** “CSS” is implementation jargon. |
| It does not edit page text or element structure. | 9 | `content-preservation`. |
| Requirements: Node.js 22+ and npm. | 5 | Necessary developer prerequisite. |
| Development mode creates an unpacked Chromium extension in `.output/chrome-mv3`. | 9 | Necessary developer instruction. |
| If it does not open automatically, load that folder from your browser’s extension manager. | 14 | Clear recovery instruction. |
| Run `npm run build:site` to create the deployable site in `dist/site/`. | 11 | Necessary developer instruction. |
| The packaged extension is `dist/site/downloads/reading-comfort-profiles-chrome.zip`. | 5 | Necessary build-output instruction. |
| The unpacked extension is in `dist/extension/`. | 6 | Necessary build-output instruction. |
| Download and unzip `reading-comfort-profiles-chrome.zip`. | 4 | Clear install step. |
| Open `chrome://extensions` in Chromium. | 5 | Clear install step. |
| Enable Developer mode. | 3 | Clear install step. |
| Choose Load unpacked and select the unzipped folder. | 8 | Clear install step. |
| Keyboard commands default to: | 4 | Clear label. |
| Alt+Shift+R: pause or resume the current work site. | 8 | `keyboard-shortcuts`. |
| Alt+Shift+.: use the next profile. | 5 | `keyboard-shortcuts`. |
| Alt+Shift+,: use the previous profile. | 5 | `keyboard-shortcuts`. |
| Read the deployed privacy policy and terms. | 7 | Clear legal links. |
| The source is available under the MIT License. | 8 | Accurate license statement. |

The README's path-only project-layout list and shell commands are labels/code, not prose sentences; they were reviewed as developer documentation and have no plain-language flag beyond F-5-2.

## Earlier-finding regression check

I read every prior `review-*.md`, `polish-*.md`, and the existing handoff. I also rechecked the live product and current code/tests rather than accepting their “fixed” labels.

| Earlier ID | Live and code confirmation | Status |
| --- | --- | --- |
| F-1-1 | `/?demo=1`, landing-to-demo, and Back focus the destination `h1` and populate the polite route status. | Fixed |
| F-1-2 | Free, browser-local profiles, and offline-after-first-visit facts are in the first screen. | Fixed |
| F-1-3 | Public copy promises the tested Chromium package, not named untested browsers. | Fixed |
| F-1-4 | Packaged-extension test proves same-site restoration, separate hosts, pause/resume, and unchanged zoom. | Fixed |
| F-1-5 | `semantic-layout` changes target text/code without changing headings or controls. | Fixed |
| F-1-6 | `table-spacing` checks padding plus preserved headings, values, and markup. | Fixed |
| F-1-7 | `setting-ranges` checks all advertised endpoints. | Fixed |
| F-1-8 | `focus-cursor-visibility` checks the cursor, focus CSS, and contrast. | Fixed |
| F-1-9 | `starter-profiles` and `custom-profile-clone` check names/count and copied values. | Fixed |
| F-1-10 | `contrast-treatments` checks the three distinct treatments. | Fixed |
| F-1-11 | Storage, permission, same-origin request, and DOM-preservation tests cover the privacy/content copy. | Fixed |
| F-1-12 | The unsupported canvas statement remains absent; the internal-page recovery is tested. | Fixed |
| F-1-13 | README opening is split into short direct sentences. | Fixed |
| F-1-14 | The profile section is named **“Choose a profile for each work site.”** | Fixed |
| F-1-15 | Reading, code, and table controls use concrete headings. | Fixed |
| F-1-16 | The controls section names the settings and tested numeric ranges. | Fixed |
| F-1-17 | The feature is named **“Optional table cell spacing.”** | Fixed |
| F-1-18 | The section is named **“Keyboard shortcuts for profiles.”** | Fixed |
| F-1-19 | The install heading names installation and local storage. | Fixed |
| F-1-20 | The final CTA names the free Chromium extension without a slogan. | Fixed |
| F-1-21 | Earlier identified reader-facing implementation jargon is absent; F-5-2 identifies separate remaining terms. | Fixed, with new finding |
| F-1-22 | Development recovery instructions remain two short sentences. | Fixed |
| F-1-23 | Build-output instructions remain split into direct sentences. | Fixed |
| F-2-1 | Desktop action and its complete consequence remain inside 1440 x 900. | Fixed |
| F-3-1 | Mobile demo shows the sample heading and review note before the settings panel. | Fixed |
| F-3-2 | Shared `renderSiteChrome()` renders matching header/footer on all public routes. | Fixed |
| F-3-3 | README and UI use reading text, line spacing, and code text. | Fixed |
| F-4-1 | The code preview uses the realistic request-review snippet and excludes the removed pseudo-API/lore strings. | Fixed |

No prior finding is unfixed, half-fixed, or regressed. F-5-1 and F-5-2 are new findings.

## Structure, accessibility, and route checks

- Live `/`, `/demo/`, `/privacy/`, and `/terms/` returned 200 with route-specific titles, one `h1`, `lang="en"`, `main`, meta descriptions, canonical URLs, Open Graph metadata, favicons, and apple-touch icons. The live verifier reported no console/page errors on those routes.
- An unknown route returned HTTP 404 with the designed 404 page, a way home, and the title **“Page not found — Reading Comfort Profiles.”**
- Same-site links, the download, all route links, and the external source link were crawled; all same-origin targets returned 200. The public routes share header/footer chrome with Privacy and Terms in the footer.
- The full clean-clone Playwright suite passed its serious/critical Axe checks, mobile/200% layout check, 44 px standalone-target checks, CSP/404 configuration check, and route/focus checks.
- No AI feature is implied by the brief. An AI step would not improve this local reading-profile job, and no provider key is embedded.
- Import/export or sync is not an obvious missing requirement for the stated smallest useful product: the brief explicitly calls for keyboard-switchable per-domain local profiles, which the packaged extension provides.

## What would make this perfect

Apply the two small wording repairs in F-5-1 and F-5-2, add the label regression assertion for the demo exit, and rerun the copy audit plus the registered claim suite. With those changes, there is no remaining observed product, privacy, route, demo, or visual-identity gap from this review.
