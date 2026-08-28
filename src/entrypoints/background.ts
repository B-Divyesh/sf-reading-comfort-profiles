import { defineBackground } from 'wxt/utils/define-background';
import { browser } from 'wxt/browser';
import { domainFromUrl, nextProfileId } from '../lib/profiles';
import { loadState, saveState } from '../lib/storage';

export default defineBackground(() => {
  browser.commands.onCommand.addListener(async (command) => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const domain = domainFromUrl(tab?.url);
    if (!domain) return;
    const state = await loadState();

    if (command === 'toggle-comfort') {
      state.disabledDomains[domain] = !state.disabledDomains[domain];
    } else if (command === 'next-profile' || command === 'previous-profile') {
      state.domainProfiles[domain] = nextProfileId(state, domain, command === 'next-profile' ? 1 : -1);
      delete state.disabledDomains[domain];
    } else {
      return;
    }

    await saveState(state);
    if (tab?.id) await browser.tabs.sendMessage(tab.id, { type: 'RCP_REFRESH' }).catch(() => undefined);
  });
});
