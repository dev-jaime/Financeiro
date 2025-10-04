const CACHE_NAME = "orcamento-v1";
/*
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/js/app.js",
  "/js/firebase.js",
  "/js/receitas.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];
*/
const urlsToCache = [
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/firebase.js',
  './js/receitas.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
];
// Instalando SW e cacheando arquivos existentes
self.addEventListener("install", event => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map(url =>
        fetch(url)
          .then(resp => {
            if (!resp.ok) throw new Error(`Falha ao buscar ${url}`);
            return caches.open(CACHE_NAME).then(cache => cache.put(url, resp));
          })
          .catch(err => {
            console.warn("Não foi possível cachear:", url, err.message);
          })
      )
    )
  );
  self.skipWaiting();
});

// Ativa e remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Intercepta requisições e serve do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
