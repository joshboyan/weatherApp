/*jshint esversion: 6,  browser: true, devel: true, strict: true*/

/*You can have as many different javascript files as you like. but you have to 
list them in the gulpfile.js to ensure they concatenate in a specific order. You 
can use CommonJS style npm incudes in the browser "var module = require('module);".
All scripts will all be compiled to ES5, concantenated and linted for the dev build and
minified with comments removed for the dist build.*/

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