const CACHE_NAME = 'motivational-quotes-v1';
const urlsToCache = [
  'index.html',
  'manifest.json'
];

// Instalación del service worker con manejo de errores al cachear
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
          } catch (err) {
            console.warn(`No se pudo cachear: ${url}`, err);
          }
        }
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});