/*This is the basic script to load a service worker for resource caching, push
notifications and home screen icons.
You can learn more at: https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
  	// Register the service worker at your root directory
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}