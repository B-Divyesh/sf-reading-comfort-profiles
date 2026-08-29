import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  outDir: '.output',
  manifest: {
    name: 'Reading Comfort Profiles',
    description: 'Save readable typography, code, contrast, focus, and table settings for each work domain.',
    version: '1.0.6',
    minimum_chrome_version: '109',
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      128: 'icon/128.png'
    },
    permissions: ['storage', 'activeTab'],
    host_permissions: ['<all_urls>'],
    commands: {
      'toggle-comfort': {
        suggested_key: { default: 'Alt+Shift+R' },
        description: 'Enable or disable comfort settings on this site'
      },
      'next-profile': {
        suggested_key: { default: 'Alt+Shift+Period' },
        description: 'Use the next reading profile on this site'
      },
      'previous-profile': {
        suggested_key: { default: 'Alt+Shift+Comma' },
        description: 'Use the previous reading profile on this site'
      }
    }
  }
});
