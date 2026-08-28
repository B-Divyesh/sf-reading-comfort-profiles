import { browser } from 'wxt/browser';
import { createInitialState, normalizeState, STORAGE_KEY, type ComfortState } from './profiles';

export async function loadState(): Promise<ComfortState> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  const normalized = normalizeState(result[STORAGE_KEY]);
  if (!result[STORAGE_KEY]) await saveState(normalized);
  return normalized;
}

export async function saveState(state: ComfortState): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: state });
}

export async function resetState(): Promise<ComfortState> {
  const state = createInitialState();
  await saveState(state);
  return state;
}
