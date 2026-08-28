# Reading Comfort Profiles

Reading Comfort Profiles is a free Manifest V3 browser extension for knowledge workers with low vision. It saves a semantic reading profile for each work domain, so prose, code, contrast, keyboard focus, cursor visibility, and table density can be adjusted without repeatedly changing browser zoom.

The product is intentionally local-first: it has no account, analytics, browsing-history collection, third-party runtime code, or network API. Profile settings and domain assignments stay in browser-local extension storage.

Live site: <https://reading-comfort-profiles.sociobot.in>

## What v1 includes

- Three useful starter profiles: Calm reading, Balanced work, and Code focus
- Custom profiles cloned from the current fit
- Per-domain profile assignment and pause state
- Independent base text, line-height, and code-size controls
- Standard, stronger, and maximum text contrast treatments
- Optional large pointer, high-contrast focus ring, and roomier tables
- Keyboard commands for pause/resume and profile cycling
- Chrome-compatible packaged download and unpacked build output
- Offline-capable static product site with privacy and terms pages

This is not a screen-reader replacement and does not rewrite or scrape page content. Complex canvas-based applications cannot be restyled.

## Develop

Requirements: Node.js 22+ and npm.

```sh
npm install
npm run dev          # WXT extension development mode
npm run dev:site     # landing site on a local Vite server
```

In extension development mode, load the WXT output from `.output/chrome-mv3` through your Chromium browser’s extension manager if it is not opened automatically.

## Test and build

```sh
npm test             # unit tests
npm run check        # TypeScript
npm run build        # extension + zip + site
npm run test:e2e     # Chromium desktop/mobile and axe checks
npm run verify       # all gates in sequence
```

`npm run build:site` is self-contained and produces the deployable site at `dist/site/`, including `dist/site/index.html` and the packaged extension at `dist/site/downloads/reading-comfort-profiles-chrome.zip`. The unpacked extension also lands at `dist/extension/`.

## Install the packaged extension

1. Download and unzip `reading-comfort-profiles-chrome.zip`.
2. Open `chrome://extensions` (or the equivalent page in Edge/Brave).
3. Enable Developer mode.
4. Choose **Load unpacked** and select the unzipped folder.

Keyboard commands default to:

- `Alt+Shift+R`: pause or resume the current domain
- `Alt+Shift+.`: use the next profile
- `Alt+Shift+,`: use the previous profile

Browsers may let users change these bindings on their extension shortcuts page.

## Project layout

- `src/entrypoints/`: WXT popup, content script, and background worker
- `src/lib/`: state model, local storage, and generated semantic CSS
- `site/`: static landing, privacy, terms, and service worker
- `assets/src/`: original full-resolution generated art and provenance
- `.factory/design.md`: product-specific visual system and asset record
- `.factory/handoff.md`: verification and release handoff

## Privacy and license

Read the deployed [privacy policy](https://reading-comfort-profiles.sociobot.in/privacy/) and [terms](https://reading-comfort-profiles.sociobot.in/terms/). The source is available under the MIT License.
