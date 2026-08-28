const offlineBanner = document.getElementById('offline-banner');
const DEMO_KEY = 'demo:reading-comfort-profiles';
const ROUTE_FOCUS_KEY = 'reading-comfort-route-focus';

const shouldRedirectToDemo = location.pathname === '/' && new URLSearchParams(location.search).get('demo') === '1';

if (shouldRedirectToDemo) {
  sessionStorage.setItem(ROUTE_FOCUS_KEY, 'Demo — Reading Comfort Profiles');
  location.replace('/demo/?demo=1');
}

interface DemoState {
  profile: 'calm' | 'balanced' | 'code';
  fontSize: number;
  lineHeight: number;
  codeSize: number;
  contrast: 'standard' | 'stronger' | 'maximum';
  roomyTables: boolean;
}

const sampleProfiles: Record<DemoState['profile'], DemoState> = {
  calm: { profile: 'calm', fontSize: 19, lineHeight: 1.65, codeSize: 17, contrast: 'stronger', roomyTables: true },
  balanced: { profile: 'balanced', fontSize: 17, lineHeight: 1.5, codeSize: 16, contrast: 'standard', roomyTables: false },
  code: { profile: 'code', fontSize: 18, lineHeight: 1.55, codeSize: 19, contrast: 'maximum', roomyTables: false }
};

if (!shouldRedirectToDemo) initializePage();

function updateConnectionState(event?: Event): void {
  if (offlineBanner) offlineBanner.hidden = event?.type === 'offline' ? false : navigator.onLine;
}

function initializePage(): void {
  window.addEventListener('online', updateConnectionState);
  window.addEventListener('offline', updateConnectionState);
  window.addEventListener('pageshow', handlePageShow);
  document.addEventListener('click', rememberDocumentNavigation);
  updateConnectionState();

  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      void navigator.serviceWorker.register('/sw.js').catch(() => {
        // The site remains fully usable without offline caching.
      });
    });
  }

  if (document.body.dataset.page === 'demo') initializeDemo();
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  if (sessionStorage.getItem(ROUTE_FOCUS_KEY) || navigation?.type === 'back_forward') announceRoute();
}

function rememberDocumentNavigation(event: MouseEvent): void {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  if (!link || link.hasAttribute('download') || link.target || event.defaultPrevented) return;
  const destination = new URL(link.href, location.href);
  if (destination.origin !== location.origin || destination.pathname === location.pathname) return;
  sessionStorage.setItem(ROUTE_FOCUS_KEY, document.title);
}

function handlePageShow(event: PageTransitionEvent): void {
  window.setTimeout(updateConnectionState, 250);
  if (event.persisted) announceRoute();
}

function announceRoute(): void {
  sessionStorage.removeItem(ROUTE_FOCUS_KEY);
  const heading = document.querySelector<HTMLElement>('h1');
  const liveRegion = document.querySelector<HTMLElement>('.route-status');
  if (!heading || !liveRegion) return;
  heading.focus({ preventScroll: true });
  window.setTimeout(() => { liveRegion.textContent = document.title; }, 50);
}

function initializeDemo(): void {
  const form = document.getElementById('demo-controls') as HTMLFormElement;
  const profile = document.getElementById('demo-profile') as HTMLSelectElement;
  let state = readDemoState();

  const render = (): void => {
    (document.getElementById('demo-font') as HTMLInputElement).value = String(state.fontSize);
    (document.getElementById('demo-line') as HTMLInputElement).value = String(state.lineHeight);
    (document.getElementById('demo-code') as HTMLInputElement).value = String(state.codeSize);
    (document.getElementById('demo-contrast') as HTMLSelectElement).value = state.contrast;
    (document.getElementById('demo-tables') as HTMLInputElement).checked = state.roomyTables;
    profile.value = state.profile;
    (document.getElementById('demo-font-output') as HTMLOutputElement).value = `${state.fontSize} px`;
    (document.getElementById('demo-line-output') as HTMLOutputElement).value = `${state.lineHeight.toFixed(2).replace(/0$/, '')}×`;
    (document.getElementById('demo-code-output') as HTMLOutputElement).value = `${state.codeSize} px`;
    const preview = document.getElementById('demo-document') as HTMLElement;
    preview.style.setProperty('--demo-font', `${state.fontSize}px`);
    preview.style.setProperty('--demo-line', String(state.lineHeight));
    preview.style.setProperty('--demo-code', `${state.codeSize}px`);
    preview.style.setProperty('--demo-cell', state.roomyTables ? '16px' : '8px');
    preview.classList.toggle('demo-maximum', state.contrast === 'maximum');
    const names = { calm: 'Calm reading', balanced: 'Balanced work', code: 'Code focus' };
    const status = document.querySelector('.demo-preview-head p');
    if (status) status.textContent = `docs.example.com · ${names[state.profile]}`;
  };

  profile.addEventListener('change', () => {
    state = { ...sampleProfiles[profile.value as DemoState['profile']] };
    saveDemoState(state);
    render();
  });
  form.addEventListener('input', () => {
    state = {
      profile: profile.value as DemoState['profile'],
      fontSize: Number((document.getElementById('demo-font') as HTMLInputElement).value),
      lineHeight: Number((document.getElementById('demo-line') as HTMLInputElement).value),
      codeSize: Number((document.getElementById('demo-code') as HTMLInputElement).value),
      contrast: (document.getElementById('demo-contrast') as HTMLSelectElement).value as DemoState['contrast'],
      roomyTables: (document.getElementById('demo-tables') as HTMLInputElement).checked
    };
    saveDemoState(state);
    render();
  });
  document.getElementById('reset-demo')?.addEventListener('click', () => {
    state = { ...sampleProfiles.calm };
    saveDemoState(state);
    render();
    profile.focus();
  });
  document.getElementById('start-real')?.addEventListener('click', () => localStorage.removeItem(DEMO_KEY));
  saveDemoState(state);
  render();
}

function readDemoState(): DemoState {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(DEMO_KEY) ?? 'null');
    if (isDemoState(value)) return value;
  } catch {
    // A clean sample is safer than carrying malformed demo-only data forward.
  }
  return { ...sampleProfiles.calm };
}

function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  const profile = candidate.profile;
  const contrast = candidate.contrast;
  return typeof profile === 'string'
    && Object.hasOwn(sampleProfiles, profile)
    && typeof candidate.fontSize === 'number'
    && Number.isFinite(candidate.fontSize)
    && Number.isInteger(candidate.fontSize)
    && candidate.fontSize >= 14
    && candidate.fontSize <= 28
    && typeof candidate.lineHeight === 'number'
    && Number.isFinite(candidate.lineHeight)
    && candidate.lineHeight >= 1.2
    && candidate.lineHeight <= 2
    && typeof candidate.codeSize === 'number'
    && Number.isFinite(candidate.codeSize)
    && Number.isInteger(candidate.codeSize)
    && candidate.codeSize >= 13
    && candidate.codeSize <= 26
    && typeof contrast === 'string'
    && ['standard', 'stronger', 'maximum'].includes(contrast)
    && typeof candidate.roomyTables === 'boolean';
}

function saveDemoState(state: DemoState): void {
  localStorage.setItem(DEMO_KEY, JSON.stringify(state));
}
