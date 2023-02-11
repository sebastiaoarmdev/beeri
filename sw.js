const cacheName = 'cache';
const precacheResources = [
    "./",
    "./index.html",
    "./styles/main.css",
    "./scripts/main.js",
    "./images/can.png",
    "./images/drink.png",
    "./images/glass.png",
    "./images/minus.png",
    "./images/mug.png",
    "./images/plus.png"
];

self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});
/*
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});
*/
