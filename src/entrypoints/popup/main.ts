import './style.css';
import { browser } from 'wxt/browser';
import {
  DEFAULT_PROFILES,
  domainFromUrl,
  profileForDomain,
  uniqueProfileId,
  type ComfortState,
  type ContrastLevel,
  type ReadingProfile
} from '../../lib/profiles';
import { loadState, saveState } from '../../lib/storage';

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
let state: ComfortState;
let domain = '';
let activeTabId: number | undefined;

const settings = byId<HTMLDivElement>('settings');
const siteToggle = byId<HTMLButtonElement>('site-toggle');
const profileSelect = byId<HTMLSelectElement>('profile-select');
const fontSize = byId<HTMLInputElement>('font-size');
const lineHeight = byId<HTMLInputElement>('line-height');
const codeSize = byId<HTMLInputElement>('code-size');
const contrast = byId<HTMLSelectElement>('contrast');
const focusToggle = byId<HTMLButtonElement>('focus-toggle');
const tableToggle = byId<HTMLButtonElement>('table-toggle');
const profileDialog = byId<HTMLDialogElement>('profile-dialog');
const deleteDialog = byId<HTMLDialogElement>('delete-dialog');
const profileForm = byId<HTMLFormElement>('profile-form');
const profileName = byId<HTMLInputElement>('profile-name');
const profileNameError = byId('name-error');

void initialize();

async function initialize(): Promise<void> {
  setView('loading-state');
  try {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    activeTabId = tab?.id;
    const resolvedDomain = domainFromUrl(tab?.url);
    if (!resolvedDomain) {
      setView('unsupported-state');
      return;
    }
    domain = resolvedDomain;
    state = await loadState();
    render();
    setView('settings');
  } catch (error) {
    console.error('Reading Comfort Profiles failed to initialize', error);
    setView('error-state');
  }
}

function setView(id: 'loading-state' | 'unsupported-state' | 'error-state' | 'settings'): void {
  ['loading-state', 'unsupported-state', 'error-state', 'settings'].forEach((viewId) => {
    byId(viewId).classList.toggle('hidden', viewId !== id);
  });
  byId('main').setAttribute('aria-busy', String(id === 'loading-state'));
  siteToggle.disabled = id !== 'settings';
}

function render(): void {
  const profile = profileForDomain(state, domain);
  const enabled = !state.disabledDomains[domain];
  byId('domain-label').textContent = domain;
  byId('status-label').textContent = enabled ? 'Active on' : 'Paused on';
  document.body.classList.toggle('is-paused', !enabled);
  setSwitch(siteToggle, enabled);

  profileSelect.replaceChildren(...state.profiles.map((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    option.selected = item.id === profile.id;
    return option;
  }));

  fontSize.value = String(profile.fontSize);
  lineHeight.value = String(profile.lineHeight);
  codeSize.value = String(profile.codeFontSize);
  contrast.value = profile.contrast;
  setSwitch(focusToggle, profile.focusCursor);
  setSwitch(tableToggle, profile.tableSpacing);
  updateOutputs();
  byId<HTMLButtonElement>('delete-profile-button').hidden = DEFAULT_PROFILES.some((item) => item.id === profile.id);
}

function setSwitch(element: HTMLButtonElement, checked: boolean): void {
  element.setAttribute('aria-checked', String(checked));
}

function currentProfile(): ReadingProfile {
  return profileForDomain(state, domain);
}

async function commit(message = 'Saved locally'): Promise<void> {
  const savedState = byId('saved-state');
  savedState.textContent = 'Saving…';
  try {
    await saveState(state);
    if (activeTabId) await browser.tabs.sendMessage(activeTabId, { type: 'RCP_REFRESH' }).catch(() => undefined);
    savedState.textContent = message;
  } catch (error) {
    console.error('Reading Comfort Profiles could not save', error);
    savedState.textContent = 'Could not save — try again';
  }
}

siteToggle.addEventListener('click', () => {
  state.disabledDomains[domain] = !state.disabledDomains[domain];
  render();
  void commit(state.disabledDomains[domain] ? 'Paused for this site' : 'Active for this site');
});

profileSelect.addEventListener('change', () => {
  state.domainProfiles[domain] = profileSelect.value;
  delete state.disabledDomains[domain];
  render();
  void commit('Profile applied');
});

function updateProfile(patch: Partial<ReadingProfile>): void {
  Object.assign(currentProfile(), patch);
  void commit();
}

fontSize.addEventListener('input', updateOutputs);
lineHeight.addEventListener('input', updateOutputs);
codeSize.addEventListener('input', updateOutputs);
fontSize.addEventListener('change', () => updateProfile({ fontSize: Number(fontSize.value) }));
lineHeight.addEventListener('change', () => updateProfile({ lineHeight: Number(lineHeight.value) }));
codeSize.addEventListener('change', () => updateProfile({ codeFontSize: Number(codeSize.value) }));
contrast.addEventListener('change', () => updateProfile({ contrast: contrast.value as ContrastLevel }));
focusToggle.addEventListener('click', () => {
  const value = focusToggle.getAttribute('aria-checked') !== 'true';
  setSwitch(focusToggle, value);
  updateProfile({ focusCursor: value });
});
tableToggle.addEventListener('click', () => {
  const value = tableToggle.getAttribute('aria-checked') !== 'true';
  setSwitch(tableToggle, value);
  updateProfile({ tableSpacing: value });
});

function updateOutputs(): void {
  byId<HTMLOutputElement>('font-size-output').value = `${fontSize.value} px`;
  byId<HTMLOutputElement>('line-height-output').value = `${Number(lineHeight.value).toFixed(2).replace(/0$/, '')}×`;
  byId<HTMLOutputElement>('code-size-output').value = `${codeSize.value} px`;
}

function clearProfileNameError(): void {
  profileNameError.classList.add('hidden');
  profileName.removeAttribute('aria-invalid');
  profileName.removeAttribute('aria-describedby');
}

byId('new-profile-button').addEventListener('click', () => {
  profileName.value = '';
  clearProfileNameError();
  profileDialog.showModal();
  requestAnimationFrame(() => profileName.focus());
});

profileName.addEventListener('input', () => {
  if (profileName.value.trim()) clearProfileNameError();
});

function createProfile(): void {
  const name = profileName.value.trim();
  if (!name) {
    profileNameError.classList.remove('hidden');
    profileName.setAttribute('aria-invalid', 'true');
    profileName.setAttribute('aria-describedby', 'name-error');
    profileName.focus();
    return;
  }
  clearProfileNameError();
  const profile = { ...currentProfile(), id: uniqueProfileId(name), name };
  state.profiles.push(profile);
  state.domainProfiles[domain] = profile.id;
  profileDialog.close();
  render();
  void commit('Profile created');
}

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createProfile();
});

byId('close-profile-dialog').addEventListener('click', () => profileDialog.close('cancel'));
byId('cancel-profile').addEventListener('click', () => profileDialog.close('cancel'));

byId('delete-profile-button').addEventListener('click', () => {
  byId('delete-name').textContent = currentProfile().name;
  deleteDialog.showModal();
});

byId('confirm-delete').addEventListener('click', () => {
  const removedId = currentProfile().id;
  state.profiles = state.profiles.filter((profile) => profile.id !== removedId);
  Object.entries(state.domainProfiles).forEach(([host, profileId]) => {
    if (profileId === removedId) delete state.domainProfiles[host];
  });
  deleteDialog.close();
  render();
  void commit('Profile deleted');
});

byId('retry-button').addEventListener('click', () => void initialize());
