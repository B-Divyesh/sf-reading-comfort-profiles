# Reading Comfort Profiles

Reading Comfort Profiles is a free browser extension for knowledge workers with low vision.

Save one reading profile for each work site. Change text, code, contrast, focus, pointer size, and table spacing without changing browser zoom.

It has no account or analytics. Your profile settings stay in your browser.

Live site: <https://reading-comfort-profiles.sociobot.in>

## Try the sample workspace

Open <https://reading-comfort-profiles.sociobot.in/?demo=1> or select **Try it with sample data** on the landing page.

The demo includes an access-review document, code decision, and table. It uses only the separate `demo:reading-comfort-profiles` browser-storage key.

**Reset demo** restores the sample. **Start for real** removes the demo key before returning home.

## What v1 includes

- Three starter profiles: Calm reading, Balanced work, and Code focus
- Custom profiles copied from the current profile settings
- Per-work-site profile assignment and pause state
- Independent base text, line-height, and code-size controls
- Standard, stronger, and maximum text contrast treatments
- Optional large pointer, high-contrast focus ring, and roomier tables
- Keyboard commands for pause/resume and profile cycling
- A Chromium package tested in Chromium
- Offline-capable static product site with privacy and terms pages

The extension changes presentation through CSS. It does not edit page text or element structure.

## Develop

Requirements: Node.js 22+ and npm.

```sh
npm install
npm run dev          # WXT extension development mode
npm run dev:site     # landing site on a local Vite server
```

Development mode creates an unpacked Chromium extension in `.output/chrome-mv3`.

If it does not open automatically, load that folder from your browser’s extension manager.

## Test and build

```sh
npm test             # unit tests
npm run check        # TypeScript
npm run build        # extension + zip + site
npm run test:e2e     # Chromium desktop/mobile and axe checks
npm run verify       # all gates in sequence
```

Run `npm run build:site` to create the deployable site in `dist/site/`.

The packaged extension is `dist/site/downloads/reading-comfort-profiles-chrome.zip`. The unpacked extension is in `dist/extension/`.

## Install the packaged extension

1. Download and unzip `reading-comfort-profiles-chrome.zip`.
2. Open `chrome://extensions` in Chromium.
3. Enable Developer mode.
4. Choose **Load unpacked** and select the unzipped folder.

Keyboard commands default to:

- `Alt+Shift+R`: pause or resume the current work site
- `Alt+Shift+.`: use the next profile
- `Alt+Shift+,`: use the previous profile

## Project layout

- `src/entrypoints/`: WXT popup, content script, and background worker
- `src/lib/`: state model, local storage, and generated semantic CSS
- `site/`: static landing, privacy, terms, and service worker
- `assets/src/`: original full-resolution generated art and provenance
- `.factory/design.md`: product-specific visual system and asset record
- `.factory/handoff.md`: verification and release handoff

## Privacy and license

Read the deployed [privacy policy](https://reading-comfort-profiles.sociobot.in/privacy/) and [terms](https://reading-comfort-profiles.sociobot.in/terms/). The source is available under the MIT License.
