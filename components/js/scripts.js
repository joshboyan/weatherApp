/*jshint esversion: 6,  browser: true, devel: true, strict: true*/

/*You can have as many different javascript files as you like. but you have to 
list them in the gulpfile.js to ensure they concatenate in a specific order. You an use SE2015 
style imports(import module from 'module';) before the IIFE "use strict"; function. You can 
also use CommonJS style npm incudes in the browser "var module = require('module);". All 
scripts will all be compiled to ES5, concantenated and linted for the dev build andminified 
with comments removed for the dist build.*/

import Promise from 'promise-polyfill';
// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

import 'whatwg-fetch';

var idb = require('idb');

(function() {
    "use strict";
    var time = new Date().getHours();
    var date = new Date().getYear() + 1900;
    var planningTime = 'day';
    var latitude;
    var longitude;
    var city;
    var state;
    var weather;
    var icon;
    var fahrenheit;
    var feelsLikeF;
    var celsius;
    var feelsLikeC;
    var humidity;
    var windDirection;
    var windSpeedMPH;
    var windSpeedKPH;
    var logo;
    var day1WeekDay;
    var day1Month;
    var day1DateDay;
    var day1Weather;
    var day1Icon;
    var day1HighC;
    var day1HighF;
    var day1LowC;
    var day1LowF;
    var day1WindDir;
    var day1SpeedKPH;
    var day1SpeedMPH;
    var day1Humidity;
    var day2WeekDay;
    var day2Month;
    var day2DateDay;
    var day2Weather;
    var day2Icon;
    var day2HighC;
    var day2HighF;
    var day2LowC;
    var day2LowF;
    var day2WindDir;
    var day2SpeedKPH;
    var day2SpeedMPH;
    var day2Humidity;
    var day3WeekDay;
    var day3Month;
    var day3DateDay;
    var day3Weather;
    var day3Icon;
    var day3HighC;
    var day3HighF;
    var day3LowC;
    var day3LowF;
    var day3WindDir;
    var day3SpeedKPH;
    var day3SpeedMPH;
    var day3Humidity;

    // Open an indexedDB database called weather 
    // (Create one if there is none)
    var dbPromise = idb.open('weather', 1, upgradeDB => {
        // Create an object store named weather if none exists
        let weather = upgradeDB.createObjectStore('weather');
    }).catch(error => {
        console.error('IndexedDB: ', error);
    });

    function removeWeather() {
        document.querySelector('#clouds').style.display = 'none';
        document.querySelector('#rain').style.display = 'none';
        document.querySelector('#snow').style.display = 'none';
        document.querySelector('#sun').style.display = 'none';
        document.querySelector('#moon').style.display = 'none';
        document.querySelector('#stars').style.display = 'none';
        document.querySelector('#lightning').style.display = 'none';
        document.querySelector('#clearLink').className = '';
        document.querySelector('#partlyLink').className = '';
        document.querySelector('#lightRainLink').className = '';
        document.querySelector('#heavyRainLink').className = '';
        document.querySelector('#stormsLink').className = '';
        document.querySelector('#lightSnowLink').className = '';
        document.querySelector('#heavySnowLink').className = '';
    }

    function clearWeather() {
        removeWeather();
        if (planningTime === 'day') {
            document.querySelector('#sun').style.display = 'block';
        } else if (planningTime === 'night') {
            document.querySelector('#moon').style.display = 'block';
            document.querySelector('#stars').style.display = 'block';
        } else {
            document.querySelector('#stars').style.display = 'block';
        }
        document.querySelector('#clearLink').className = 'active-link';
    }

    function partlyWeather() {
        removeWeather();
        document.querySelector('#clouds').style.display = 'block';
        document.querySelector('.right-clouds').style.display = 'none';
        if (planningTime === 'day') {
            document.querySelector('#sun').style.display = 'block';
        } else if (planningTime === 'night') {
            document.querySelector('#moon').style.display = 'block';
        }
        document.querySelector('#partlyLink').className = 'active-link';
    }

    function lightRainWeather() {
        removeWeather();
        document.querySelector('#clouds').style.display = 'block';
        document.querySelector('.right-clouds').style.display = 'block';
        document.querySelector('#rain').style.display = 'block';
        document.querySelector('.heavy').style.display = 'none';
        document.querySelector('#lightRainLink').className = 'active-link';
    }

    function heavyRainWeather() {
        removeWeather();
        document.querySelector('#clouds').style.display = 'block';
        document.querySelector('.right-clouds').style.display = 'block';
        document.querySelector('#rain').style.display = 'block';
        document.querySelector('.heavy').style.display = 'block';
        document.querySelector('#heavyRainLink').className = 'active-link';
    }

    function stormsWeather() {
        removeWeather();
        document.querySelector('#clouds').style.display = 'block';
        document.querySelector('.right-clouds').style.display = 'block';
        document.querySelector('#rain').style.display = 'block';
        document.querySelector('#lightning').style.display = 'block';
        document.querySelector('#stormsLink').className = 'active-link';
    }

    function lightSnowWeather() {
        removeWeather();
        document.querySelector('#clouds').style.display = 'block';
        document.querySelector('.right-clouds').style.display = 'block';
        document.querySelector('#snow').style.display = 'block';
        document.getElementById('snow').querySelector('.heavy').style.display = 'none';
        document.querySelector('#lightSnowLink').className = 'active-link';
    }

    function heavySnowWeather() {
        removeWeather();
        document.querySelector('#clouds').style.display = 'block';
        document.querySelector('.right-clouds').style.display = 'block';
        document.querySelector('#snow').style.display = 'block';
        document.getElementById('snow').querySelector('.heavy').style.display = 'block';
        document.querySelector('#heavySnowLink').className = 'active-link';
    }
    document.querySelector('#clearLink').addEventListener('click', clearWeather);
    document.querySelector('#partlyLink').addEventListener('click', partlyWeather);
    document.querySelector('#lightRainLink').addEventListener('click', lightRainWeather);
    document.querySelector('#heavyRainLink').addEventListener('click', heavyRainWeather);
    document.querySelector('#stormsLink').addEventListener('click', stormsWeather);
    document.querySelector('#lightSnowLink').addEventListener('click', lightSnowWeather);
    document.querySelector('#heavySnowLink').addEventListener('click', heavySnowWeather);

    function removeTimeLinks() {
        document.querySelector('#dayLink').className = '';
        document.querySelector('#nightLink').className = '';
        document.querySelector('#twilightLink').className = '';
    }

    function setDay() {
        removeTimeLinks();
        document.querySelector('main').style.background = '#87ceeb';
        document.querySelector('#dayLink').className = 'active-link';
        planningTime = 'day';
        if (document.querySelector('#clearLink').className === 'active-link') {
            clearWeather();
        }
    }

    function setNight() {
        removeTimeLinks();
        document.querySelector('main').style.background = '#2E0854';
        document.querySelector('#nightLink').className = 'active-link';
        planningTime = 'night';
        if (document.querySelector('#clearLink').className === 'active-link') {
            clearWeather();
        }
    }

    function setTwilight() {
        removeTimeLinks();
        document.querySelector('main').style.background = 'linear-gradient(to bottom right, #2E0854 20%, #ffaa00)';
        document.querySelector('#twilightLink').className = 'active-link';
        planningTime = 'twilight';
        if (document.querySelector('#clearLink').className === 'active-link') {
            clearWeather();
        }
    }
    // Set backg
    if (time < 6 || time > 18) {
        setNight();
    } else if (time > 7 && time < 17) {
        setDay();
    } else {
        setTwilight();
    }
    //console.log(time);
    document.querySelector('#dayLink').addEventListener('click', setDay);
    document.querySelector('#nightLink').addEventListener('click', setNight);
    document.querySelector('#twilightLink').addEventListener('click', setTwilight);
    document.querySelector('#c').onclick = function() {
        document.querySelector('#c').className = 'active';
        document.querySelector('#f').className = '';
        document.querySelector('#actual').innerHTML = `${celsius}&deg; C`;
        document.querySelector('#feelsLike').innerHTML = `${feelsLikeC}&deg; C`;
        document.querySelector('#wind').innerHTML = `${windDirection} ${windSpeedKPH} KPH`;
        document.querySelector('#day1Temp').innerHTML = `${day1HighC}/${day1LowC}&deg;C`;
        document.querySelector('#day1Wind').innerHTML = `${day1WindDir} ${day1SpeedKPH} KPH`;
        document.querySelector('#day2Temp').innerHTML = `${day2HighC}/${day2LowC}&deg;C`;
        document.querySelector('#day2Wind').innerHTML = `${day2WindDir} ${day2SpeedKPH} KPH`;
        document.querySelector('#day3Temp').innerHTML = `${day3HighC}/${day3LowC}&deg;C`;
        document.querySelector('#day3Wind').innerHTML = `${day3WindDir} ${day3SpeedKPH} KPH`;
        // console.log(system);
    };
    document.querySelector('#f').onclick = function() {
        document.querySelector('#f').className = 'active';
        document.querySelector('#c').className = '';
        document.querySelector('#actual').innerHTML = `${fahrenheit}&deg; F`;
        document.querySelector('#feelsLike').innerHTML = `${feelsLikeF}&deg; F`;
        document.querySelector('#wind').innerHTML = `${windDirection} ${windSpeedMPH} MPH`;
        document.querySelector('#day1Temp').innerHTML = `${day1HighF}/${day1LowF}&deg;F`;
        document.querySelector('#day1Wind').innerHTML = `${day1WindDir} ${day1SpeedMPH} MPH`;
        document.querySelector('#day2Temp').innerHTML = `${day2HighF}/${day2LowF}&deg;F`;
        document.querySelector('#day2Wind').innerHTML = `${day2WindDir} ${day2SpeedMPH} MPH`;
        document.querySelector('#day3Temp').innerHTML = `${day3HighF}/${day3LowF}&deg;F`;
        document.querySelector('#day3Wind').innerHTML = `${day3WindDir} ${day3SpeedMPH} MPH`;
        // console.log(system);
    };

    // Check is geolocation is available
    if (navigator.geolocation) {
        // Get coordinates of device
        navigator.geolocation.getCurrentPosition(function(position) {
            // Assign coordinates to varirbles
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            // Show coordinates in viewport
            // output.innerHTML = `The latitude is ${latitude} and the longitude is ${longitude}`;
            // Setup variables for fetch api promise
            let myHeaders = new Headers();
            let myInit = {
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            };
            let forecastToday = `https://api.wunderground.com/api/22b6650e820a9ff6/geolookup/conditions/q/${latitude},${longitude}.json`;
            // request data from weather api
            fetch(forecastToday, myInit)
                .then(response => response.json())
                .then(data => {
                    city = data.location.city;
                    state = data.location.state;
                    weather = data.current_observation.weather;
                    icon = data.current_observation.icon_url;
                    fahrenheit = data.current_observation.temp_f;
                    feelsLikeF = data.current_observation.feelslike_f;
                    celsius = data.current_observation.temp_c;
                    feelsLikeC = data.current_observation.feelslike_c;
                    humidity = data.current_observation.relative_humidity;
                    windDirection = data.current_observation.wind_dir;
                    windSpeedMPH = data.current_observation.wind_mph;
                    windSpeedKPH = data.current_observation.wind_kph;
                    logo = data.current_observation.image.url;
                    document.querySelector('#location').innerHTML = `${city} , ${state}`;
                    document.querySelector('#icon').innerHTML = `<img src=${icon.replace('http', 'https')} />`;
                    document.querySelector('#conditions').innerHTML = `${weather}`;
                    document.querySelector('#humidity').innerHTML = `${humidity}`;
                    document.querySelector('#wind').innerHTML = `${windDirection} ${windSpeedMPH} MPH`;
                    document.querySelector('#actual').innerHTML = `${fahrenheit}&deg; F`;
                    document.querySelector('#feelsLike').innerHTML = `${feelsLikeF}&deg; F`;
                    let planningStr = `https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=things%20to%20do%20in%20${city}%20${state}%20on%20a%20${weather}%20${planningTime}`;
                    if (time < 15) {
                        document.querySelector('#plan').setAttribute('href', planningStr);
                    } else {
                        document.querySelector('#plan').setAttribute('href', planningStr);
                        document.querySelector('#plan').innerHTML = 'Plan Your Night';
                    }
                    document.querySelector('#thermometerTemp').setAttribute('y1', `${150 - fahrenheit}`);
                    document.querySelector('#attribution').innerHTML = `<img src=${logo.replace('http', 'https')}> <span>Weather information for Latitude:${Math.round(latitude * 100) / 100} and Longitude:${Math.round(longitude * 100) / 100} provided by <a href=https://www.wunderground.com>Weather&nbsp;Underground</a>`;
                    if (weather.includes('Clear') || weather.includes('Smoke') || weather.includes('Haze') || weather.includes('Ash') || weather.includes('Dust') || weather.includes('Sandstorm') || weather.includes('Fog') || weather.includes('Sand')) {
                        clearWeather();
                    }
                    if (weather.includes('Cloudy') || weather.includes('Clouds') || weather.includes('Overcast')) {
                        partlyWeather();
                    }
                    if (weather.includes('Rain')) {
                        heavyRainWeather();
                    }
                    if (weather.includes('Drizzle') || weather.includes('Mist')) {
                        lightRainWeather();
                    }
                    if (weather.includes('Snow') || weather.includes('Ice') || weather.includes('Hail')) {
                        if (weather.includes('Light')) {
                            lightSnowWeather();
                        } else {
                            heavySnowWeather();
                        }
                        if (weather.includes('Thunderstorms')) {
                            stormsWeather();
                        }
                    }
                    var forcastTodayData = data;
                    // Add forecastToday's repsonse to indexedDB incase user goes offline
                    dbPromise.then(db => {
                        let tx = db.transaction('weather', 'readwrite');
                        let weather = tx.objectStore('weather', 'readwrite');
                        weather.delete('forecastToday');
                        weather.add(forcastTodayData, 'forecastToday');

                    }).catch(error => {
                        console.error('IndexedDB:', error);
                    });

                }).catch(error => {
                    console.error('Network:', error);
                });
            let forecast3Day = `https://api.wunderground.com/api/22b6650e820a9ff6/forecast/q/${latitude},${longitude}.json`;
            fetch(forecast3Day, myInit)
                .then(response => response.json())
                .then(data => {
                    day1WeekDay = data.forecast.simpleforecast.forecastday[1].date.weekday;
                    day1Month = data.forecast.simpleforecast.forecastday[1].date.month;
                    day1DateDay = data.forecast.simpleforecast.forecastday[1].date.day;
                    day1Weather = data.forecast.simpleforecast.forecastday[1].conditions;
                    day1Icon = data.forecast.simpleforecast.forecastday[1].icon_url;
                    day1HighC = data.forecast.simpleforecast.forecastday[1].high.celsius;
                    day1HighF = data.forecast.simpleforecast.forecastday[1].high.fahrenheit;
                    day1LowC = data.forecast.simpleforecast.forecastday[1].low.celsius;
                    day1LowF = data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
                    day1WindDir = data.forecast.simpleforecast.forecastday[1].avewind.dir;
                    day1SpeedKPH = data.forecast.simpleforecast.forecastday[1].avewind.kph;
                    day1SpeedMPH = data.forecast.simpleforecast.forecastday[1].avewind.mph;
                    day1Humidity = data.forecast.simpleforecast.forecastday[1].avehumidity;
                    day2WeekDay = data.forecast.simpleforecast.forecastday[2].date.weekday;
                    day2Month = data.forecast.simpleforecast.forecastday[2].date.month;
                    day2DateDay = data.forecast.simpleforecast.forecastday[2].date.day;
                    day2Weather = data.forecast.simpleforecast.forecastday[2].conditions;
                    day2Icon = data.forecast.simpleforecast.forecastday[2].icon_url;
                    day2HighC = data.forecast.simpleforecast.forecastday[2].high.celsius;
                    day2HighF = data.forecast.simpleforecast.forecastday[2].high.fahrenheit;
                    day2LowC = data.forecast.simpleforecast.forecastday[2].low.celsius;
                    day2LowF = data.forecast.simpleforecast.forecastday[2].low.fahrenheit;
                    day2WindDir = data.forecast.simpleforecast.forecastday[2].avewind.dir;
                    day2SpeedKPH = data.forecast.simpleforecast.forecastday[2].avewind.kph;
                    day2SpeedMPH = data.forecast.simpleforecast.forecastday[2].avewind.mph;
                    day2Humidity = data.forecast.simpleforecast.forecastday[2].avehumidity;
                    day3WeekDay = data.forecast.simpleforecast.forecastday[3].date.weekday;
                    day3Month = data.forecast.simpleforecast.forecastday[3].date.month;
                    day3DateDay = data.forecast.simpleforecast.forecastday[3].date.day;
                    day3Weather = data.forecast.simpleforecast.forecastday[3].conditions;
                    day3Icon = data.forecast.simpleforecast.forecastday[3].icon_url;
                    day3HighC = data.forecast.simpleforecast.forecastday[3].high.celsius;
                    day3HighF = data.forecast.simpleforecast.forecastday[3].high.fahrenheit;
                    day3LowC = data.forecast.simpleforecast.forecastday[3].low.celsius;
                    day3LowF = data.forecast.simpleforecast.forecastday[3].low.fahrenheit;
                    day3WindDir = data.forecast.simpleforecast.forecastday[3].avewind.dir;
                    day3SpeedKPH = data.forecast.simpleforecast.forecastday[3].avewind.kph;
                    day3SpeedMPH = data.forecast.simpleforecast.forecastday[3].avewind.mph;
                    day3Humidity = data.forecast.simpleforecast.forecastday[3].avehumidity;
                    document.querySelector('#day1Date').innerHTML = `${day1WeekDay.substring(0, 3)} ${day1Month}/${day1DateDay}`;
                    if (day1Weather.length < 8) {
                        document.querySelector('#day1Weather').innerHTML = day1Weather;
                    } else {
                        document.querySelector('#day1Weather').innerHTML = day1Weather.replace(' ', '<br>');
                    }
                    document.querySelector('#day1Icon').innerHTML = `<img src="${day1Icon.replace('http', 'https')}">`;
                    document.querySelector('#day1Temp').innerHTML = `${day1HighF}/${day1LowF}&deg;F`;
                    document.querySelector('#day1Wind').innerHTML = `${day1WindDir} ${day1SpeedMPH} MPH`;
                    document.querySelector('#day1Humidity').innerHTML = `${day1Humidity}%`;
                    document.querySelector('#day2Date').innerHTML = `${day2WeekDay.substring(0, 3)} ${day2Month}/${day2DateDay}`;
                    if (day2Weather.length < 9) {
                        document.querySelector('#day2Weather').innerHTML = day2Weather;
                    } else {
                        document.querySelector('#day2Weather').innerHTML = day2Weather.replace(' ', '<br>');
                    }
                    document.querySelector('#day2Icon').innerHTML = `<img src="${day2Icon.replace('http', 'https')}">`;
                    document.querySelector('#day2Temp').innerHTML = `${day2HighF}/${day2LowF}&deg;F`;
                    document.querySelector('#day2Wind').innerHTML = `${day2WindDir} ${day2SpeedMPH} MPH`;
                    document.querySelector('#day2Humidity').innerHTML = `${day2Humidity}%`;
                    document.querySelector('#day3Date').innerHTML = `${day3WeekDay.substring(0, 3)} ${day3Month}/${day3DateDay}`;
                    if (day3Weather.length < 9) {
                        document.querySelector('#day3Weather').innerHTML = day3Weather;
                    } else {
                        document.querySelector('#day3Weather').innerHTML = day3Weather.replace(' ', '<br>');
                    }
                    document.querySelector('#day3Icon').innerHTML = `<img src="${day3Icon.replace('http', 'https')}">`;
                    document.querySelector('#day3Temp').innerHTML = `${day3HighF}/${day3LowF}&deg;F`;
                    document.querySelector('#day3Wind').innerHTML = `${day3WindDir} ${day3SpeedMPH} MPH`;
                    document.querySelector('#day3Humidity').innerHTML = `${day3Humidity}%`;
                    var forcast3DayData = data;
                    // Add forecastToday's repsonse to indexedDB incase user goes offline
                    dbPromise.then(db => {
                        let tx = db.transaction('weather', 'readwrite');
                        let weather = tx.objectStore('weather', 'readwrite');
                        weather.delete('forecast3Day');
                        weather.add(forcast3DayData, 'forecast3Day');
                    }).catch(error => {
                        console.error('IndexedDB:', error);
                    });
                }).catch(error => {
                    console.error(error);
                });
        });
    } else {
        console.log('Geolocation is not available in this browser');
    }
    // Change the date in the copyright statement to this year
    document.querySelector('#copy').innerHTML = `&copy; Josh Boyan ${date}`;

    var infoPanelHeight = document.querySelector('.info-panel').clientHeight;
    //console.log(infoPanelHeight);
    document.querySelector('.option-panel').style.top = `${300 + infoPanelHeight}px`;
    var optionPanelHeight = document.querySelector('.option-panel').clientHeight;
    //console.log(optionPanelHeight);
    document.querySelector('#main').style.height = `${infoPanelHeight + 500 + optionPanelHeight}px`;
})();
