# Review 2 handoff

## What was done

Completed the requested adversarial first-read review of the deployed product without modifying product code. Wrote `.factory/review-2.md`.

## Verification

- Cold live Chromium checks at 390 × 844 and 1440 × 900.
- Live one-click demo, reset, exit, storage isolation, request logging, offline reload, route-focus/back behavior, metadata, headers, designed 404, and link crawl.
- Fresh local clone at `8695b1d1373be2f01365f61502f9d3a155101838`: `npm ci`, `npm test`, `npm run check`, and `npm run build` passed.
- Every one of the 19 exact `.factory/claims.json` commands passed independently from that clean checkout.
- Read every earlier review, polish, verification, and handoff document and rechecked every earlier finding.

## Result and remaining work

Review result: **FAIL**. `F-2-1` is the only remaining finding: at desktop 1440 × 900, the complete note explaining the sample-data action is below the first viewport. Keep the full note visible with the primary action and add a viewport regression test.

No product files were changed. The repository remains buildable; this handoff and the review are the only changes.
