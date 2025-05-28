self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("frases-cache").then(cache => {
      return cache.addAll([
        "/frases-motivacionales/index.html",
        "/frases-motivacionales/style.css",
        "/frases-motivacionales/app.js",
        "/frases-motivacionales/manifest.json",
        "/frases-motivacionales/icons/icon-192.png",
        "/frases-motivacionales/icons/icon-512.png"
      ]).catch(err => {
        // Si algún archivo falla, el SW igual se instala
        console.warn("Algunos archivos no se pudieron cachear:", err);
      });
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});