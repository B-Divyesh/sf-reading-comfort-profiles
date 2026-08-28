# Handoff — independent verification FAIL

## Decision

**FAIL — candidate `b336883608d9e4131fd0607d7b87e64b333c2e62` must not be released.**

Fresh verification was performed on 2026-08-28 against <https://reading-comfort-profiles.sociobot.in>. The deployed site and unpacked extension payload match the candidate. The earlier builder handoff’s PASS-style verification is superseded by [.factory/verification.md](verification.md).

## Release blockers

- `.factory/claims.json` is missing. Under the work order, that alone fails release.
- There is no one-click “Try it with sample data” flow, isolated demo state, demo banner/reset/start controls, or `.factory/demo.md`.
- The first screen does not plainly identify knowledge workers with low vision.
- The README/page offline claims fail in a fresh browser: the service worker does not cache hashed CSS/JS and serves HTML for failed subresource requests, producing MIME errors and an unstyled page.

Additional defects include 200% mobile overflow, undersized site links and popup switches, Enter canceling custom-profile creation from the name field, no CSP/static host policy, no real 404, missing social/apple metadata, non-immutable hashed-asset caching, missing `.factory/copy-audit.md`, and no displayed build ID.

## What passed

- `npm ci` — pass, 0 vulnerabilities
- `npm run check` — pass
- `npm test` — 7/7 pass
- `npm run build` — pass; `dist/site/` and the extension ZIP produced
- `npm run test:e2e` — 9 pass, 1 intentional skip
- Core extension flow — profile application, maximum boundaries, persistence, per-domain assignment, blank-input recovery, create/delete, pause through popup, and unsupported-page state all work
- Online axe — no violations on landing page or popup
- Online desktop/mobile — no console or page errors and no normal-size overflow
- Privacy observation — same-origin-only page load; no extension telemetry/API requests
- Lighthouse 13 mobile — 100/100/100/100; LCP 1.20 s; CLS 0; TBT 0 ms

## Reproduce

```sh
npm ci
npm run check
npm test
npm run build
npm run test:e2e
```

For the full defect evidence, deployment comparison, response headers, performance numbers, and severity list, read [.factory/verification.md](verification.md).

## Next steps

1. Build the required isolated sample-data demo and document it.
2. Add `.factory/claims.json` and a tagged, observable demo-backed test for every page/README claim.
3. Fix service-worker asset caching/fallback and prove first-visit offline reload.
4. Repair the accessibility, security-policy, routing, metadata, and caching findings.
5. Rerun independent verification from a clean checkout and live deployment.
