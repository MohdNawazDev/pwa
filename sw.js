const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/style.css',
  '/css/materialize.min.css',
  '/img/dish.png'
];

self.addEventListener('install', evt => {
  console.log('Service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets)
        .then(() => console.log('Assets cached'))
        .catch(err => console.error('Cache addAll failed:', err));
    })
  );
});


// Activate
self.addEventListener('activate', evt => {
  console.log('Service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
