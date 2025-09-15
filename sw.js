const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-static-v3';
const assets = [
  './',
  './index.html', //correct
  './js/app.js', //cor
  './js/ui.js', //correct
  './js/materialize.min.js', //corr
  './css/styles.css', //corr
  './css/materialize.min.css', //corr
  './img/dish.png', //corr 
  './pages/fallback.html',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v144/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  
];


//cache limit size 
const cacheLimitSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(key => {
      if(key.length > size) cache.delete(key[0]).then(cacheLimitSize(name, size));
    })
  })
}

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
        keys.filter(key => key !== staticCacheName && key !== dynamicCacheName).map(key => caches.delete(key))
      )
    })
  );
   
});

// Fetch(Mainly for APis)
self.addEventListener('fetch', evt => {
  
  evt.respondWith(
  caches.match(evt.request).then(cachesMatch => {
    //if it is matching we will return the match otherwise normal fetch request that user requested
    return cachesMatch || fetch(evt.request)
    //niche ka code basically ye kar rha jab home online honge agar ham offline hone se pehle visit karenge to work nhi karega
    //Otherwise 404 error aayegi

    .then(fetchRespon => {
      return caches.open(dynamicCacheName).then(cache => {
        cache.put(evt.request, fetchRespon.clone())
        cacheLimitSize(dynamicCacheName, 2);
        return fetchRespon;
      });
    });

  }).catch(() => {
    //we applied this condition because everytime whatever user request in offline mode we returning one page.so, whether user is requesting image,css we are
    //always delivering fallback of contact.html file only that's why we applied this condition
    if(evt.request.url.indexOf('.html' > -1)){
      return caches.match('./pages/fallback.html') //ye miss kar rha tha fallback me error catch se hi chalega and it should be return
    }
    

  })
    
)
  



});
