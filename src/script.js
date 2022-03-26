function date() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour};`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${hour}:${minute}`;
}

let currentDate = document.querySelector(".date-and-location_date");
currentDate.innerHTML = date();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
     <div class="col-2">
          <div class="day">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="60" />
          <div class="temp">
            <span class="forecast-temp-max"> ${Math.round(
              forecastDay.temp.max
            )}&deg |</span>
            <span class="forecast-temp-min"> ${Math.round(
              forecastDay.temp.min
            )}&deg</span>
          </div>
    </div>
`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "493284cbe724ef66319043e8a8c97a54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  document.querySelector(".date-and-location_location").innerHTML =
    response.data.name + "," + " " + response.data.sys.country;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(
    ".current-temperature__value"
  );
  temperatureElement.innerHTML = temperature;

  let description = document.querySelector(".current-temperature__summary");
  description.innerHTML = response.data.weather[0].description;

  let highestTemp = Math.round(response.data.main.temp_max);
  let highestTempElement = document.querySelector(
    ".current-stats__highest-temp"
  );
  highestTempElement.innerHTML = `${highestTemp}&degC`;

  let lowestTemp = Math.round(response.data.main.temp_min);
  let lowestTempElement = document.querySelector(".current-stats__lowest-temp");
  lowestTempElement.innerHTML = `${lowestTemp}&degC`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".current-stats__wind");
  windSpeed.innerHTML = `${wind} km/h`;

  let humidity = document.querySelector(".current-stats__humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "493284cbe724ef66319043e8a8c97a54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "493284cbe724ef66319043e8a8c97a54";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(showTemperature);
}

function currentLocationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityValue = document.querySelector(".searchButton");
cityValue.addEventListener("click", citySearch);

let currentLocationButton = document.querySelector(".currentButton");
currentLocationButton.addEventListener("click", currentLocationTemp);

searchCity("Warsaw");
