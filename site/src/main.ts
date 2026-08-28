const offlineBanner = document.getElementById('offline-banner');

function updateConnectionState(): void {
  if (offlineBanner) offlineBanner.hidden = navigator.onLine;
}

window.addEventListener('online', updateConnectionState);
window.addEventListener('offline', updateConnectionState);
updateConnectionState();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js').catch(() => {
      // The site remains fully usable without offline caching.
    });
  });
}
