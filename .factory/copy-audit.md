# Landing-page copy audit

Audited 2026-08-29 against `site/index.html`, the shared public chrome, and `README.md`. Counts treat numbers and hyphenated terms as one word. No sentence exceeds 22 words. No banned marketing word appears. Capability statements map to `.factory/claims.json`.

## First screen

| Visible copy | Words | Result |
| --- | ---: | --- |
| Free | 1 | Pass — `free-download`. |
| Profiles stay in your browser | 5 | Pass — `extension-privacy`. |
| Site works offline after first visit | 7 | Pass — `offline-reload`. |
| Adjust work sites for low-vision reading. | 7 | Pass — direct job headline. |
| For knowledge workers with low vision who need different reading settings across web-based work apps. | 15 | Pass — audience and situation. |
| Try it with sample data | 5 | Pass — `sample-demo`. |
| Opens an isolated demo; your profiles stay unchanged. | 8 | Pass — `sample-demo`. |
| Download for Chromium | 3 | Pass — direct action. |
| Tested in Chromium | 3 | Pass — `chromium-package`. |
| Use profiles for documents, code, and tables. | 7 | Pass — concrete illustration caption. |

## Product assurances and profile examples

| Visible copy | Words | Result |
| --- | ---: | --- |
| No browsing history or page content is collected. | 8 | Pass — `extension-privacy` and `content-preservation`. |
| The product site reloads offline after your first visit. | 9 | Pass — `offline-reload`. |
| No account or payment is required. | 7 | Pass — `free-download`. |
| Choose a profile for each work site. | 7 | Pass — section names the task. |
| A sales table, a code review, and a long document need different settings. | 13 | Pass. |
| Save a profile to each work site for automatic return. | 10 | Pass — `per-domain-profiles`. |
| Reading text and line spacing | 5 | Pass — concrete feature heading. |
| Change paragraph text and line spacing while page controls keep their original size. | 13 | Pass — `semantic-layout`. |
| Code text size | 3 | Pass — concrete feature heading. |
| Change monospace text without changing surrounding headings or navigation. | 9 | Pass — `semantic-layout`. |
| Table cell spacing | 3 | Pass — concrete feature heading. |
| Add cell spacing without changing table headings, values, or structure. | 10 | Pass — `table-spacing`. |

## Reading controls and keyboard

| Visible copy | Words | Result |
| --- | ---: | --- |
| Change reading settings without changing page controls. | 7 | Pass — names the section and `semantic-layout`. |
| Set reading text from 14 to 28 px and line spacing from 1.2 to 2. | 15 | Pass — `setting-ranges`. |
| Set code text separately from headings, navigation, and page controls. | 10 | Pass — `semantic-layout`. |
| Turn on a larger pointer and a high-contrast keyboard focus outline. | 11 | Pass — `focus-cursor-visibility`. |
| Turn on spacing where tightly packed rows slow you down. | 10 | Pass — `table-spacing`. |
| Keyboard shortcuts for profiles. | 4 | Pass — `keyboard-shortcuts`. |
| Pause or resume this site | 5 | Pass — `keyboard-shortcuts`. |
| Next saved profile | 3 | Pass — `keyboard-shortcuts`. |
| Previous saved profile | 3 | Pass — `keyboard-shortcuts`. |

## Installation and footer

| Visible copy | Words | Result |
| --- | ---: | --- |
| Install the extension and store profiles locally. | 7 | Pass — direct section heading. |
| The extension is free and needs no account. | 8 | Pass — `free-download`. |
| Your profiles stay in your browser. | 6 | Pass — `extension-privacy`. |
| Keep the resulting folder somewhere you won’t delete it. | 9 | Pass — direct instruction. |
| Visit chrome://extensions and switch on Developer mode. | 7 | Pass — direct instruction. |
| Choose “Load unpacked,” then select the unzipped folder. | 8 | Pass — direct instruction. |
| Open the extension, choose a profile, and adjust it once. | 10 | Pass — direct instruction. |
| Download the free Chromium extension. | 5 | Pass — `free-download` and `chromium-package`. |
| Adjust work sites for low-vision reading. | 6 | Pass — product one-line description. |
| Built by Param Factory. | 4 | Pass — attribution. |
| Original hero imagery was AI-generated for this product. | 8 | Pass — provenance, not a product capability. |

## Demo, shared navigation, and README terminology

| Visible copy | Words | Result |
| --- | ---: | --- |
| Adjust the sample work page. | 6 | Pass — names the demo task. |
| Change the sample profile and see prose, code, and table spacing respond. | 12 | Pass — `sample-demo`, `profile-settings`. |
| This demo uses separate browser storage. | 6 | Pass — `privacy-local`. |
| Quarterly access review | 3 | Pass — realistic sample heading; `sample-demo`. |
| Review note. The support team resolved 18 access requests this week. | 10 | Pass — realistic sample content visible in the first phone viewport; `sample-demo`. |
| Separate controls for reading text, line spacing, and code text | 9 | Pass — one term per control, matching the UI and `semantic-layout`. |
| Profiles / Demo / Privacy / Download | 4 | Pass — identical primary navigation on every route. |
| Privacy / Terms / Source | 3 | Pass — identical footer links on every route. |

Short interface labels also pass: Profiles, Demo, Download, Private, Works offline, Free, Document, Code review, Dashboard, Reading controls, Text and line spacing, Code text size, Pointer and focus outline, Optional table cell spacing, Install, Download extension, Unzip the download, Open your extension manager, Load the folder, Set a profile for your first work site, Download for free, Privacy, Terms, and Source.

## Terminology

| Concept | One term used in visitor copy |
| --- | --- |
| Saved configuration | profile |
| Website grouping | work site |
| Trial environment | demo |
| Adjustable presentation | reading settings |
| Main text control | reading text |
| Vertical text control | line spacing |
| Monospace text control | code text |
| Installable archive | Chromium package |

Implementation-only names such as `domainProfiles` and `semantic CSS` remain confined to source and developer documentation.
