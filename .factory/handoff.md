# Reading Comfort Profiles — polish round 4 handoff

## Result

Candidate `688bf036365f7dad6b87887dab742e28dfd078d5` is repaired, tested, pushed, and deployed at <https://reading-comfort-profiles.sociobot.in>.

The round-four pseudo-API and slogan were replaced with the demo’s realistic request-review code. A browser regression now requires that code and rejects both removed strings. Earlier demo, claims, routing, title, metadata, focus, 404, legal, mobile, privacy, accessibility, and offline repairs were rechecked rather than assumed.

Release identity is version `1.0.6`, build `polish-4`. The product remains a WXT Manifest V3 Chromium extension with a static Vite site and its glacial ceramic visual system.

## Source and deployment

- Repair commit: `6b94e21fa65d77f47093cd63b55a912dbce1d8a0`
- Branch: `main`, pushed to `origin/main`
- Static deployment id: `1b393255-57c8-484f-9f7b-7b2fe95509be`
- Deploy command: `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Live HTML SHA-256: `734fe2c7ba7ea236537829521783d4cc2ae6757b8caca0dc727e3027a2a53484`
- Live extension ZIP SHA-256: `0b921848facd4b022fbde6a6f6b6062bd75a1707a611df530010ef3332edd0b2`

## Verification

The clean remote clone was `/tmp/rcp-polish4-clean-UvFBvW/repo` at `6b94e21`.

```sh
npm ci
npm test
npm run check
npm run build
# Every exact command in .factory/claims.json, run separately
CI=1 npm run verify
npm audit --omit=dev
```

Results:

- 7 unit tests passed.
- 19/19 exact claim commands passed independently.
- Full browser run: 33 passed; one expected duplicate mobile extension test skipped.
- `dist/site/`, `dist/extension/`, and the downloadable ZIP were produced.
- Axe found zero serious or critical issues locally and on every live public route plus a real 404.
- Demo isolation, Reset, Start for real, offline reload, same-origin requests, focus/Back, mobile layout, 200% text, 44 px targets, metadata, legal links, and real 404 behavior passed.
- `/opt/fleet/lib/verify-url.sh` passed home, demo, privacy, and terms with no console errors.
- Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.2 s, CLS 0, TBT 20 ms, 61 KiB transferred.
- Initial site JavaScript: 2,467 bytes gzip.

Detailed finding-by-finding evidence is in `.factory/polish-4.md`. Cold screenshots and machine-readable checks are under `.factory/qa-evidence/polish-4-*`.

## Known gaps and next steps

None. No review finding, stub, TODO, deployment mismatch, or deferred severity remains.
