import type { ReadingProfile } from './profiles';

const LARGE_CURSOR = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Cpath d=%22M5 3v21l5.7-5.2 4.2 9.2 4-1.9-4.2-9.1H23z%22 fill=%22white%22 stroke=%22%23111111%22 stroke-width=%222%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E';
const LINK_CURSOR = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22 viewBox=%220 0 32 32%22%3E%3Cpath d=%22M10 27l-3-10c-.4-1.3.4-2.7 1.7-3 1.1-.3 2.2.3 2.7 1.3V7.5A2.5 2.5 0 0114 5a2.5 2.5 0 012.5 2.5V12c.4-.7 1.2-1.2 2.1-1.2 1 0 1.8.6 2.2 1.4.4-.5 1.1-.8 1.8-.8 1.2 0 2.2.9 2.4 2.1l.8 6.5c.2 2-.4 4-1.7 5.5L22.8 27z%22 fill=%22white%22 stroke=%22%23111111%22 stroke-width=%222%22 stroke-linejoin=%22round%22/%3E%3C/svg%3E';

export function buildComfortCss(profile: ReadingProfile): string {
  const contrast = profile.contrast === 'maximum' ? '1.28' : profile.contrast === 'stronger' ? '1.14' : '1';
  const focusCss = profile.focusCursor ? `
    :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
      outline: 3px solid #b7e065 !important;
      outline-offset: 3px !important;
      box-shadow: 0 0 0 6px #173d3acc !important;
    }
    html, body, body * { cursor: url("${LARGE_CURSOR}") 5 3, auto !important; }
    :where(a, button, select, summary, [role="button"], [role="link"], label) {
      cursor: url("${LINK_CURSOR}") 10 4, pointer !important;
    }
  ` : '';
  const tableCss = profile.tableSpacing ? `
    :where(th, td) { padding-block: max(.62em, 8px) !important; padding-inline: max(.72em, 10px) !important; }
  ` : '';

  return `
    :root { --rcp-font-size: ${profile.fontSize}px; --rcp-line-height: ${profile.lineHeight}; --rcp-code-size: ${profile.codeFontSize}px; }
    :where(p, li, dd, dt, blockquote, figcaption, details, summary, article td, article th, main td, main th) {
      font-size: max(var(--rcp-font-size), 1em) !important;
      line-height: var(--rcp-line-height) !important;
      filter: contrast(${contrast});
    }
    :where(pre, code, kbd, samp) {
      font-size: max(var(--rcp-code-size), 1em) !important;
      line-height: max(var(--rcp-line-height), 1.45) !important;
      font-family: ui-monospace, "Cascadia Code", "SFMono-Regular", Consolas, monospace !important;
    }
    ${focusCss}
    ${tableCss}
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
    }
  `;
}
