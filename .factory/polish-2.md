# Polish round 2 — adversarial review closure

- Reviewed candidate: `8695b1d1373be2f01365f61502f9d3a155101838`
- Repair commit: `f4806774307d3c0c85b1767e32ccb2ff7527cbf6`
- Review reports read: `.factory/review-1.md`, `.factory/review-2.md`, `.factory/polish-1.md`, and every `verification*.md`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Result: **PASS — no finding remains open**

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Route headings are focusable; the polite route status announces forward and Back navigation. | `the ?demo=1 entry, forward navigation, and Back move focus and announce routes`; live click audit. |
| F-1-2 | The hero shows free, local-profile, and offline facts before its primary action. | `landing page presents the audience, demo, and working download`; live home screenshot. |
| F-1-3 | Visitor copy names only the tested Chromium package. | `@claim:chromium-package`. |
| F-1-4 | Per-work-site restoration, independent sites, pause/resume, and unchanged zoom are tested. | `@claim:per-domain-profiles`. |
| F-1-5 | Copy names reading/code controls; the package test asserts semantic text changes and stable controls. | `@claim:semantic-layout`. |
| F-1-6 | Table copy is precise; the package test preserves table text and markup. | `@claim:table-spacing`. |
| F-1-7 | Published ranges are asserted at both endpoints. | `@claim:setting-ranges`. |
| F-1-8 | The pointer and focus option is tested for injected rules and contrast. | `@claim:focus-cursor-visibility`. |
| F-1-9 | Exact starter profiles and full custom-profile cloning are tested. | `@claim:starter-profiles`; `@claim:custom-profile-clone`. |
| F-1-10 | All three named contrast treatments are tested. | `@claim:contrast-treatments`. |
| F-1-11 | Privacy/content copy maps to observable storage, permission, request, and DOM-preservation tests. | `@claim:privacy-local`; `@claim:extension-privacy`; `@claim:content-preservation`. |
| F-1-12 | The untestable canvas limitation was removed from visitor copy. | README and copy audit review. |
| F-1-13 | The README opening is short, direct, and free of unexplained jargon. | `.factory/copy-audit.md`. |
| F-1-14 | The profile section uses a concrete work-site heading. | `landing page presents the audience, demo, and working download`. |
| F-1-15 | Feature headings name reading text, code size, and table spacing. | `.factory/copy-audit.md`. |
| F-1-16 | Reading-controls copy names the settings and their exact ranges. | `@claim:semantic-layout`; `@claim:setting-ranges`. |
| F-1-17 | The table setting is named “Optional table cell spacing.” | `@claim:table-spacing`. |
| F-1-18 | The shortcut section names keyboard shortcuts for profiles. | `@claim:keyboard-shortcuts`. |
| F-1-19 | The install section names extension installation and local storage. | `.factory/copy-audit.md`; `@claim:extension-privacy`. |
| F-1-20 | The final action names the free Chromium extension rather than using a slogan. | `@claim:free-download`; live home screenshot. |
| F-1-21 | Reader-facing README copy avoids Manifest V3, local-first, runtime-code, and API jargon. | `.factory/copy-audit.md`. |
| F-1-22 | Development instructions are split into two short sentences. | README “Develop” review. |
| F-1-23 | Build-output instructions are split into direct sentences. | README “Test and build” review. |
| F-2-1 | Widened the desktop hero copy column, kept the action row together, and replaced the two-sentence note with “Opens an isolated demo; your profiles stay unchanged.” Added a 1440×900 viewport regression. | `desktop first screen keeps the sample action and its result visible`; live `qa-evidence/polish-2-live-home/desktop-first-screen.png`. |

## Verification

- Fresh clone: `/tmp/rcp-polish-2-clean`, made with `git clone --no-local /work/repo` at repair commit `f480677`.
- Clean clone: `npm ci` passed with zero vulnerabilities; `npm test` passed (7 tests); `npm run check` passed; `npm run build` passed.
- Every exact command listed in `.factory/claims.json` was run independently in that clean clone: **19/19 passed**.
- Full local gate: `npm run verify` passed: type/lint, 7 unit tests, build, and 29 Playwright checks; one intentional duplicate mobile extension run was skipped.
- Local browser coverage includes demo isolation/reset, offline reload, focus/Back, metadata/routing/404, 200% layout, target sizes, CSP/cache policy, package loading, and serious/critical axe findings.
- Deployment: `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site` published the production build.
- Cold live checks: `/`, `/?demo=1`, `/privacy/`, and `/terms/` passed `/opt/fleet/lib/verify-url.sh` with no console errors, one h1/main, `lang`, titles, and image-alt checks. Evidence is under `qa-evidence/polish-2-live-*`.
- Live 1440×900 audit: action bottom `760.83px`; full note bottom `755.13px`; zero serious/critical axe issues on home and demo; demo had only `demo:reading-comfort-profiles` storage; unknown URL returned HTTP 404. Evidence: `qa-evidence/polish-2-live-home/desktop-first-screen.png`, `qa-evidence/polish-2-live-demo/demo-live.png`, and `qa-evidence/polish-2-live-home/live-404.png`.

No earlier or current review finding remains unresolved.
