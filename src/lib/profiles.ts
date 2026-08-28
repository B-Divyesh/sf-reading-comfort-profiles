export type ContrastLevel = 'standard' | 'stronger' | 'maximum';

export interface ReadingProfile {
  id: string;
  name: string;
  fontSize: number;
  lineHeight: number;
  codeFontSize: number;
  contrast: ContrastLevel;
  focusCursor: boolean;
  tableSpacing: boolean;
}

export interface ComfortState {
  profiles: ReadingProfile[];
  domainProfiles: Record<string, string>;
  disabledDomains: Record<string, boolean>;
}

export const STORAGE_KEY = 'readingComfortState';

export const DEFAULT_PROFILES: ReadingProfile[] = [
  {
    id: 'calm-reading',
    name: 'Calm reading',
    fontSize: 19,
    lineHeight: 1.65,
    codeFontSize: 17,
    contrast: 'stronger',
    focusCursor: true,
    tableSpacing: true
  },
  {
    id: 'balanced-work',
    name: 'Balanced work',
    fontSize: 17,
    lineHeight: 1.5,
    codeFontSize: 16,
    contrast: 'standard',
    focusCursor: true,
    tableSpacing: false
  },
  {
    id: 'code-focus',
    name: 'Code focus',
    fontSize: 18,
    lineHeight: 1.55,
    codeFontSize: 19,
    contrast: 'maximum',
    focusCursor: true,
    tableSpacing: false
  }
];

export function createInitialState(): ComfortState {
  return {
    profiles: DEFAULT_PROFILES.map((profile) => ({ ...profile })),
    domainProfiles: {},
    disabledDomains: {}
  };
}

export function normalizeState(value: unknown): ComfortState {
  const fallback = createInitialState();
  if (!value || typeof value !== 'object') return fallback;
  const candidate = value as Partial<ComfortState>;
  const profiles = Array.isArray(candidate.profiles)
    ? candidate.profiles.filter(isReadingProfile)
    : [];
  return {
    profiles: profiles.length ? profiles : fallback.profiles,
    domainProfiles: isRecord(candidate.domainProfiles) ? candidate.domainProfiles : {},
    disabledDomains: isBooleanRecord(candidate.disabledDomains) ? candidate.disabledDomains : {}
  };
}

function isReadingProfile(value: unknown): value is ReadingProfile {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<ReadingProfile>;
  return typeof item.id === 'string' && typeof item.name === 'string'
    && typeof item.fontSize === 'number' && item.fontSize >= 14 && item.fontSize <= 28
    && typeof item.lineHeight === 'number' && item.lineHeight >= 1.2 && item.lineHeight <= 2
    && typeof item.codeFontSize === 'number' && item.codeFontSize >= 13 && item.codeFontSize <= 26
    && ['standard', 'stronger', 'maximum'].includes(item.contrast ?? '')
    && typeof item.focusCursor === 'boolean' && typeof item.tableSpacing === 'boolean';
}

function isRecord(value: unknown): value is Record<string, string> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
    && Object.values(value as Record<string, unknown>).every((item) => typeof item === 'string');
}

function isBooleanRecord(value: unknown): value is Record<string, boolean> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
    && Object.values(value as Record<string, unknown>).every((item) => typeof item === 'boolean');
}

export function profileForDomain(state: ComfortState, domain: string): ReadingProfile {
  const id = state.domainProfiles[domain];
  return state.profiles.find((profile) => profile.id === id) ?? state.profiles[0] ?? DEFAULT_PROFILES[0]!;
}

export function nextProfileId(state: ComfortState, domain: string, direction: 1 | -1): string {
  const current = profileForDomain(state, domain);
  const currentIndex = Math.max(0, state.profiles.findIndex((profile) => profile.id === current.id));
  const index = (currentIndex + direction + state.profiles.length) % state.profiles.length;
  return state.profiles[index]?.id ?? current.id;
}

export function domainFromUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.hostname : null;
  } catch {
    return null;
  }
}

export function uniqueProfileId(name: string): string {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'profile';
  return `${slug}-${Date.now().toString(36)}`;
}
