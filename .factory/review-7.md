# Adjust work sites for low-vision reading — strict review 7

**VERDICT: PASS — 0 findings; 0 untested public claims.**

- Product: Reading Comfort Profiles
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Reviewed: 2026-09-05 UTC
- Implementation candidate: `37478e404b3216bc9956c9570d17a4399708356c`
- Documentation baseline reviewed: `75eb5bdc141b558d5d3ec70ac1b107686ce546bd`

Commits after `37478e4` change only `.factory/` reports and evidence. The
current deployment was compared with the candidate build, not mistaken for a
later report-only commit.

## First screen

Fresh Chromium contexts were opened before scrolling.

| Context | Job | Audience | First action | Action / result-note bottom |
| --- | --- | --- | --- | ---: |
| 1440 × 900 desktop | “Adjust work sites for low-vision reading.” | Knowledge workers with low vision who need different reading settings across web-based work apps. | “Try it with sample data” | 761 / 755 px |
| 390 × 844 phone | Same | Same | Same | 690 / 743 px |

Both screens also showed the three facts: free, profiles stay in the browser,
and the site works offline after its first visit. The adjacent note says,
“Opens an isolated demo; your profiles stay unchanged.” The page answers the
job, audience, and first action without scrolling. The ceramic/ice asset,
fjord palette, large native type, and asymmetric surfaces match the recorded
visual thesis and remain specific to this product.

## Demo and real job

On both fresh desktop and phone contexts, one click opened
`/demo/?demo=1`. The first demo viewport contained the persistent label
“Demo — sample data, nothing is saved to your profiles,” Reset demo, Leave
demo, the populated **Quarterly access review**, and its realistic access
review note. The destination heading received focus after the landing action.

Changing Reading text to 24 px, then choosing Reset demo, restored 19 px.
An unrelated `real:sentinel` local-storage record stayed unchanged; Leave demo
removed only `demo:reading-comfort-profiles` and returned home. Fresh live
offline verification activated the service worker, disabled the network cache,
reloaded `/demo/` offline, changed to Code focus and 23 px text, showed the
offline notice, and recorded no failed requests.

## Claims and clean-checkout gates

After the documented `npm ci` setup:

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run check` | PASS |
| `npm test` | PASS — 9 tests |
| `npm run build` | PASS — produced `dist/site/` and `dist/extension/` |
| Each exact command in `.factory/claims.json` | PASS — 19 of 19 independently |
| `CI=1 npm run test:e2e` | PASS — 35 passed; 1 intentional mobile extension duplicate skipped |
| `npm run verify` | PASS — documented combined quality gate |
| `npm audit` and `npm audit --omit=dev` | PASS — 0 vulnerabilities |

The independently executed claims were `sample-demo`, `profile-settings`,
`privacy-local`, `offline-reload`, `free-download`, `chromium-package`,
`keyboard-shortcuts`, `per-domain-profiles`, `semantic-layout`,
`table-spacing`, `setting-ranges`, `focus-cursor-visibility`,
`starter-profiles`, `custom-profile-clone`, `contrast-treatments`,
`extension-privacy`, `content-preservation`, `profile-deletion`, and
`unsupported-pages`. Each identifier has exactly one tagged observable test.
The full consumer suite loaded `dist/extension/` as the only extension in a
fresh Chromium profile and exercised the popup, settings bounds, custom
profile validation/recovery, pause/resume, profile cycling, persistence,
deletion, content preservation, privacy permissions/requests, and
browser-internal-page recovery.

The landing page, demo, popup, README, Privacy, and Terms copy were
cross-checked with the registry and copy audit. All capability and privacy
statements map to the listed tests; no missing, false, incomplete, or untested
public claim was found.

## Live accessibility, routes, privacy, and delivery

- Live Axe WCAG 2 A/AA and 2.1 AA scans found no serious or critical issue on
  home, demo, Privacy, Terms, or the unknown-route page.
- Each rendered route has `lang="en"`, one `h1`, one `main`, route-specific
  title, canonical URL, description, social metadata, skip link, shared
  header/footer, and no application console error. Keyboard route navigation
  and Back focus the destination heading and announce the route title.
- At 390 px with 200% root text, home, demo, Privacy, and Terms had zero
  horizontal overflow. Reduced motion reports `scroll-behavior: auto`.
- Home, demo, Privacy, and Terms returned HTTP 200. Every public rendered link
  returned 200, including the download and source repository. An unknown path
  correctly returned HTTP 404 with the designed “We could not find this page”
  page, one `h1`, one `main`, and working return links. Its expected browser
  failed-resource 404 message is not an application error.
- The complete live demo request flow was same-origin, created no cookies,
  sent no data request, and used only its demo-prefixed local record.
- Live headers provide same-origin CSP with `frame-ancestors 'none'`, HSTS,
  `nosniff`, strict referrer policy, frame denial, and restrictive permissions
  policy. The hashed JavaScript has one-year immutable caching.
- The current build has 6,586 bytes raw / 2,470 bytes gzip of initial JS and
  18,335 bytes raw / 4,730 bytes gzip of CSS. The responsive mobile hero is
  18,004 bytes; no remote fonts or third-party runtime scripts are loaded.

All 16 deployed non-archive files byte-match the candidate build. The live ZIP
has a different archive hash because packaging timestamps vary, but all ten
extracted extension files byte-match `dist/extension/`.

## Earlier findings disposition

| Earlier item | Current disposition and evidence |
| --- | --- |
| F-1-1 | Fixed: route click and Back focus the new `h1` and update the polite route status. |
| F-1-2 | Fixed: the first screen visibly states free, browser-local profiles, and offline-after-first-visit. |
| F-1-3 | Fixed: public compatibility wording promises the tested Chromium package only. |
| F-1-4 | Fixed: `per-domain-profiles` proves same-host return, separate-host independence, pause/resume, and unchanged zoom. |
| F-1-5 | Fixed: `semantic-layout` proves changed prose/code and stable headings/controls. |
| F-1-6 | Fixed: `table-spacing` proves changed padding with exact headings, values, and markup. |
| F-1-7 | Fixed: `setting-ranges` proves all published minimum and maximum values. |
| F-1-8 | Fixed: `focus-cursor-visibility` proves the pointer/focus rules and at least 4.5:1 outline contrast. |
| F-1-9 | Fixed: `starter-profiles` and `custom-profile-clone` prove the names and copied settings. |
| F-1-10 | Fixed: `contrast-treatments` proves standard, stronger, and maximum results. |
| F-1-11 | Fixed: local privacy, extension privacy, and content preservation are each observable claim tests. |
| F-1-12 | Fixed: the unsupported untestable canvas statement remains absent from visitor copy. |
| F-1-13 through F-1-23 | Fixed: the current copy audit confirms short, concrete, consistent wording with no banned/mood headings or unsupported capability statement. |
| F-2-1 | Fixed: desktop action and its whole result note remain within 900 px. |
| F-3-1 | Fixed: realistic sample heading and review note are in the first phone demo viewport. |
| F-3-2 and F-3-3 | Fixed: public pages share the rendered chrome and use consistent reading-control terms. |
| F-4-1 | Fixed: the code sample remains the realistic request-review snippet. |
| F-5-1 and F-5-2 | Fixed: Leave demo truthfully removes only sample state; README remains plain-language. |
| F-6-1 | Fixed: the extension consumer test proves all four shortcut outcomes through the packaged command handler. |
| F-6-2 | Fixed: Privacy accurately says “form submissions,” and local-form behavior is tested. |
| F-6-3 | Fixed: package, footer, and downloaded manifest all report 1.0.7. |
| F-6-4 | Fixed: `fflate@0.8.3` is installed; both audits are clean. |
| Verification 1–4 and polish 1–5 minor items | Still fixed under the current suite: isolated demo, malformed storage recovery, dialog error recovery, target sizes, CSP, true 404, metadata, cache behavior, offline reload, and copied/shared site chrome. |

This is a static browser-extension product. Backend-only tenant isolation,
database restart, health endpoint, and 429/Retry-After checks do not apply.
The brief does not imply an AI feature, import, export, or sync requirement;
none is missing.

## Result

**PASS — 0 findings and 0 untested public claims.**
