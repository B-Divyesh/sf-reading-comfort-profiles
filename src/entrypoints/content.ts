import { defineContentScript } from 'wxt/utils/define-content-script';
import { buildComfortCss } from '../lib/css';
import { loadState } from '../lib/storage';
import { profileForDomain, STORAGE_KEY } from '../lib/profiles';

const STYLE_ID = 'reading-comfort-profiles-style';

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  main() {
    void applyCurrentProfile();
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes[STORAGE_KEY]) void applyCurrentProfile();
    });
    chrome.runtime.onMessage.addListener((message) => {
      if (message?.type === 'RCP_REFRESH') void applyCurrentProfile();
    });
  }
});

async function applyCurrentProfile(): Promise<void> {
  const state = await loadState();
  const domain = window.location.hostname;
  document.getElementById(STYLE_ID)?.remove();
  document.documentElement.removeAttribute('data-reading-comfort');
  if (state.disabledDomains[domain]) return;

  const profile = profileForDomain(state, domain);
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = buildComfortCss(profile);
  (document.head ?? document.documentElement).append(style);
  document.documentElement.dataset.readingComfort = profile.id;
}
