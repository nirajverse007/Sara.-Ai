// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  // pre-cache files (optional but recommended for offline support)
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',             // homepage
        '/index.html',   // main HTML
        '/style.css',    // CSS
        '/script.js',    // JS
        '/logo.png'      // app icon
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  // old caches clean karna optional
});

// Fetch event - serve cached files for offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
