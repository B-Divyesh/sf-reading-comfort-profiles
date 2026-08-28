import { describe, expect, it } from 'vitest';
import { buildComfortCss } from './css';
import { DEFAULT_PROFILES } from './profiles';

describe('comfort stylesheet', () => {
  it('serializes the profile values and semantic selectors', () => {
    const css = buildComfortCss(DEFAULT_PROFILES[0]!);
    expect(css).toContain('--rcp-font-size: 19px');
    expect(css).toContain('--rcp-line-height: 1.65');
    expect(css).toContain(':where(p, li, dd, dt');
    expect(css).not.toContain('nav');
  });

  it('adds enhanced focus and table spacing only when enabled', () => {
    const enabled = buildComfortCss(DEFAULT_PROFILES[0]!);
    const disabled = buildComfortCss({ ...DEFAULT_PROFILES[0]!, focusCursor: false, tableSpacing: false });
    expect(enabled).toContain(':focus-visible');
    expect(enabled).toContain(':where(th, td)');
    expect(disabled).not.toContain(':focus-visible');
    expect(disabled).not.toContain(':where(th, td)');
  });
});
