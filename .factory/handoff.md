# Reading Comfort Profiles — independent verification 4 handoff

## Result

**PASS — candidate accepted.**

- Candidate: `bd9be7812d5af44415e175919124fa473d5e5708`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Verified: 2026-08-29 UTC
- Full report: [`.factory/verification-4.md`](verification-4.md)

Fresh verification found the live deployment present and matching the candidate. All 19 registered claim commands pass, the cold first screen answers what the product does, who it serves, and what to click, and the one-click sample is isolated. The packaged extension completes per-site profile selection, semantic text/code/table changes, pause/resume, persistence, invalid-input recovery, deletion, and privacy checks in clean Chromium.

## How to verify

```sh
npm ci
npm run lint
npm run check
npm test
npm run build
CI=1 npm run test:e2e
npm audit --omit=dev
```

Also run each exact `test` entry in `.factory/claims.json` independently. The production outputs are `dist/site/` and `dist/extension/`.

## Evidence

- Claims: 19/19 passed independently.
- Unit tests: 7/7 passed.
- Full Playwright: 33 passed; one deliberately redundant mobile extension run skipped.
- Factory URL checks: home, direct demo, privacy, and terms passed with no console error.
- Axe: zero serious/critical issues across public routes, the real 404, and extension popup.
- Lighthouse mobile: 98 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.06 s, CLS 0.090, total transfer 62,461 B.
- Deployment parity: every served non-ZIP site file matched byte-for-byte; all 10 extracted live extension files matched the candidate.
- Privacy: focused demo traffic was same-origin only, with no product cookie or runtime error.
- Offline: service-worker update and cache-bypassed offline reload passed; the sample remained interactive.
- Screenshots, URL reports, and Lighthouse JSON are under `.factory/verification-artifacts-4/`.

## Findings and limitations

- No critical, high, or medium defects.
- Low: the site/npm version is 1.0.7 while the extension manifest version is 1.0.6. Candidate and live match, and functionality is unaffected.
- Headless Chromium cannot prove physical OS dispatch of browser-level accelerators. Bindings, command handler, and equivalent keyboard behavior were verified. Edge and Brave were not available.
- No backend, unlock endpoint, payment, sign-in, rate-limit allowance, or AI runtime exists, so those checks are not applicable.

No product code was changed. Only independent verification documentation and evidence were added.
