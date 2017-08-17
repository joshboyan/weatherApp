# Animated Weather

This is a progressive web app built with ECMAScript2015 to provide users with their current weather and a 3 day forecast. Their location is programmatically attained using the Geolocation API and the latest weather observation is fetched from the Weather Underground API. Once the response is recieved the app renders a background based on the time and displays SVG animations based on weather conditions.

Animated weather uses service workers to to provide a better user experience in low connectivity and offline as well as the option for users to app the app to their homescreen. The app is built using the ES2015 imports modules to polyfill the fetch API and a Promise wrapper for the IndexedDB API to store weather info for offline access.

[View Animated Weather](https://joshboyan.com/weather-app/)