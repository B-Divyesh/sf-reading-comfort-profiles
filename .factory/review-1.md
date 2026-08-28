# Adversarial first-read review 1

- Product: Reading Comfort Profiles
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Date: 2026-08-28 UTC
- Viewports: fresh Chromium contexts at 390 x 844 and 1440 x 900
- Verdict: **FAIL**

The main task, audience, and first action are clear on both first screens. The demo is real and isolated. However, this review cannot pass while route changes fail the required focus/announcement behavior and the public copy contains unlisted, untested claims. The copy audit also has plain-language findings.

## Cold first read

### 390 px phone

Before scrolling, the screen says **“Adjust work sites for low-vision reading.”** I understand this as a browser extension that changes reading settings on work websites. It is for **“knowledge workers with low vision”** who use web work apps. I should click **“Try it with sample data”**; the adjacent text says that it opens a separate demo and does not save to my profiles. The action is fully visible (350 x 52 px, y=614–666).

### Desktop

At 1440 x 900, I reach the same conclusion from the headline, audience sentence, and visible **“Try it with sample data”** action (y=780–832). The next-line privacy explanation is partly below the viewport, but the action itself is unambiguous.

This passes the three-part cold-read gate. The visual treatment is also product-specific: the ceramic/ice art, cool palette, asymmetric surfaces, and type hierarchy match `.factory/design.md`; it does not read as a generic SaaS template.

## Findings

### F-1-1 — Medium — route changes do not move focus or announce the new page

**Location/evidence:** From `/`, clicking **“Try it with sample data”** reaches `/demo/`. `document.activeElement` is `BODY`; the destination `<h1>` has no `tabindex`, and the page has no `[aria-live]` region. Browser Back also leaves focus on `BODY`.

**Why this fails:** Keyboard and screen-reader visitors receive neither a focus target nor an announcement that the page changed. This fails the stated route-change requirement even though the deep URL and Back navigation themselves work.

**Concrete fix:** On each document navigation, make the destination `<h1 tabindex="-1">` programmatically focusable, focus it after load, and populate one polite live region with the destination page name. Add a Playwright test for landing → demo → Back that asserts focus and announcement.

### F-1-2 — Minor — the first screen omits the required offline fact

**Location/exact quote:** Landing hero kicker: **“Free · private · saved locally”**. The offline fact appears only after scrolling in the proof strip: **“The product site reloads offline after your first visit.”**

**Why this matters:** The required first-screen facts are price, privacy, and offline behavior. “Saved locally” is useful but does not tell a visitor that the site works offline.

**Concrete fix:** Replace the kicker with three plain facts such as **“Free · no account · works offline after the first visit”**, and retain the nearby separate-demo explanation.

### F-1-3 — Minor — browser compatibility is an unlisted claim

**Location/exact quote:** Landing compatibility line: **“Chrome, Edge, and Brave.”** README: **“Chrome-compatible packaged download and unpacked build output.”**

**Why this misleads:** The product promises support for three named browsers, but `.factory/claims.json` has no claim entry or observable multi-browser test for it.

**Concrete fix:** Add a `browser-compatibility` claim and test the package in each named browser, or narrow the copy to the tested Chromium package without naming unsupported browsers.

### F-1-4 — Minor — automatic per-domain return is an unlisted claim

**Location/exact quote:** Landing: **“Save a profile to each domain and let it return automatically.”** README opening: **“It saves a semantic reading profile for each work domain … [so settings] can be adjusted without repeatedly changing browser zoom.”**

**Why this misleads:** `per-domain-profiles` proves an apply/pause flow, not the advertised automatic restoration on a later visit, nor the no-zoom outcome.

**Concrete fix:** Add separately tagged assertions for a reload/new tab on the same host restoring its profile and for the extension leaving browser zoom unchanged; otherwise remove those outcomes from the copy.

### F-1-5 — Minor — prose/code layout-preservation claims are unlisted

**Location/exact quote:** **“Base size and line height bring paragraphs into balance without magnifying the whole app.”** and **“Increase monospace text on its own, while surrounding headings and navigation stay stable.”**

**Why this misleads:** These are observable behavior promises. Neither has a claim entry or a test that checks only the intended semantic text/code changes while controls/navigation retain their geometry.

**Concrete fix:** Add tests using a representative work page that measure the changed text and unchanged control/navigation styles, or rewrite as a non-promissory description of the available controls.

### F-1-6 — Minor — table-information preservation is an unlisted claim

**Location/exact quote:** **“Optional cell spacing separates dense data without changing the page’s information.”**

**Why this misleads:** No registered test demonstrates that table spacing changes without changing table content or semantics.

**Concrete fix:** Add a `table-spacing` claim test that changes the option and verifies the same header/cell text and structure, or remove the preservation promise.

### F-1-7 — Minor — numeric settings range is an unlisted quantitative claim

**Location/exact quote:** **“Readable semantic text with conservative ranges from 14–28 px and 1.2–2×.”**

**Why this misleads:** The exact numbers are useful product promises, but no `claims.json` entry asserts them. A general demo-settings claim is not a test of these boundaries.

**Concrete fix:** Add a `setting-ranges` claim that sets/asserts both endpoints for text and line spacing in the packaged extension, or remove the numbers.

### F-1-8 — Minor — cursor/focus visibility claim is unlisted

**Location/exact quote:** **“A larger cursor and lime-on-fjord keyboard focus outline stay visible across busy pages.”** README: **“Optional large pointer, high-contrast focus ring, and roomier tables.”**

**Why this misleads:** The extension exposes these controls, but no claim test verifies the advertised visual outcome and contrast.

**Concrete fix:** Add a `focus-cursor-visibility` claim test that enables both settings on a fixture and asserts the injected cursor/focus rules plus contrast, or state only that the controls are available.

### F-1-9 — Minor — starter/custom-profile claims are unlisted

**Location/exact quote:** README: **“Three useful starter profiles: Calm reading, Balanced work, and Code focus”** and **“Custom profiles cloned from the current fit.”**

**Why this misleads:** Neither the count/names nor clone behavior has a specific claim entry/test.

**Concrete fix:** Add `starter-profiles` and `custom-profile-clone` claims that inspect the freshly packaged extension and verify cloning retains the active values, or remove the promises.

### F-1-10 — Minor — contrast-treatment claim is unlisted

**Location/exact quote:** README: **“Standard, stronger, and maximum text contrast treatments.”**

**Why this misleads:** This is a three-option feature claim without a registered observable test.

**Concrete fix:** Add a `contrast-treatments` claim test that selects all three choices and asserts their different injected treatment, or remove the enumeration.

### F-1-11 — Minor — page-content/no-network/no-rewrite claims exceed their registered tests

**Location/exact quote:** README: **“The product is intentionally local-first: it has no account, analytics, browsing-history collection, third-party runtime code, or network API.”** and **“This is not a screen-reader replacement and does not rewrite or scrape page content.”**

**Why this misleads:** The current privacy tests establish no third-party requests/cookies and no history permission in the exercised flow. They do not explicitly assert no network API in the extension, no analytics/runtime code in the built package, or no text/content rewriting/scraping.

**Concrete fix:** Split the statements into registered, observable claims (request log plus package/source manifest assertions and an injected-content fixture assertion), or trim them to the behavior actually tested.

### F-1-12 — Minor — unsupported-content limitation is an unlisted claim

**Location/exact quote:** README: **“Complex canvas-based applications cannot be restyled.”**

**Why this matters:** This limitation could influence whether someone installs the extension, but it is neither demonstrated nor registered.

**Concrete fix:** Add a fixture canvas and a `canvas-limit` claim test that documents the behavior, or say only that the extension targets semantic text, code, and tables.

### F-1-13 — Minor — README opening sentence exceeds the 22-word cap

**Location/exact quote (29 words):** **“It saves a semantic reading profile for each work domain, so prose, code, contrast, keyboard focus, cursor visibility, and table density can be adjusted without repeatedly changing browser zoom.”**

**Why this loses a first-time reader:** It packs the job, seven features, and a comparison into one sentence; “semantic” is also unexplained jargon.

**Concrete fix:** **“Save one reading profile for each work site. Change text, code, contrast, focus, pointer size, and table spacing without changing browser zoom.”**

### F-1-14 — Minor — vague/mood heading: task-specific section is unnamed

**Location/exact quote:** **“One fit does not fit every task.”**

**Why this loses a first-time reader:** Read out of context, it is a metaphor rather than a section name.

**Concrete fix:** **“Choose a profile for each work site.”**

### F-1-15 — Minor — three feature headings are mood phrases

**Location/exact quotes:** **“Airier prose”**, **“Code in proportion”**, and **“Rows with room.”**

**Why this loses a first-time reader:** None says which control or result the section describes.

**Concrete fix:** Use **“Reading text and line spacing”**, **“Code text size”**, and **“Table cell spacing.”**

### F-1-16 — Minor — vague heading and jargon in the controls section

**Location/exact quote:** **“Adjust what matters. Leave the app intact.”** and **“Readable semantic text with conservative ranges from 14–28 px and 1.2–2×.”**

**Why this loses a first-time reader:** “What matters,” “semantic,” and “conservative” do not name the controls or explain their effects.

**Concrete fix:** Heading: **“Change reading settings without changing page controls.”** Body: **“Set reading text from 14 to 28 px and line spacing from 1.2 to 2.”**

### F-1-17 — Minor — metaphor heading: table feature is unnamed

**Location/exact quote:** **“Optional table breathing room.”**

**Why this loses a first-time reader:** “Breathing room” is a mood phrase, not a concrete control.

**Concrete fix:** **“Optional table cell spacing.”**

### F-1-18 — Minor — keyboard section heading is a metaphor

**Location/exact quote:** **“Change the fit without losing your place.”**

**Why this loses a first-time reader:** “Fit” is inconsistent with the product’s primary term, “profile,” and the heading fails to name keyboard shortcuts.

**Concrete fix:** **“Keyboard shortcuts for profiles.”**

### F-1-19 — Minor — install heading does not name its subject

**Location/exact quote:** **“Your settings stay with you.”**

**Why this loses a first-time reader:** It could mean sync, portability, or storage; it does not identify the install/storage section.

**Concrete fix:** **“Install the extension and store profiles locally.”**

### F-1-20 — Minor — final CTA is a slogan, not useful copy

**Location/exact quote:** **“Reading comfort is personal.”** and **“Make the web meet you halfway.”**

**Why this loses a first-time reader:** Both are mood statements with no information about what the download does.

**Concrete fix:** Replace the heading with **“Download the free Chromium extension.”** Remove the slogan.

### F-1-21 — Minor — README uses unexplained implementation jargon in reader-facing copy

**Location/exact quote:** **“Reading Comfort Profiles is a free Manifest V3 browser extension …”** and **“The product is intentionally local-first … third-party runtime code, or network API.”**

**Why this loses a first-time reader:** “Manifest V3,” “local-first,” “runtime code,” and “API” are implementation terms, not benefits or instructions for the named audience.

**Concrete fix:** **“Reading Comfort Profiles is a free browser extension for knowledge workers with low vision.”** Then: **“It has no account or analytics. Your profile settings stay in your browser.”**

### F-1-22 — Minor — README development sentence exceeds the cap and assumes tool knowledge

**Location/exact quote (25 words):** **“In extension development mode, load the WXT output from `.output/chrome-mv3` through your Chromium browser’s extension manager if it is not opened automatically.”**

**Why this loses a reader:** It is one long conditional instruction and introduces WXT without a reason.

**Concrete fix:** **“Development mode creates an unpacked Chromium extension in `.output/chrome-mv3`. If it does not open automatically, load that folder from your browser’s extension manager.”**

### F-1-23 — Minor — README build-output sentence exceeds the cap

**Location/exact quote (33 words):** **“`npm run build:site` is self-contained and produces the deployable site at `dist/site/`, including `dist/site/index.html` and the packaged extension at `dist/site/downloads/reading-comfort-profiles-chrome.zip`.”**

**Why this loses a reader:** “Self-contained” does not explain an outcome, and the long path list obscures the one command/result relationship.

**Concrete fix:** **“Run `npm run build:site` to create the deployable site in `dist/site/`. The packaged extension is `dist/site/downloads/reading-comfort-profiles-chrome.zip`.”**

## Copy audit

Counts use visible word tokens. UI labels, headings, links, buttons, and prose are included because the brief requires the landing copy and button wording to be audited. Code samples and keyboard keycaps are excluded. “OK” means it has no plain-words flag on its own; it does not mean an associated product claim is registered.

### Landing page

| Text | Words | Audit |
| --- | ---: | --- |
| Skip to main content | 4 | OK |
| Reading Comfort Profiles | 3 | OK |
| How it fits | 3 | See F-1-18: “fit” is vague/inconsistent. |
| Demo | 1 | OK |
| Download | 1 | Result-naming verb; OK. |
| Free · private · saved locally | 4 | See F-1-2. |
| Adjust work sites for low-vision reading. | 7 | OK |
| For knowledge workers with low vision who need different reading settings across web-based work apps. | 16 | OK |
| Try it with sample data | 5 | Result-naming action; OK. |
| Opens a separate demo. | 4 | OK |
| Nothing is saved to your profiles. | 7 | Claim covered by `sample-demo`; OK. |
| Download for Chromium | 3 | Result-naming action; OK. |
| Chrome, Edge, and Brave | 4 | See F-1-3. |
| One comfortable layer for every kind of work text. | 9 | Mood/metaphor; replace with “Use one profile system for documents, code, and tables.” |
| Private | 1 | OK as an assurance label. |
| No browsing history or page content is collected. | 8 | Privacy claim; covered only in part by `extension-privacy`; see F-1-11. |
| Works offline | 2 | OK as assurance label. |
| The product site reloads offline after your first visit. | 9 | Covered by `offline-reload`; OK. |
| Free | 1 | OK as assurance label. |
| No account or payment is required. | 7 | Covered by `free-download`; OK. |
| Your working set | 3 | Vague section label; use “Profiles for different work sites.” |
| One fit does not fit every task. | 7 | See F-1-14. |
| A sales table, a code review, and a long document ask different things of your eyes. | 16 | OK. |
| Save a profile to each domain and let it return automatically. | 11 | See F-1-4. |
| Airier prose | 2 | See F-1-15. |
| Base size and line height bring paragraphs into balance without magnifying the whole app. | 14 | See F-1-5; “balance” is also vague. |
| Code in proportion | 3 | See F-1-15. |
| Increase monospace text on its own, while surrounding headings and navigation stay stable. | 13 | See F-1-5. |
| Rows with room | 3 | See F-1-15. |
| Optional cell spacing separates dense data without changing the page’s information. | 11 | See F-1-6. |
| Quietly precise | 2 | Mood label; use “Reading controls.” |
| Adjust what matters. | 3 | See F-1-16. |
| Leave the app intact. | 4 | See F-1-16. |
| Text and line height | 4 | Clear heading; OK. |
| Readable semantic text with conservative ranges from 14–28 px and 1.2–2×. | 14 | See F-1-7 and F-1-16. |
| Independent monospace size | 3 | Clear heading; OK. |
| Keep code legible without making every toolbar enormous. | 8 | See F-1-5; “enormous” is imprecise. |
| A pointer and ring you can find | 7 | Clear enough but see F-1-8. |
| A larger cursor and lime-on-fjord keyboard focus outline stay visible across busy pages. | 15 | See F-1-8; color jargon is not useful. |
| Optional table breathing room | 4 | See F-1-17. |
| Turn spacing on only where tightly packed rows slow you down. | 11 | OK. |
| Keyboard path | 2 | Use “Keyboard shortcuts.” |
| Change the fit without losing your place. | 7 | See F-1-18. |
| Pause or resume this site | 5 | Clear command label; OK. |
| Next saved profile | 3 | Clear command label; OK. |
| Previous saved profile | 3 | Clear command label; OK. |
| Install | 1 | OK. |
| Your settings stay with you. | 5 | See F-1-19. |
| The extension is free and needs no account. | 8 | Covered by `free-download`; OK. |
| Download the package, load it once, and your profiles remain in browser-local storage. | 14 | Storage claim; see F-1-11. |
| Download extension | 2 | Result-naming action; OK. |
| Unzip the download | 3 | Clear instruction; OK. |
| Keep the resulting folder somewhere you won’t delete it. | 9 | OK. |
| Open your extension manager | 4 | Clear instruction; OK. |
| Visit chrome://extensions and switch on Developer mode. | 8 | OK. |
| Load the folder | 3 | Clear instruction; OK. |
| Choose “Load unpacked,” then select the unzipped folder. | 8 | OK. |
| Fit your first work site | 5 | “Fit” is inconsistent; use “Set a profile for your first work site.” |
| Open the extension, choose a profile, and adjust it once. | 10 | OK. |
| Reading comfort is personal. | 4 | See F-1-20. |
| Make the web meet you halfway. | 6 | See F-1-20. |
| Download for free | 3 | Result-naming action; OK. |
| Free accessibility software. | 3 | Free claim covered by `free-download`; OK. |
| Profiles stay in local extension storage. | 6 | Storage claim; see F-1-11. |
| Privacy / Terms / Source | 3 | Clear links; OK. |
| Version 1.0.2 · Build repair-2 · Original hero imagery was AI-generated for this product. | 14 | Provenance is useful; “AI-generated” is not a product AI claim. |

### README

| Text | Words | Audit |
| --- | ---: | --- |
| Reading Comfort Profiles | 3 | OK. |
| Reading Comfort Profiles is a free Manifest V3 browser extension for knowledge workers with low vision. | 16 | See F-1-21 for “Manifest V3.” |
| It saves a semantic reading profile for each work domain, so prose, code, contrast, keyboard focus, cursor visibility, and table density can be adjusted without repeatedly changing browser zoom. | 29 | See F-1-4 and F-1-13. |
| The product is intentionally local-first: it has no account, analytics, browsing-history collection, third-party runtime code, or network API. | 21 | See F-1-11 and F-1-21. |
| Profile settings and domain assignments stay in browser-local extension storage. | 11 | See F-1-11. |
| Live site: https://reading-comfort-profiles.sociobot.in | 8 | OK. |
| Try the sample workspace | 4 | Clear heading; OK. |
| Open https://reading-comfort-profiles.sociobot.in/demo/ or select Try it with sample data on the landing page. | 19 | Clear instruction; OK. |
| The demo starts with a realistic access-review document, code decision, and table. | 13 | Covered by `sample-demo`; OK. |
| It uses only the separate demo:reading-comfort-profiles browser-storage key. | 12 | Covered by `sample-demo`; OK. |
| Reset demo restores the sample. | 5 | Covered by `profile-settings`; OK. |
| Start for real removes the demo key before returning home. | 10 | Covered by `profile-settings`; OK. |
| What v1 includes | 3 | OK. |
| Three useful starter profiles: Calm reading, Balanced work, and Code focus | 11 | See F-1-9; “useful” is an unproved adjective. |
| Custom profiles cloned from the current fit | 7 | See F-1-9; “fit” is inconsistent. |
| Per-domain profile assignment and pause state | 7 | Covered by `per-domain-profiles`; OK. |
| Independent base text, line-height, and code-size controls | 9 | Unlisted feature claim; add a test or say “Controls for text, line spacing, and code size.” |
| Standard, stronger, and maximum text contrast treatments | 7 | See F-1-10. |
| Optional large pointer, high-contrast focus ring, and roomier tables | 10 | See F-1-8. |
| Keyboard commands for pause/resume and profile cycling | 8 | Covered by `keyboard-shortcuts`; OK. |
| Chrome-compatible packaged download and unpacked build output | 8 | See F-1-3. |
| Offline-capable static product site with privacy and terms pages | 10 | Offline is covered; page presence is directly link-checkable. |
| This is not a screen-reader replacement and does not rewrite or scrape page content. | 15 | See F-1-11. |
| Complex canvas-based applications cannot be restyled. | 7 | See F-1-12. |
| Develop | 1 | OK. |
| Requirements: Node.js 22+ and npm. | 6 | Technical setup label; OK. |
| In extension development mode, load the WXT output from .output/chrome-mv3 through your Chromium browser’s extension manager if it is not opened automatically. | 25 | See F-1-22. |
| Test and build | 3 | OK. |
| npm run build:site is self-contained and produces the deployable site at dist/site/, including dist/site/index.html and the packaged extension at dist/site/downloads/reading-comfort-profiles-chrome.zip. | 33 | See F-1-23. |
| The unpacked extension also lands at dist/extension/. | 8 | OK. |
| Install the packaged extension | 4 | Clear heading; OK. |
| Download and unzip reading-comfort-profiles-chrome.zip. | 8 | Clear instruction; OK. |
| Open chrome://extensions (or the equivalent page in Edge/Brave). | 10 | See F-1-3 for named-browser compatibility. |
| Enable Developer mode. | 3 | Clear instruction; OK. |
| Choose Load unpacked and select the unzipped folder. | 8 | Clear instruction; OK. |
| Keyboard commands default to: | 4 | Clear heading; OK. |
| Alt+Shift+R: pause or resume the current domain | 9 | Covered by `keyboard-shortcuts`; OK. |
| Alt+Shift+.: use the next profile | 6 | Covered by `keyboard-shortcuts`; OK. |
| Alt+Shift+,: use the previous profile | 6 | Covered by `keyboard-shortcuts`; OK. |
| Browsers may let users change these bindings on their extension shortcuts page. | 12 | Browser-dependent guidance; qualify with the named browser’s documentation or omit. |
| Project layout | 2 | OK. |
| src/entrypoints/: WXT popup, content script, and background worker | 9 | Developer reference; acceptable jargon in this section. |
| src/lib/: state model, local storage, and generated semantic CSS | 10 | Developer reference; acceptable jargon in this section. |
| site/: static landing, privacy, terms, and service worker | 8 | Developer reference; acceptable jargon in this section. |
| assets/src/: original full-resolution generated art and provenance | 9 | Developer reference; OK. |
| .factory/design.md: product-specific visual system and asset record | 10 | Developer reference; OK. |
| .factory/handoff.md: verification and release handoff | 7 | Developer reference; OK. |
| Privacy and license | 3 | OK. |
| Read the deployed privacy policy and terms. | 7 | Clear instruction; OK. |
| The source is available under the MIT License. | 8 | Clear statement; OK. |

## Demo, privacy, and claims checks

- **One-click demo:** Passed. A fresh landing context opens `/demo/` in one click. The first demo screen already contains a realistic “Quarterly access review,” code decision, and request table.
- **Demo banner/reset/exit:** Passed. The persistent banner says **“Demo — sample data, nothing is saved to your profiles”** and includes **Reset demo** and **Start for real**. Changing reading text 19 → 24 persisted after reload; Reset returned it to 19; Start for real removed only `demo:reading-comfort-profiles`.
- **Sandbox isolation:** Passed. With a pre-existing `readingComfortState` value, demo actions never changed it. The demo key was removed on exit. The full demo request log contained only `https://reading-comfort-profiles.sociobot.in`; no cookies or console/page errors were observed.
- **Offline/privacy:** Passed for the declared tests. The offline demo claim test passes after first visit; the request log is same-origin only.

`.factory/claims.json` is present. From a fresh local clone (`git clone --no-local`, `npm ci`), every listed exact command passed:

| Claim id | Result |
| --- | --- |
| `sample-demo` | PASS |
| `profile-settings` | PASS |
| `privacy-local` | PASS |
| `offline-reload` | PASS |
| `free-download` | PASS |
| `keyboard-shortcuts` | PASS |
| `per-domain-profiles` | PASS |
| `extension-privacy` | PASS |

`npm test`, `npm run build`, and `CI=1 npm run test:e2e` also passed from that clone (7 unit tests; 25 Playwright tests passed, 1 intentional mobile duplicate skipped). There is no failing declared claim. Findings F-1-3 through F-1-12 are unlisted claims, not failed listed tests.

## Structure and earlier-review regression check

- **Metadata/skeleton:** Passed. All public routes have an appropriate title, one `<h1>`, description, canonical, Open Graph/Twitter metadata, favicon, `lang="en"`, header/footer, Privacy/Terms links, and a designed HTTP 404. All rendered links crawled to HTTP 200 (or the expected internal anchor). The live home response includes CSP, HSTS, `Referrer-Policy`, and `X-Content-Type-Options`.
- **Deep links/back:** URLs load and Back returns to the previous document, but focus/announcement fails as recorded in F-1-1.
- **Earlier history:** There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files. I also rechecked the findings in the earlier verification/handoff history. The old missing registry/demo/audience/offline/resize-target/Enter/CSP/404/social-metadata/cache/documentation findings are fixed in the live build and code: the registry/demo exist; the audience/action are visible; the full local suite passes the offline, 200% layout, 44 px target, Enter/dialog-state, invalid-demo-state, CSP/cache, and true-404 regression tests; metadata and build identity are present. None is reissued.
- **Missed leverage:** No additional AI, import/export, or sync feature is implied by the brief. An AI feature would be decorative here; no AI/key issue was found.

## What would make this perfect

1. Repair focus and live announcement after route changes.
2. Put an explicit offline fact beside the first hero action.
3. Either test/register every remaining product promise or remove/narrow it.
4. Apply the concrete copy rewrites above, especially the mood headings, inconsistent “fit” term, and 29/25/33-word README sentences.

Only after every finding is resolved and the new claim/focus tests pass should this receive `PASS`.
