# Reading Comfort Profiles — polish round 5 handoff

## Result

Released the repair for review candidate `773c2119a5bd36bf0d08b2cac8f593b91a7b7df8` after applying every finding from all review and polish records. The product repair is `b3e9fdbb1617154e0d1b51cf3fd8054209566493`.

- Replaced the ambiguous demo action with **“Leave demo”**. Its claim regression verifies the exact label, demo-only storage cleanup, reset, reload persistence, and preservation of unrelated local data.
- Rewrote the four remaining README implementation phrases in plain language.
- Preserved the glacial-ceramic visual system and all earlier routing, metadata, 404, legal, mobile, demo, claims, privacy, and packaged-extension fixes.
- Updated the catalog description to the verb-first, 11-word sentence: “Save reading settings for text, code, focus, and tables on each work site.”

## How to run and verify

```sh
npm ci
npm test
npm run check
npm run build
CI=1 npm run test:e2e
```

Run each exact `test` command in `.factory/claims.json` independently from a clean clone. Use `npm run build` to produce `dist/site/` and `dist/extension/`.

## Exact verification evidence

- Fresh clone: `/tmp/rcp-polish5-clean-qPmpRw/repo` at repair commit `b3e9fdbb1617154e0d1b51cf3fd8054209566493`.
- `npm ci` passed with 0 vulnerability findings; `npm test` passed 7 tests; `npm run check` and `npm run build` passed.
- All **19/19** registered claim commands passed independently in that clone.
- `CI=1 npm run test:e2e` passed **33 tests**; one intentionally redundant mobile extension test was skipped. This includes the packaged MV3 extension, all claim tags, Axe serious/critical checks, direct demo entry/reset/exit, privacy, offline reload, focus/Back navigation, actual 404, metadata, mobile/200% layout, and touch targets.
- `npm audit --omit=dev` returned **0 vulnerabilities**.
- Static deployment command: `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site`.
- Deployment `6788a64f-c741-4b68-b795-a00bd8564af1` completed successfully at <https://reading-comfort-profiles.sociobot.in>.
- Cold `verify-url.sh` checks passed for `/`, `/?demo=1`, `/privacy/`, and `/terms/`. Evidence: `.factory/qa-evidence/polish-5-live-audit/verify-*/verify.json`.
- The independent cold-live audit at `.factory/qa-evidence/polish-5-live-audit/live-audit.json` confirms the direct demo flow, isolated storage, reset/exit, live route focus/announcements, same-origin request log, offline interaction, link responses, route titles/canonicals, one real HTTP 404, and zero serious/critical Axe findings.
- Live Lighthouse report: `.factory/qa-evidence/polish-5-live-lighthouse.json` — Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.2 s, CLS 0.09, TBT 60 ms, transfer 61 KiB.

## Evidence and known gaps

`/work/repo/.factory/polish-5.md` maps F-1-1 through F-5-2 to the exact repair and evidence. Mobile/desktop screenshots and route verifier output are under `.factory/qa-evidence/polish-5-live-audit/`.

No known gaps or deferred findings remain.
