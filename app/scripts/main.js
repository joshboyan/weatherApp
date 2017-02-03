/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  var time = new Date().getHours(),
      date = new Date().getYear() + 1900,
      planningTime = 'day',
      system = 'standard',
      latitude,
      longitude,
      city,
      state,
      weather,
      icon,
      fahrenheit,
      feelsLikeF,
      celsius,
      feelsLikeC,
      humidity,
      windDirection,
      windSpeedMPH,
      windSpeedKPH,
      logo,
      day1WeekDay,
      day1Month,
      day1DateDay,
      day1Weather,
      day1Icon,
      day1HighC,
      day1HighF,
      day1LowC,
      day1LowF,
      day1WindDir,
      day1SpeedKPH,
      day1SpeedMPH,
      day1Humidity,
      day2WeekDay,
      day2Month,
      day2DateDay,
      day2Weather,
      day2Icon,
      day2HighC,
      day2HighF,
      day2LowC,
      day2LowF,
      day2WindDir,
      day2SpeedKPH,
      day2SpeedMPH,
      day2Humidity,
      day3WeekDay,
      day3Month,
      day3DateDay,
      day3Weather,
      day3Icon,
      day3HighC,
      day3HighF,
      day3LowC,
      day3LowF,
      day3WindDir,
      day3SpeedKPH,
      day3SpeedMPH,
      day3Humidity;

  function removeWeather() {
    document.querySelector('#clouds').style.display="none";
    document.querySelector('#rain').style.display="none";
    document.querySelector('#snow').style.display="none";
    document.querySelector('#sun').style.display="none";
    document.querySelector('#moon').style.display="none";
    document.querySelector('#stars').style.display="none";
    document.querySelector('#lightning').style.display="none";
    document.querySelector('#clearLink').className="";
    document.querySelector('#partlyLink').className="";
    document.querySelector('#lightRainLink').className="";
    document.querySelector('#heavyRainLink').className="";
    document.querySelector('#stormsLink').className="";
    document.querySelector('#lightSnowLink').className="";
    document.querySelector('#heavySnowLink').className="";
  }
  function clearWeather() {
    removeWeather();
    if (planningTime == 'day') {
      document.querySelector('#sun').style.display="block";
    }else if (planningTime == 'night') {
      document.querySelector('#moon').style.display="block";    document.querySelector('#stars').style.display="block";
    } else {
      document.querySelector('#stars').style.display="block";
    }
    document.querySelector('#clearLink').className="active-link";
  }
  function partlyWeather() {
    removeWeather();
    document.querySelector('#clouds').style.display="block";
    document.querySelector('.right-clouds').style.display="none";
    if (planningTime == 'day') {
      document.querySelector('#sun').style.display="block";
    }else if (planningTime == 'night') {

      document.querySelector('#moon').style.display="block";
    }
    document.querySelector('#partlyLink').className="active-link";
  }
  function lightRainWeather() {
    removeWeather();
    document.querySelector('#clouds').style.display="block";
    document.querySelector('.right-clouds').style.display="block";
    document.querySelector('#rain').style.display="block";
    document.querySelector('.heavy').style.display="none";
    document.querySelector('#lightRainLink').className="active-link";
  }
  function heavyRainWeather() {
    removeWeather();
    document.querySelector('#clouds').style.display="block";
    document.querySelector('.right-clouds').style.display="block";
    document.querySelector('#rain').style.display="block";
    document.querySelector('.heavy').style.display="block";
    document.querySelector('#heavyRainLink').className="active-link";
  }
  function stormsWeather() {
    removeWeather();
    document.querySelector('#clouds').style.display="block";
    document.querySelector('.right-clouds').style.display="block";
    document.querySelector('#rain').style.display="block";
    document.querySelector('#lightning').style.display="block";
    document.querySelector('#stormsLink').className="active-link";
  }
  function lightSnowWeather() {
    removeWeather();
    document.querySelector('#clouds').style.display="block";
    document.querySelector('.right-clouds').style.display="block";
    document.querySelector('#snow').style.display="block";
    document.getElementById('snow').querySelector('.heavy').style.display="none";
    document.querySelector('#lightSnowLink').className="active-link";
  }
  function heavySnowWeather() {
    removeWeather();
    document.querySelector('#clouds').style.display="block";
    document.querySelector('.right-clouds').style.display="block";
    document.querySelector('#snow').style.display="block";
    document.getElementById('snow').querySelector('.heavy').style.display="block";
    document.querySelector('#heavySnowLink').className="active-link";
  }
  document.querySelector('#clearLink').addEventListener("click", clearWeather);
  document.querySelector('#partlyLink').addEventListener("click", partlyWeather);
  document.querySelector('#lightRainLink').addEventListener("click", lightRainWeather);
  document.querySelector('#heavyRainLink').addEventListener("click", heavyRainWeather);
  document.querySelector('#stormsLink').addEventListener("click", stormsWeather);
  document.querySelector('#lightSnowLink').addEventListener("click", lightSnowWeather);
  document.querySelector('#heavySnowLink').addEventListener("click", heavySnowWeather);

  function removeTimeLinks() {
    document.querySelector('#dayLink').className="";
    document.querySelector('#nightLink').className="";
    document.querySelector('#twilightLink').className="";
  }
  function setDay() {
    removeTimeLinks();
    document.querySelector('main').style.background = "#87ceeb";
    document.querySelector('#dayLink').className="active-link";
    planningTime = "day";
    if(document.querySelector('#clearLink').className="active-link") {
      clearWeather();
    }
  }
  function setNight() {
    removeTimeLinks();
    document.querySelector('main').style.background = "#2E0854";
    document.querySelector('#nightLink').className="active-link";
    planningTime = "night";
    if(document.querySelector('#clearLink').className="active-link") {
      clearWeather();
    }
  }
  function setTwilight() {
    removeTimeLinks();
    document.querySelector('main').style.background = "linear-gradient(to bottom right, #2E0854 20%, #ffaa00)";
    document.querySelector('#twilightLink').className="active-link";
    planningTime = "twilight";
    if(document.querySelector('#clearLink').className="active-link") {
      clearWeather();
    }
  }
//Set backg
  if (time < 6 || time > 18) {
    setNight();
  } else if (time > 7 && time < 17) {
    setDay();
  } else {
    setTwilight();
  }
  console.log(time);
  document.querySelector('#dayLink').addEventListener("click", setDay);
  document.querySelector('#nightLink').addEventListener("click", setNight);
  document.querySelector('#twilightLink').addEventListener("click", setTwilight);
  document.querySelector('#c').onclick = function() {
    system = 'metric';
    document.querySelector('#c').className = "active";
    document.querySelector('#f').className = "";
    document.querySelector('#actual').innerHTML = `${celsius}&deg; C`;
    document.querySelector('#feelsLike').innerHTML = `${feelsLikeC}&deg; C`;
    document.querySelector('#wind').innerHTML = `${windDirection} ${windSpeedKPH} KPH`;
    document.querySelector('#day1Temp').innerHTML = `${day1HighC}/${day1LowC}&deg;C`;
    document.querySelector('#day1Wind').innerHTML = `${day1WindDir} ${day1SpeedKPH} KPH`;
    document.querySelector('#day2Temp').innerHTML = `${day2HighC}/${day2LowC}&deg;C`;
    document.querySelector('#day2Wind').innerHTML = `${day2WindDir} ${day2SpeedKPH} KPH`;
    document.querySelector('#day3Temp').innerHTML = `${day3HighC}/${day3LowC}&deg;C`;
    document.querySelector('#day3Wind').innerHTML = `${day3WindDir} ${day3SpeedKPH} KPH`;
    //console.log(system);
  };
  document.querySelector('#f').onclick = function() {
    system = 'standard';
    document.querySelector('#f').className = "active";
    document.querySelector('#c').className = "";
    document.querySelector('#actual').innerHTML = `${fahrenheit}&deg; F`;
    document.querySelector('#feelsLike').innerHTML = `${feelsLikeF}&deg; F`;
    document.querySelector('#wind').innerHTML = `${windDirection} ${windSpeedMPH} MPH`;
    document.querySelector('#day1Temp').innerHTML = `${day1HighF}/${day1LowF}&deg;F`;
    document.querySelector('#day1Wind').innerHTML = `${day1WindDir} ${day1SpeedMPH} MPH`;
    document.querySelector('#day2Temp').innerHTML = `${day2HighF}/${day2LowF}&deg;F`;
    document.querySelector('#day2Wind').innerHTML = `${day2WindDir} ${day2SpeedMPH} MPH`;
    document.querySelector('#day3Temp').innerHTML = `${day3HighF}/${day3LowF}&deg;F`;
    document.querySelector('#day3Wind').innerHTML = `${day3WindDir} ${day3SpeedMPH} MPH`;
    //console.log(system);
  };

//Check is geolocation is available
  if (navigator.geolocation) {
    //Get coordinates of device
    navigator.geolocation.getCurrentPosition(function(position) {
      //Assign coordinates to varirbles
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      //Show coordinates in viewport
      //output.innerHTML = `The latitude is ${latitude} and the longitude is ${longitude}`;
      //Setup variables for fetch api promise
      let myHeaders = new Headers(),
          myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
          };
      let forecastToday = `https://api.wunderground.com/api/22b6650e820a9ff6/geolookup/conditions/q/${latitude},${longitude}.json`;

      //request data from weather api
      fetch(forecastToday, myInit)
          .then(function(response) {
            if (response.ok) {
              response.json()
                  .then(function(data) {
                    console.log(data);
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
                    console.log(data);
                    /*console.log(city);
                     console.log(state);
                     console.log(weather);
                     console.log(icon);
                     console.log(fahrenheit);
                     console.log(feelsLikeF);
                     console.log(celsius);
                     console.log(feelsLikeC);
                     console.log(humidity);
                     console.log(windDirection);
                     console.log(windSpeedMPH);
                     console.log(windSpeedKPH);
                     console.log(logo);*/
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
                    document.querySelector('#attribution').innerHTML = `<img src=${logo.replace('http', 'https')}> <span>Weather information for Latitude:${Math.round(latitude *100)/100} and Longitude:${Math.round(longitude * 100)/100} provided by <a href=https://www.wunderground.com>Weather&nbsp;Underground</a>`;
                    if (weather.includes('Clear') || weather.includes('Smoke') || weather.includes('Haze')  || weather.includes('Ash') || weather.includes('Dust') || weather.includes('Sandstorm') || weather.includes('Fog') || weather.includes('Sand')) {
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
                      if(weather.includes('Light')) {
                        lightSnowWeather();
                      } else {
                        heavySnowWeather();
                      }
                      if(weather.includes('Thunderstorms')) {
                        stormWeather();
                      }

                    }
                  });
            } else {
              console.log('Network response was not ok.');
            }
          });
      let forecast3Day = `https://api.wunderground.com/api/22b6650e820a9ff6/forecast/q/${latitude},${longitude}.json`;
      fetch(forecast3Day, myInit)
          .then(function(response) {
            if (response.ok) {
              response.json()
                  .then(function(data) {
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
                    /*console.log(data);
                     console.log(day1WeekDay);
                     console.log(day1Month);
                     console.log(day1DateDay);
                     console.log(day1Weather);
                     console.log(day1Icon);
                     console.log(day1HighC);
                     console.log(day1HighF);
                     console.log(day1LowC);
                     console.log(day1LowF);
                     console.log(day1WindDir);
                     console.log(day1SpeedKPH);
                     console.log(day1SpeedMPH);
                     console.log(day1Humidity);*/
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
                  });
            } else {
              console.log('Network response was not ok.');
            }
          });
    });
  } else {
    alert("Geolocation is not available in this browser");
  }
//Change the date in the copyright statement to this year
  document.querySelector('#copy').innerHTML = `&copy; JoshBoyan ${date}`;

  var infoPanelHeight = document.querySelector('.info-panel').clientHeight;
  console.log(infoPanelHeight);
  document.querySelector('.option-panel').style.top = `${300 + infoPanelHeight}px`;
  var optionPanelHeight = document.querySelector('.option-panel').clientHeight;
  console.log(optionPanelHeight);
  document.querySelector('#main').style.height = `${infoPanelHeight + 500 + optionPanelHeight}px`;
  // Your custom JavaScript goes here
})();
