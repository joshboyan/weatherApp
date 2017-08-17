this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'https://joshboyan.com/weather-app/',
        '/',
        '/index.html',
        'https://joshboyan.com/weather-app/css/styles.css',
        'https://joshboyan.com/weather-app/js/scripts.js',
        'https://joshboyan.com/weather-app/sw.js',
        'https://joshboyan.com/weather-app/img/apple-touch-logo.png',
        'https://joshboyan.com/weather-app/img/bell.png',
        'https://joshboyan.com/weather-app/img/chrome-touch-icon-192x192.png',
        'https://joshboyan.com/weather-app/img/favicon.png',
        'https://joshboyan.com/weather-app/img/icon-128x128.png',
        'https://joshboyan.com/weather-app/img/large-icon-252x252.png',
        'https://joshboyan.com/weather-app/img/logo.png',
        'https://joshboyan.com/weather-app/img/ms-touch-icon-144x144.png',
      ]);
    }).catch(function(){
      console.warn('Some assets may not have been cached');
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)    
  );
});