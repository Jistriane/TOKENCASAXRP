const CACHE_NAME = 'tokencasa-v1';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/Logo.png',
  // Evitar pré-cache de arquivos de build que podem não existir em dev
];

// Utilitário para checar se uma URL tem um esquema suportado (somente http/https)
function isSupportedScheme(url) {
  try {
    const u = new URL(url, self.location.href);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const url of urlsToCache) {
        try {
          if (!isSupportedScheme(url)) {
            // Ignorar esquemas não suportados (ex: chrome-extension://)
            continue;
          }
          const resp = await fetch(url, { cache: 'no-store' });
          if (resp && resp.ok) {
            await cache.put(url, resp.clone());
          }
        } catch (err) {
          // Falha ao buscar um recurso não deve impedir a instalação do SW
          console.warn('SW: falha ao pré-cachear', url, err);
        }
      }
    })()
  );
});

self.addEventListener('fetch', (event) => {
  // Responder com cache quando possível, caso contrário tentar fetch normal
  event.respondWith(
    (async () => {
      try {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        // Evitar tentar fetch de esquemas não suportados
        if (!isSupportedScheme(event.request.url)) {
          return fetch(event.request);
        }
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (err) {
        // Se tudo falhar, recusar pacificamente
        return new Response('', { status: 504, statusText: 'Gateway Timeout' });
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })()
  );
});
