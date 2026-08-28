import { describe, expect, it, vi } from 'vitest';
import { createInitialState, domainFromUrl, nextProfileId, normalizeState, profileForDomain, uniqueProfileId } from './profiles';

describe('reading profile state', () => {
  it('returns isolated defaults', () => {
    const first = createInitialState();
    const second = createInitialState();
    first.profiles[0]!.fontSize = 28;
    expect(second.profiles[0]!.fontSize).toBe(19);
  });

  it('falls back safely when stored data is malformed', () => {
    const state = normalizeState({ profiles: [{ name: 'broken' }], domainProfiles: [], disabledDomains: { 'docs.test': 'yes' } });
    expect(state.profiles).toHaveLength(3);
    expect(state.domainProfiles).toEqual({});
    expect(state.disabledDomains).toEqual({});
  });

  it('uses a domain assignment and cycles in both directions', () => {
    const state = createInitialState();
    state.domainProfiles['work.test'] = 'balanced-work';
    expect(profileForDomain(state, 'work.test').name).toBe('Balanced work');
    expect(nextProfileId(state, 'work.test', 1)).toBe('code-focus');
    expect(nextProfileId(state, 'work.test', -1)).toBe('calm-reading');
  });

  it('accepts only regular web domains', () => {
    expect(domainFromUrl('https://docs.example.com/report')).toBe('docs.example.com');
    expect(domainFromUrl('chrome://extensions')).toBeNull();
    expect(domainFromUrl('not a url')).toBeNull();
  });

  it('creates readable unique identifiers', () => {
    vi.spyOn(Date, 'now').mockReturnValue(123456);
    expect(uniqueProfileId('  My Code + Tables  ')).toBe('my-code-tables-2n9c');
  });
});
