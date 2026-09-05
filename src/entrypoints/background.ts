import { defineBackground } from 'wxt/utils/define-background';
import { browser } from 'wxt/browser';
import { domainFromUrl } from '../lib/profiles';
import { loadState, saveState } from '../lib/storage';
import { applyComfortCommand, isComfortCommand, type ComfortCommand } from '../lib/commands';

export default defineBackground(() => {
  const handleCommand = async (command: string): Promise<void> => {
    if (!isComfortCommand(command)) return;
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const domain = domainFromUrl(tab?.url);
    if (!domain) return;
    const state = await loadState();

    applyComfortCommand(state, domain, command);
    await saveState(state);
    if (tab?.id) await browser.tabs.sendMessage(tab.id, { type: 'RCP_REFRESH' }).catch(() => undefined);
  };

  browser.commands.onCommand.addListener(handleCommand);

  // Chromium does not deliver browser-command accelerators from headless
  // automation. This service-worker-only hook exposes the exact registered
  // handler to the packaged-extension regression; web pages cannot access a
  // background-worker global.
  (globalThis as typeof globalThis & { __readingComfortTest?: { runCommand: (command: ComfortCommand) => Promise<void> } })
    .__readingComfortTest = { runCommand: handleCommand };
});
