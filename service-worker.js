 let CACHE_VERSION = 'app-v1';
let cacheName = [
    './UI',
    '/index.html',
    './UI/css/main.css',
    './UI/js/index.js',
    './UI//img/coin2.jpeg',
    './UI/js/app.js',


];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('Opened cache');
                u
            })
    );
});

self.addEventListener('activate', (e) => {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});
