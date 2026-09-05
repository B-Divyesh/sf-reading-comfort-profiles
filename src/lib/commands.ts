import { nextProfileId, type ComfortState } from './profiles';

export const COMFORT_COMMANDS = ['toggle-comfort', 'next-profile', 'previous-profile'] as const;
export type ComfortCommand = typeof COMFORT_COMMANDS[number];

export function isComfortCommand(value: string): value is ComfortCommand {
  return (COMFORT_COMMANDS as readonly string[]).includes(value);
}

/**
 * Applies the state change behind a browser command. Keeping this separate
 * makes the command listener and its outcome use the same guarded behavior.
 */
export function applyComfortCommand(state: ComfortState, domain: string, command: ComfortCommand): void {
  if (command === 'toggle-comfort') {
    state.disabledDomains[domain] = !state.disabledDomains[domain];
    return;
  }

  state.domainProfiles[domain] = nextProfileId(state, domain, command === 'next-profile' ? 1 : -1);
  delete state.disabledDomains[domain];
}
