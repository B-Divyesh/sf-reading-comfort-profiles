import { describe, expect, it } from 'vitest';
import { applyComfortCommand, isComfortCommand } from './commands';
import { createInitialState } from './profiles';

describe('browser command state changes', () => {
  it('pauses, resumes, and cycles profiles for one work site', () => {
    const state = createInitialState();
    const domain = 'docs.example.com';

    applyComfortCommand(state, domain, 'toggle-comfort');
    expect(state.disabledDomains[domain]).toBe(true);

    applyComfortCommand(state, domain, 'toggle-comfort');
    expect(state.disabledDomains[domain]).toBe(false);

    applyComfortCommand(state, domain, 'next-profile');
    expect(state.domainProfiles[domain]).toBe('balanced-work');
    expect(state.disabledDomains[domain]).toBeUndefined();

    applyComfortCommand(state, domain, 'previous-profile');
    expect(state.domainProfiles[domain]).toBe('calm-reading');
  });

  it('accepts only the three registered command IDs', () => {
    expect(['toggle-comfort', 'next-profile', 'previous-profile'].every(isComfortCommand)).toBe(true);
    expect(isComfortCommand('unknown-command')).toBe(false);
  });
});
