# Handoff — polish round 1

## Outcome

Reading Comfort Profiles 1.0.3 is repaired, pushed, deployed, and cold-verified at <https://reading-comfort-profiles.sociobot.in>.

All 23 findings in `.factory/review-1.md` are closed. Earlier verification regressions remain covered. The WXT Manifest V3 extension and static-site deployment class are unchanged, and the glacial ceramic visual system is preserved.

## What changed

- Added the direct `/?demo=1` entry into the existing isolated `/demo/?demo=1` sandbox, with persistent banner, Reset demo, Start for real, and separate `demo:` storage.
- Added route-transition focus and polite announcements for forward and Back navigation.
- Put price, local privacy, and offline behavior on the first screen without moving the primary action below either tested viewport.
- Rewrote mood headings, metaphors, jargon, and long README sentences in plain task language.
- Expanded `.factory/claims.json` from 8 to 19 observable claims and exercised the packaged extension for every extension claim.
- Added route-specific social metadata across demo, legal, and 404 pages; retained true 404 behavior, legal links, security headers, and immutable assets.
- Fixed 200%-text wrapping for long mobile headings and kept all standalone targets at least 44×44 CSS px.
- Updated the catalog description, demo guide, copy audit, version/build identity, and release evidence.

The exact finding-by-finding mapping is in `.factory/polish-1.md`.

## Verification

Run locally:

```sh
npm ci
npm run verify
```

Observed results:

- `npm run lint` and `npm run check`: pass
- `npm test`: 7 passed
- `npm run build`: pass; produced `dist/site/`, `dist/extension/`, and the downloadable ZIP
- `npm run test:e2e`: 27 passed, 1 intentional duplicate mobile extension run skipped
- Every exact claim command from a clean no-local clone: 19/19 passed
- `npm audit --omit=dev`: zero vulnerabilities
- `unzip -t dist/site/downloads/reading-comfort-profiles-chrome.zip`: no errors
- Playwright axe: zero serious/critical findings across all public routes, the real 404, and popup
- Live URL verifier: no missing title/lang/main/h1/alt/button label and no console errors
- Live Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.05 s; CLS 0; TBT 46 ms
- Build sizes: initial JS 4,858 B raw / 1,840 B gzip; CSS 18,302 B raw / 4,720 B gzip; mobile hero 18,004 B; no fonts
- Cold mobile and 200% text: zero horizontal overflow; first action y=638–690 in 390×844
- Cold desktop: first action y=804–856 in 1440×900
- Privacy flow: same-origin requests only, no cookies or console errors, real-data sentinel unchanged
- Offline production demo: styled, interactive, and zero failed requests
- Unknown production route: HTTP 404 with the designed recovery page

## Deployment

- Pushed branch: `main`
- Deployed payload commit: `e8cbd5ef3589c353511f91ed684933949161246b`
- Azure Static Web Apps deployment ID: `b21fb56a-5c1f-42cb-b137-137dce07c027`
- Live ZIP SHA-256: `d60e223d0182da87fd86ec66cdadd4fb354816c9eb261be64b364d9e862a6a65`
- The live HTML, hashed JS, hashed CSS, service worker, and ZIP match the local deployment files byte-for-byte.

## Known gaps and next steps

No product, review, accessibility, privacy, offline, performance, or deployment gap remains in scope. Operating-system extension accelerators cannot be synthesized by headless Chromium; their package bindings and handlers are verified, and the same actions are exercised through keyboard-operable popup controls.
