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

function showTemperature(response) {
  console.log(response);
  document.querySelector(".date-and-location_location").innerHTML =
    response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(
    ".current-temperature__value"
  );
  temperatureElement.innerHTML = `${temperature}&degC`;

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

  let sunrise = document.querySelector(".current-stats__sunrise");
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let srHour = sunriseTime.getHours();
  if (srHour < 10) {
    srHour = `0${srHour}`;
  }
  let srMinute = sunriseTime.getMinutes();
  if (srMinute < 10) {
    srMinute = `0${srMinute}`;
  }

  let srt = `${srHour}:${srMinute}`;
  sunrise.innerHTML = srt;

  let sunset = document.querySelector(".current-stats__sunset");
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let ssHour = sunsetTime.getHours();
  if (ssHour < 10) {
    ssHour = `0${ssHour}`;
  }
  let ssMinute = sunsetTime.getMinutes();
  if (ssMinute < 10) {
    ssMinute = `0${ssMinute}`;
  }

  let sst = `${ssHour}:${ssMinute}`;
  sunset.innerHTML = sst;
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
