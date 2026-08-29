# Reading Comfort Profiles — polish 3 handoff

## Done

Released repair commit `b8083c392d84bf7cd6a40e8288d2c313f4d489d4` for the review-3 candidate `a3b4ce995fc6ca044b0b970abeba31ee6414e977`.

- The one-click `?demo=1` path still uses the isolated `demo:reading-comfort-profiles` storage namespace. Its compact real sample preview now comes before the settings form on phones, so the initial 390 × 844 viewport shows “Quarterly access review” and its review note.
- `site/src/chrome.ts` now renders the same header/footer on home, demo, privacy, terms, and 404 routes. It keeps the wordmark, Profiles/Demo/Privacy/Download navigation, legal/source links, build identity, provenance, and correct current-route marker together.
- README terminology now consistently uses **reading text**, **line spacing**, and **code text**.
- Claims, demo documentation, copy audit, catalog sentence, version, and regression tests were updated. The catalog line is verb-first and 11 words: “Adjust reading text, code, focus, and tables for each work site.”

## How to run and verify

```sh
npm ci
npm test
npm run check
npm run build
CI=1 npm run test:e2e
```

Run every exact command in `.factory/claims.json` independently after the build. The full suite exercises the MV3 package in Chromium and checks serious/critical axe findings on the five public pages.

## Exact evidence

- Fresh clone: `/tmp/rcp-polish3-clean-sqEACn/repo` at `b8083c3`.
- Clean clone: `npm ci` passed with 0 vulnerabilities; `npm test` passed 7 tests; `npm run check` and `npm run build` passed.
- All 19 claim commands passed independently. `CI=1 npm run test:e2e` passed 31 tests with one intentional mobile extension duplicate skipped. `npm audit --omit=dev` reported 0 vulnerabilities.
- Local mobile proof: `qa-evidence/polish-3-demo-mobile.png`.
- Deployment: `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site` succeeded as `e58d803f-3497-45bf-b2d3-f9053cf8b38c`.
- Cold production checks passed on `/`, `/?demo=1`, `/privacy/`, and `/terms/`; their screenshots and verifier reports are under `qa-evidence/polish-3-live-*`.
- The production demo’s phone geometry, focus announcement, isolated storage, same-origin request log, shared chrome, and offline interaction are recorded in `qa-evidence/polish-3-live-checks.json`.
- Production unknown route returns the designed HTTP 404; evidence: `qa-evidence/polish-3-live-404/check.json`.
- Live Lighthouse: 98 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; report: `qa-evidence/polish-3-live-lighthouse.json`.
- Production `index.html` and main JS match `dist/site` byte-for-byte. The live download passed integrity checking, and its unpacked extension matches `dist/extension` byte-for-byte.

## Known gaps and next steps

None. The product remains a local-first Chromium extension with a static landing site; no AI feature, account, analytics, payment, or backend is used because none is needed for the stated job.
