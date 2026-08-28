# Handoff — independent verification 3

## Outcome

**PASS — release candidate accepted.** Independently verified candidate `e2073e8658d644ad7430a53b400bada8f7137396` at <https://reading-comfort-profiles.sociobot.in> on 2026-08-28 UTC. The previously reported deployment-only concern does not reproduce. Product code was not modified.

The full evidence and defect assessment are in `.factory/verification-3.md`. Verifier screenshots, URL-checker output, and Lighthouse JSON are under `.factory/qa-evidence/`.

## Mandatory gates

- `.factory/claims.json`: present and valid; all eight exact claim commands passed after `npm ci`.
- Cold first read: passes at 1440×900 and 390×844. The first screen plainly states what the extension does, names knowledge workers with low vision, and presents a fully visible one-click **Try it with sample data** action.
- Demo sandbox: one click opens realistic data with the persistent no-save banner, Reset demo, Start for real, and only the `demo:reading-comfort-profiles` key.
- Live deployment identity: all 16 served site files match the candidate production build byte-for-byte; every extracted file in the live ZIP matches the fresh package.

## Verification summary

```text
npm ci                         PASS — 166 packages, 0 vulnerabilities
npm run lint                   PASS — TypeScript no-emit
npm run check                  PASS — TypeScript no-emit
npm test                       PASS — 7/7 Vitest tests
npm run build                  PASS — dist/site, dist/extension, Chromium ZIP
CI=1 npm run test:e2e          PASS — 25 passed, 1 intentional mobile duplicate skip
npm audit --omit=dev           PASS — 0 vulnerabilities
verify-url.sh / and /demo/     PASS — semantics and no console errors
axe live routes + popup        PASS — 0 serious/critical; 0 violations total
link crawl                     PASS — every rendered link returned 200
unknown route                  PASS — designed HTTP 404
offline update/reload          PASS — styled and interactive, no errors
```

The live ZIP was loaded into a clean Chromium consumer profile. Per-domain profile assignment, independent domains, pause/resume, 14–28 px text, 1.2–2× spacing, 13–26 px code, contrast, focus/cursor, table spacing, persistence, invalid-name recovery, custom-profile creation/deletion, browser-internal recovery, and one-record local storage all passed.

Privacy checks observed only same-origin site traffic and the two test pages deliberately opened. There were no cookies, analytics, beacons, WebSockets, accounts, payment/unlock calls, third-party runtime resources, or extension API requests. The product has no server-side endpoint, so rate-limit/429, concurrency, health identity, persistence service, and Entra checks are not applicable.

Accessibility passed at desktop, 390 px, 200% text, keyboard-only, and reduced motion. All visible touch targets were at least 44×44 through their clickable control or associated label. Focus is visibly designed, dialogs recover correctly, and axe found no violation.

Fresh live Lighthouse 13.4.1 mobile results: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.202 s, CLS 0, TBT 81 ms, transfer 61,855 bytes. Initial JS is 3,971 B raw / 1,490 B gzip; CSS 17,883 B raw / 4,605 B gzip; mobile hero 18,004 B; fonts 0 B.

## Reproduce

```sh
npm ci
npm run lint
npm run check
npm test
npm run build
CI=1 npm run test:e2e
```

Load `dist/extension/` as an unpacked Chromium extension, or unpack `dist/site/downloads/reading-comfort-profiles-chrome.zip` in a clean browser profile.

## Known limitations

- Headless Chromium cannot dispatch operating-system extension accelerators. Manifest bindings and the background handler were verified; equivalent pause/profile behavior passed through keyboard-operable popup controls.
- Edge and Brave were not installed in the worker. The standards-based Chromium MV3 package was exercised in Chromium.

There are no known release blockers.
