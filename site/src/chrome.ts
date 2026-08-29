const SOURCE_URL = 'https://github.com/B-Divyesh/sf-reading-comfort-profiles';
const VERSION = '1.0.5';
const BUILD = 'polish-3';

function currentRoute(): 'profiles' | 'demo' | 'privacy' | 'terms' | null {
  if (location.pathname.startsWith('/demo')) return 'demo';
  if (location.pathname.startsWith('/privacy')) return 'privacy';
  if (location.pathname.startsWith('/terms')) return 'terms';
  if (location.pathname === '/') return 'profiles';
  return null;
}

function pageCurrent(route: ReturnType<typeof currentRoute>, target: ReturnType<typeof currentRoute>): string {
  return route === target ? ' aria-current="page"' : '';
}

/**
 * Public routes use one rendered chrome so navigation, legal links, release
 * identity, and generated-art provenance remain identical everywhere.
 */
export function renderSiteChrome(): void {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (!header || !footer) return;

  const route = currentRoute();
  header.className = 'site-header';
  header.innerHTML = `
    <a class="wordmark" href="/" aria-label="Reading Comfort Profiles home">
      <img src="/icon.svg" alt="" width="40" height="40" />
      <span>Reading Comfort<br /><strong>Profiles</strong></span>
    </a>
    <nav aria-label="Primary navigation">
      <a href="/#profiles"${pageCurrent(route, 'profiles')}>Profiles</a>
      <a href="/?demo=1"${pageCurrent(route, 'demo')}>Demo</a>
      <a href="/privacy/"${pageCurrent(route, 'privacy')}>Privacy</a>
      <a class="nav-download" href="/downloads/reading-comfort-profiles-chrome.zip" download>Download <span aria-hidden="true">↓</span></a>
    </nav>`;

  footer.innerHTML = `
    <a class="wordmark footer-mark" href="/" aria-label="Reading Comfort Profiles home">
      <img src="/icon.svg" alt="" width="36" height="36" />
      <span>Reading Comfort <strong>Profiles</strong></span>
    </a>
    <p>Adjust work sites for low-vision reading. Built by Param Factory.</p>
    <nav aria-label="Legal navigation">
      <a href="/privacy/"${pageCurrent(route, 'privacy')}>Privacy</a>
      <a href="/terms/"${pageCurrent(route, 'terms')}>Terms</a>
      <a href="${SOURCE_URL}" rel="noreferrer">Source ↗</a>
    </nav>
    <small>Version ${VERSION} · Build ${BUILD} · Original hero imagery was AI-generated for this product. © 2026 Sociobot.</small>`;
}
