if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://joshboyan.com/weather-app/sw.js', {scope: 'https://joshboyan.com/weather-app/'})
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}