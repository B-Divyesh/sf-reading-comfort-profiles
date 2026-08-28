# Independent verification — FAIL

- Candidate: `b336883608d9e4131fd0607d7b87e64b333c2e62`
- Live URL: <https://reading-comfort-profiles.sociobot.in>
- Verified: 2026-08-28 UTC
- Work order: `reading-comfort-profiles-verify-1`
- Result: **FAIL — do not release**

The core extension works, but the candidate fails two explicit automatic acceptance gates: `.factory/claims.json` is missing, and the first screen has no one-click sample-data demo. A claimed offline path also fails in a fresh browser.

## Mandatory gates

### Claims gate — FAIL

The first repository access was:

```text
$ sed -n '1,240p' .factory/claims.json
sed: can't read .factory/claims.json: No such file or directory
```

There were therefore no listed claim tests to run through a demo entry point. This is release-blocking under the supplied claims contract. It also leaves numerous user-reliant statements unlisted and untested, including “Free · private · local-first,” “No browsing history,” the keyboard-shortcut claims, “your profiles remain in browser-local storage,” “No analytics,” and the README’s “Offline-capable static product site.”

### Cold first-read gate — FAIL

In a fresh 1440×1000 browser context, the first screen showed:

- Headline: “Fit the web to how you read.”
- Supporting text: “Save comfortable text, code, contrast, focus, and table settings for each work domain. Switch profiles without touching browser zoom.”
- First action: “Download for Chrome”

This explains the function and gives an action, but does not name low-vision knowledge workers in plain words. More decisively, there is no “Try it with sample data” action. `/demo` returns the ordinary landing page, with none of the required demo banner, reset, start-for-real, or sample state. `.factory/demo.md` is also missing. The candidate fails the first-read/demo gate independently of all other results.

## Clean checkout and local gates

The checkout was clean and exactly at the candidate before testing.

| Check | Result | Evidence |
| --- | --- | --- |
| `git rev-parse HEAD` | PASS | `b336883608d9e4131fd0607d7b87e64b333c2e62` |
| `npm ci` | PASS | 166 packages installed; 0 vulnerabilities |
| `npm run check` | PASS | TypeScript `tsc --noEmit` exited 0 |
| `npm test` | PASS | 2 files, 7 tests |
| `npm run build` | PASS | WXT extension 49.46 KB; Vite emitted `dist/site/` |
| `npm run test:e2e` | PASS | 9 passed, 1 intentionally skipped mobile extension duplicate |

No lint script exists in `package.json`.

## Independent end-to-end exercise

The deployed ZIP was unpacked into a fresh Chromium profile and exercised against two distinct local hosts.

Passed:

- Default Calm reading profile injected once and produced a computed 19 px paragraph size.
- Keyboard operation of popup controls reached the maximum boundaries: 28 px reading text, 2.0 line spacing, 26 px code, and maximum contrast.
- Boundary settings appeared in the injected stylesheet and survived page reload.
- `127.0.0.1` retained Calm reading while `localhost` independently used Code focus.
- Blank custom-profile input exposed a visible `role="alert"`, set `aria-invalid="true"`, and returned focus to the field.
- Custom profile creation, cancel-delete, confirmed delete, and fallback to Calm reading worked.
- A browser-internal page produced the designed unsupported-page recovery state.
- The repository E2E test independently passed profile switching and per-site pause/resume through the popup.
- Popup axe scan found zero violations; online site scans found zero serious/critical violations and zero violations overall.
- Popup and site tab sequences exposed visible 3 px focus outlines with dark 5–6 px halos. No keyboard trap was found.

Defect found:

- Pressing Enter from the filled custom-profile name field closes the dialog without creating the profile. Keyboard users must discover and Tab to the separate Create button. Severity: **Medium**.

The real `Alt+Shift+R` browser accelerator did not fire when synthesized in headless Chromium. The manifest and command handler are present, but the builder suite does not exercise the advertised keyboard commands. Because those claims have no claims registry/test, they remain unproven rather than being recorded as a confirmed runtime defect.

## Live deployment identity

Deployment content matches the candidate.

- `index.html`, both legal pages, JS, CSS, service worker, icon, and both hero images matched the fresh build byte-for-byte.
- The live ZIP SHA-256 was `7d3486e10fb55b08da959f923b152a89d461f085f4df88bc3d148b78a40c85ad`; the fresh ZIP was `c10313eefbe3fcfe2a299b19dbe6d03f2d469002894c188541a6602800345a88`.
- After extraction, all 10 ZIP files matched byte-for-byte. The archive-only difference was timestamps: deployed entries were 08:32 UTC and fresh entries 09:47 UTC.

The footer does not expose the required version/build ID, but candidate identity is confirmed from the payload comparison.

## Findings

### Critical / release-blocking

1. **Required claims registry is absent.** `.factory/claims.json` does not exist, so no product claim has the mandatory demo-backed test.
2. **Required one-click sandbox demo is absent.** There is no first-screen sample action, demo state, isolated storage namespace, persistent demo banner, reset/start actions, or `.factory/demo.md`.
3. **Cold first screen does not plainly say who the product is for.** It never identifies knowledge workers with low vision in the first viewport.

### High

4. **The offline claim is false in a fresh-cache test.** After the first visit, service-worker activation, `registration.update()`, disabling HTTP cache, and going offline, reload returned the shell but returned HTML for the hashed CSS and JS requests. Chromium logged strict-MIME errors, the page was unstyled, and the offline banner stayed hidden. The service-worker cache contains routes, manifest, icon, and images, but not `/assets/site-B69pno5y.css` or `/assets/home-CcJsBjRx.js`; its catch-all fallback incorrectly serves `/` for subresource failures.

### Medium

5. **Accessibility resizing and target-size failures.** At 390 px width with 200% root text, the document was 19 px wider than the viewport. Online at normal size, header/footer/text links measured 21.7–40 px high; the three extension switches measured 56×32 px. These miss the 44 px target baseline.
6. **Custom-profile Enter behavior cancels creation.** A filled name followed by Enter closed the native dialog and created nothing.
7. **Required response policy is incomplete.** Live responses include HSTS, `Referrer-Policy`, and `X-Content-Type-Options`, but no Content-Security-Policy. `staticwebapp.config.json` is absent.
8. **There is no real 404.** An unknown path returns HTTP 200 with the home page and home canonical URL.

### Low

9. **Required social/platform metadata is absent.** There are no Open Graph tags, Twitter card tags, 1200×630 social image declaration, or Apple touch icon.
10. **Hashed assets are not cached immutably.** JS, CSS, images, and the ZIP all return `cache-control: public, must-revalidate, max-age=30`.
11. **Required documentation proof is missing.** `.factory/copy-audit.md` is absent, and the footer omits version/build identity.

## Privacy, network, and policies

- A complete landing-page load requested only `https://reading-comfort-profiles.sociobot.in`; no third-party font, script, image, analytics, or telemetry request occurred.
- Extension exercise emitted requests only to the two pages used for the test. Source/build inspection found no remote API, beacon, WebSocket, analytics, or telemetry path; the only extension `fetch` is WXT’s same-extension module-preload helper.
- State is stored under one `chrome.storage.local` key. The manifest requests `storage`, `activeTab`, and `<all_urls>`; no browsing content transmission was observed.
- Privacy and terms routes return 200. All rendered internal links, the ZIP, and the GitHub source link returned 200.
- There are no server-side product endpoints, unlock calls, payments, or sign-in. Rate-limit and Entra checks are not applicable.
- Unknown routes incorrectly return 200 as noted above.

## Accessibility and responsive evidence

- Desktop 1440×1000: no horizontal overflow, no console/page/request errors, one `<h1>`, `<main>`, `lang="en"`, visible skip link on focus, and no axe violations.
- Mobile 390×844: primary download was inside the first viewport at y=540–592; no normal-size overflow; no axe or runtime errors.
- Reduced motion: media query matched, HTML scrolling became `auto`, and transitions reduced to 0.01 ms.
- 200% text: primary action remained present, but horizontal overflow reached 19 px.
- Generated hero image was visually inspected; no text artifacts, brands, watermarks, or obvious seams were found. Provenance is documented in `.factory/design.md`.

## Performance and caching

Independent Lighthouse 13 mobile output:

- Performance 100
- Accessibility 100
- Best Practices 100
- SEO 100
- LCP 1.20 s
- CLS 0
- Total blocking time 0 ms
- Transfer size 59,218 bytes

Static budgets pass: initial JS is 990 bytes raw / 553 bytes gzip; CSS is 14,486 bytes raw / 3,855 bytes gzip; mobile hero is 18,004 bytes; no webfonts are loaded. The service worker updated successfully with no waiting worker, but offline reload fails as described above.

## Final decision

**FAIL.** Do not release this candidate. The minimum path to reconsideration is: add the required isolated one-click demo and `.factory/demo.md`; enumerate every user-facing claim in `.factory/claims.json` with one observable demo-backed test each; repair and test the offline path or remove every offline claim; then address the resize, target-size, keyboard-dialog, CSP, 404, metadata, and cache-policy findings.
