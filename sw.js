const staticCacheName = 'site-static-v2';
const assets = [
  './',
  './index.html', //correct
  './js/app.js', //cor
  './js/ui.js', //correct
  './js/materialize.min.js', //corr
  './css/styles.css', //corr
  './css/materialize.min.css', //corr
  './img/dish.png'//corr 
];

self.addEventListener('install', evt => {
  console.log('Service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(async cache => {
    
    for(let asset of assets){
      try {
        await cache.add(asset);
        console.log('Cache assets', asset);
      } catch (error) {
         console.error('failed assets', asset, error);
      }

    }  

    })
  );
});


// Activate
self.addEventListener('activate', evt => {
  //Updating the versioning of the cache 

  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== staticCacheName).map(key => caches.delete(key))
      )
    })
  );
   
});

// Fetch
self.addEventListener('fetch', evt => {
  evt.respondWith(
  caches.match(evt.request).then(cachesMatch => {
    return cachesMatch || fetch(evt.request); //if it is matching we will return the match otherwise normal fetch request that user requested

  })
)
});
