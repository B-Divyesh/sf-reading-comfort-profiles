# Visual thesis — glacial minimal ceramics

## Direction and fit

Reading Comfort Profiles should feel like fitting a quiet optical tool, not operating a medical dashboard. The visual world combines the cool, diffuse light of glacial ice with the soft edges and reassuring weight of hand-finished porcelain. Controls are deliberate, large, and easy to locate. Thin incised rules evoke calibration marks; layered ceramic planes explain that a reading profile sits gently over a work app without replacing it.

The product uses an explicitly light, cool treatment. A dark mode would contradict the ceramic material thesis and, more importantly, would imply that the extension forces a page theme; page contrast is instead an intentional profile setting.

## Palette

All colors are encoded as tokens in the extension and landing site.

| Token | Value | Use |
| --- | --- | --- |
| Frost | `#F3F7F5` | page background |
| Porcelain | `#FCFDFB` | raised surfaces |
| Ice shelf | `#DDEAE7` | quiet fields and rules |
| Deep fjord | `#173D3A` | primary text; 10.8:1 on Frost |
| Slate tide | `#536B68` | supporting text; 5.1:1 on Frost |
| Lichen | `#B7E065` | active accent and focus halo |
| Kelp | `#214F46` | primary action and accent-contrast |
| Cobalt ice | `#356A78` | links and informational state |
| Terracotta | `#9F493B` | errors only |
| Moss | `#2E6751` | success state |

Color never carries state alone: status uses a dot plus text, and each switch exposes its checked state to assistive technology.

## Typography

The interface and site use the native humanist system stack (`Aptos`, `Segoe UI`, `Inter`, system UI) for fast, familiar legibility. Code samples use the native monospace stack (`SFMono-Regular`, `Cascadia Code`, `Consolas`). No font files or third-party requests are required. Display type is large but restrained: 52/56 on desktop, 38/42 on mobile; body copy starts at 17px with 1.55 leading. Settings labels are 16–18px and never condensed.

## Spacing and geometry

The base rhythm is 4px, expressed mainly as 8, 12, 16, 24, 32, 48, 72, and 96px. Reading measures cap at 68 characters. Interactive targets are at least 44px. Surfaces have asymmetric ceramic radii (`28px 28px 12px 28px`) and restrained 1px green-grey edges. Shadows are broad and pale, like objects on a matte studio table, never glossy glass.

## Interaction grammar

- A profile is a named fitted object: choose it, adjust it, save it to the current domain.
- Range controls combine a large slider with an exact numeric readout.
- The primary status line always says whether a profile is active and on which host.
- Keyboard actions mirror visible actions. `Alt+Shift+R` toggles the current site; `Alt+Shift+.` and `Alt+Shift+,` cycle profiles.
- Potentially destructive profile deletion requires a named confirmation. Current-site disable is always immediate and reversible.
- Application-like sites are guarded: selectors avoid controls, navigation, SVG, and icon glyphs; styles use conservative ranges to reduce layout breakage.

## Motion

State transitions last 180–240ms and use opacity plus small transforms only. The preview sheet settles by 4px after a profile change; switch thumbs travel along their actual track. Nothing loops. Under `prefers-reduced-motion: reduce`, movement and smooth scrolling become instant while color and text feedback remain.

## Asset plan and provenance

The landing hero uses one original generated raster still: an editorial ceramic arrangement of browser-like slabs, a reading lens, code/table grooves, and a lime focus bead. It clarifies that one quiet layer adapts several types of work content. Product icons and diagrams are hand-authored SVG/CSS because they need crisp deterministic geometry at interface sizes.

### Prompt sheet

- **Subject:** three abstract porcelain browser slabs with incised lines for prose, code, and table rows; one translucent ice lens enlarges the incisions; a small lichen-green ceramic bead marks focus.
- **World/materials:** matte bone porcelain, frosted ice, pale stone tabletop, subtle hand-thrown irregularity, no glassmorphism UI.
- **Light/lens:** soft overcast arctic studio light, 50mm editorial product lens, shallow but readable depth, gentle long shadows.
- **Palette words:** frost white, celadon ice, deep fjord green, a single lichen accent.
- **Composition:** landscape, object group on the right two-thirds, generous clean negative space on the left, no cropped objects.
- **Negative list:** no humans, hands, letters, readable text, logos, brands, watermarks, device mockups, gradients, neon, chrome, medical symbols, or accessibility clichés.

### Generated asset record

- **File:** `assets/src/comfort-ceramic-hero.png` (source), exported to responsive WebP files in `site/public/images/`.
- **Model/tool:** factory image deployment via `/opt/fleet/lib/gen-image.sh`.
- **Date:** 2026-08-28.
- **License/provenance:** original AI-generated asset commissioned for this product; no reference image or copyrighted character used.
- **Prompt:** derived verbatim from the prompt sheet above with “no text, no watermark, no logos” appended.
