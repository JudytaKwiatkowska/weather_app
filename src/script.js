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
    response.data.name + "," + " " + response.data.sys.country;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(
    ".current-temperature__value"
  );
  temperatureElement.innerHTML = temperature;

  let description = document.querySelector(".current-temperature__summary");
  description.innerHTML = response.data.weather[0].main;

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
  let iconDescription = response.data.weather[0].main;
  if (iconDescription == "Thunderstorm") {
    currentIcon.setAttribute("src", `images/thunderstorm.png`);
  } else if (iconDescription == "Drizzle") {
    currentIcon.setAttribute("src", `images/drizzle.png`);
  } else if (iconDescription == "Rain") {
    currentIcon.setAttribute("src", `images/rain.png`);
  } else if (iconDescription == "Snow") {
    currentIcon.setAttribute("src", `images/snow.png`);
  } else if (
    iconDescription == "Mist" ||
    iconDescription == "Fog" ||
    iconDescription == "Smoke" ||
    iconDescription == "Haze"
  ) {
    currentIcon.setAttribute("src", `images/mist.png`);
  } else if (iconDescription == "Clear") {
    currentIcon.setAttribute("src", `images/clear.png`);
  } else if (iconDescription == "Clouds") {
    currentIcon.setAttribute("src", `images/cloudy.png`);
  }
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
