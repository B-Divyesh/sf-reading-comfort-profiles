# Adjust work sites for low-vision reading — independent verification 5

**VERDICT: PASS**

Candidate implementation: `37478e404b3216bc9956c9570d17a4399708356c`  
Documentation baseline: `f913bcce68532910477f9dac26d51ff160702fa6`  
Live URL: <https://reading-comfort-profiles.sociobot.in>

The commits after the candidate change only `.factory/` reports and evidence.
No product source changed after `37478e4`.

## First screen and real job

The job is **adjust work sites for low-vision reading**. It is for knowledge
workers with low vision who need separate reading settings in web-based work
apps. The first action is **Try it with sample data**.

Fresh Chromium contexts showed the job, audience, action, and result note
before scrolling:

| Context | Action bottom | Result note bottom | Viewport |
| --- | ---: | ---: | --- |
| Desktop | 761 px | 755 px | 1440 x 900 |
| Phone | 690 px | 743 px | 390 x 844 |

The note says, “Opens an isolated demo; your profiles stay unchanged.” No
console errors occurred on the landing, demo, Privacy, or Terms pages.

## Demo and consumer path

In fresh desktop and phone contexts, one click opened the isolated sample.
The persistent banner read **“Demo — sample data, nothing is saved to your
profiles”** and included Reset demo and Leave demo. The populated sample showed
**Quarterly access review**, its access-request review note, code decision, and
three request rows.

After changing Reading text to 24 px, Reset demo returned it to 19 px. An
unrelated `real:sentinel` local record retained its exact value while in the
demo and after Leave demo; only `demo:reading-comfort-profiles` was removed.
The live demo reloaded offline after service-worker activation, retained its
Reset control, and changed to Code focus without failed requests.

The downloaded live ZIP extracted to the same files as the candidate build.
The ZIP byte hashes differ because packaging metadata is not deterministic.
The live home, demo, Privacy, Terms, and 404 HTML each exactly hash-match the
candidate build. The packaged extension was loaded in a clean Chromium profile
by the browser suite and exercised through pause/resume, profile cycling,
settings, persistence, deletion, and the browser-internal-page recovery state.

## Claims and clean checkout

From a clean clone at `f913bcc`, after `npm install`, every exact command in
`.factory/claims.json` passed independently: **19 of 19**. Each of the 19
claim identifiers appears exactly once in the test source. The shared
packaged-extension test has the fourteen extension claim tags and verifies the
observable result for each tag, including all four shortcut outcomes.

The complete independent suite also passed: **35 passed, 1 intentional mobile
extension duplicate skipped**.

Additional clean-checkout gates:

- `npm run lint` — passed
- `npm run check` — passed
- `npm test` — 9 passed
- `npm run build` — passed; produced `dist/site/` and `dist/extension/`
- `npm audit` and `npm audit --omit=dev` — zero vulnerabilities

The built initial JavaScript was 2.47 KB gzip and CSS was 4.73 KB gzip. This is
within the stated static-site budgets.

## Accessibility, privacy, routes, and headers

Live Axe WCAG 2 A/AA and 2.1 AA scans found zero serious or critical issues on
home, demo, Privacy, Terms, and an unknown route. Each page had `lang="en"`,
one `h1`, one `main`, and its required route title. Keyboard Tab reaches the
skip link with a designed 3 px lime focus outline. Under reduced motion, the
checked hero transition duration is effectively zero (`0.00001s`).

Every same-origin link found across the public pages returned 200. The unknown
route returned the expected HTTP 404 and a designed page with a way back; the
browser's expected failed-resource console event for that 404 is not an
application error.

The live site sends a restrictive same-origin CSP, `frame-ancestors 'none'`,
`nosniff`, strict referrer policy, and immutable caching for hashed assets.
The complete demo request flow remained same-origin, created no cookies or
form submission, and used only its demo-prefixed record. The extension suite
confirmed one local settings record, no history/cookies permission, no
third-party request in use, and unchanged page text and structure.

## Earlier findings

All earlier review and verification findings remain resolved. This verification
rechecked their outcomes through the current suite and live exercise:

- F-1-1 through F-1-23: route focus/announcement, first-screen facts,
  Chromium-only wording, profile restoration, semantic layout, table
  preservation, settings bounds, focus contrast, profile cloning, privacy,
  plain language, and documented output all retain coverage.
- F-2-1: desktop action and full consequence remain in the first viewport.
- F-3-1 through F-3-3: phone demo shows realistic sample work first; shared
  header/footer and stable control terminology remain in place.
- F-4-1 and F-5-1 through F-5-2: the realistic code sample, Leave demo label,
  and plain README wording remain present.
- F-6-1 through F-6-4: shortcut outcomes are now tested; the privacy wording
  says “form submissions”; site and extension both report 1.0.7; and both
  dependency audits are clean with `fflate@0.8.3`.
- Earlier verification target-size, malformed-demo-state recovery, dialog
  error recovery, metadata, CSP, offline, and 404 checks all pass in the
  current regression suite and live scan.

This static browser-extension product has no backend, tenant, database,
health, or rate-limit surface. Those backend-only checks do not apply.

## Result

**PASS — 0 findings and 0 untested public claims.** The live runtime matches
implementation candidate `37478e4`; report-only documentation at `f913bcc`
does not require a different product image.
