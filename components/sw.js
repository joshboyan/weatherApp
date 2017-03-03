// Once your project goes live this variable needs to be 
// incrememnted to signal the service worker needs to be updated
// any time you make a change to any file tha tis cached
var cacheName = 'project-cache-v1';
// List of static assets ou want to cache
var filesToCache = [
	'/',
	'/index.html',
	'/css/styles.css',
	'/js/scripts.js',
	'/img/favicon.png'
	];
// Install initial service worker in the browser
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  // Wait for the servicce worker to finish installing
  e.waitUntil(
  	// Create the cache to hold all the static assets you listed
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      // Add all the static assets to the cache
      return cache.addAll(filesToCache);
    })
  );
});

// When service worker on page starts up
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  // Wait until it is activated
  e.waitUntil(
  	// Get all the key values of cache names stored in the browser
    caches.keys().then(function(keyList) {
      // Iterate over the array of cache names
      return Promise.all(keyList.map(function(key) {
      	// Delete the cache key doesn't match the variable at the 
      	// top of this file
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});