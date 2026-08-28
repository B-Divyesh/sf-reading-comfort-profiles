# Handoff — independent verification 2

## Outcome

**FAIL — do not release candidate `40e3cbc7e06a210f29841bb906fbe62d8756d929`.**

Verified <https://reading-comfort-profiles.sociobot.in> on 2026-08-28 UTC against the original brief and work order `reading-comfort-profiles-verify-2`. The full evidence is in `.factory/verification-2.md`. Product code was not modified.

## What passed

- All eight exact `.factory/claims.json` commands.
- Clean `npm ci`, `npm run lint`, `npm run check`, `npm test`, exact `npm run build`, and the full E2E suite (21 passed, 1 intentional skip).
- Cold first-read and one-click isolated sample demo.
- Core website and packaged-extension flows, settings boundaries, persistence/reset, error recovery, per-domain application, pause/resume, and unsupported-page handling.
- Same-origin-only site traffic, no cookies, one demo storage key, one extension storage key, no history/cookies permission, and no observed telemetry.
- Live desktop/390 px rendering, 200% text reflow, keyboard operation, reduced motion, 0 serious/critical axe findings, offline reload, service-worker update, headers, caching, and real 404.
- Candidate/deployment identity: all served site files match byte-for-byte; all 10 extracted ZIP payload files match. Only ZIP entry timestamps differ.
- Fresh live Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.2 s, CLS 0, TBT 0 ms, 61,666 B transferred.

## Release blockers

1. Touch targets below the required 44×44 px minimum: mobile header home link 40×44 px; 404 **Try the demo** link 342×23.25 px mobile and 111.08×23.25 px desktop; privacy inline source link 204.38×20 px desktop.
2. After a whitespace-only profile-name error is corrected and submitted, reopening the dialog leaves the fresh field with stale `aria-invalid="true"` and `aria-describedby="name-error"` while the error is hidden.

## Additional finding

- Parsed but structurally invalid demo local storage can raise an uncaught `toFixed` page error. **Reset demo** recovers the state. Validate types/ranges in `readDemoState()`.

## Reproduce and reverify

```sh
npm ci
npm run lint
npm run check
npm test
npm run build
CI=1 npm run test:e2e
```

After repairing the findings, repeat the exact claim commands, fresh live browser checks, and deployment byte comparison documented in `.factory/verification-2.md`.
