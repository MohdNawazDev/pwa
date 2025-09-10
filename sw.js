const staticCacheName = 'site-static';

const assets = [
    ['/'],
    ['/index.html'],
    ['/js/app.js'],
    ['/js/ui.js'],
    ['/js/materialize.min.js'],
    ['/css/style.css'],
    ['/css/materialize.min.css'],
    ['/img/dish.png'],
    
]

// install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed');
    evt.waitUntil(
     // As install is asynchronous and lasted for few second but we have to cache the things so it needs to wait so using waitUntil
        caches.open(staticCacheName).then(cache => {
        console.log('caching cell assets');
        cache.addAll([
            'css/styles.css',
            '/index.html'
        ]);
    })
    )
})

//activating service worker 
self.addEventListener('activate', evt => {
    console.log('Service worker has been activated');
})

//Listening fetch events 
self.addEventListener('fetch', evt => {
    console.log('fetch evnt', evt);
})
