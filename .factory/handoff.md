# Polish 2 handoff

## Done

Repaired the only remaining adversarial-review issue from `dd3a7c7578dbefa96bd49c66bd3f56a2b393ea5a`: the desktop sample-data consequence is now fully visible beside the primary action. The action wording is clearer, its 1440×900 viewport position is regression-tested, and the product is now version `1.0.4` / build `polish-2` on all public routes and in the packaged extension.

The one-line catalog description is now: “Adjust reading settings for each work site.”

## Evidence

- Repair commit pushed to `main`: `f4806774307d3c0c85b1767e32ccb2ff7527cbf6`.
- Clean clone `/tmp/rcp-polish-2-clean`: `npm ci` (zero vulnerabilities), `npm test` (7 passed), `npm run check`, and `npm run build` all passed.
- Every exact `.factory/claims.json` command ran independently from that clean clone: 19/19 passed.
- `npm run verify` passed locally: 7 unit tests and 29 Playwright checks; one intentional duplicate mobile extension run skipped.
- Live deployment used `/opt/fleet/lib/deploy-static.sh reading-comfort-profiles dist/site`.
- Cold live verification passed for home, demo, Privacy, and Terms with no console errors. A cold 1440×900 browser check measured the demo action at y=708.83–760.83 and its full note at y=714.53–755.13; both are inside the viewport. It also confirmed route focus/announcement, demo-only storage, zero serious/critical axe findings on home and demo, and a designed HTTP 404.
- Live evidence: `.factory/qa-evidence/polish-2-live-home/`, `.factory/qa-evidence/polish-2-live-demo/`, `.factory/qa-evidence/polish-2-live-privacy/`, and `.factory/qa-evidence/polish-2-live-terms/`.

## Run and deploy

Run `npm ci`, then `npm run verify`. Build deployable output with `npm run build:site`; it produces `dist/site/` and the Chromium ZIP at `dist/site/downloads/reading-comfort-profiles-chrome.zip`.

## Known gaps

None. The extension’s global browser shortcut dispatch cannot be synthesized by headless Chromium, but the manifest bindings and the same behavior through keyboard-operable popup controls are covered by the packaged-extension test.
