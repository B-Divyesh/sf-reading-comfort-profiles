# Review 3 handoff

## Done

Completed an adversarial cold review of the live Reading Comfort Profiles site at 390 × 844 and 1440 × 900. Wrote `.factory/review-3.md`; no product code was changed.

Verdict: **FAIL** with one blocking and two minor findings:

- F-3-1: the realistic demo content is entirely below the initial phone viewport.
- F-3-2: headers and footers are not consistent across routes.
- F-3-3: the README uses alternate implementation-flavored names for three controls.

## Verification

- Clean clone: `/tmp/rcp-review3-clean-E8oqw5/repo` at `a3b4ce995fc6ca044b0b970abeba31ee6414e977`.
- `npm ci`, `npm test`, `npm run check`, and `npm run build`: passed.
- Every exact command in `.factory/claims.json`: 19/19 passed independently.
- `npm run verify`: passed with 7 unit tests and 29 Playwright tests; one intentional duplicate mobile extension run skipped.
- Live route crawl, metadata, response headers, designed HTTP 404, Back/focus announcements, same-origin request log, offline reload, and serious/critical axe checks: passed.
- The live and clean-build extension archives contain identical unpacked files.
- Review-only screenshots and URL-verifier output are in `/tmp/review3-*` and `/tmp/rcp-review3-verify-*`; they are not repository artifacts.

## Next steps

Repair F-3-1 first and add the required 390 × 844 viewport-intersection test. Then unify route chrome and normalize README terminology. Re-run every claim and the entire checklist before changing the verdict.
