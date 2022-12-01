var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchInput");
var apiKey = "ae8dc33d91f6926ff7f6df500e291f80";
var cityName = document.getElementById("cityName");
var temp = document.getElementById("temp");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");

// functions

function getCity() {
  var city = searchInput.value;
  var currentUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(currentUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
      saveToLS(data);
    });

  fetch(forecastUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayForecastWeather(data);
    });
}
// need to make current variables
function displayCurrentWeather(data) {
  let kelvin = data.main.temp;
  let fahrenheit = 1.8 * (kelvin - 273) + 32;
  let iconCode = data.weather[0].icon;
  let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  cityName.textContent = data.name + " " + dayjs().format("ddd MM/DD/YYYY");
  temp.textContent = "Temperature: " + fahrenheit.toFixed(2) + " °F";
  humidity.textContent = "Humidity: " + data.main.humidity + " %";
  wind.textContent = "wind: " + data.wind.speed + " MPH";
  $("#weatherIcon").attr("src", iconUrl);
}
// need to make future variables
function displayForecastWeather(data) {
  for (i = 6; i <= 38; i += 8) {
    let kelvin = data.list[i].main.temp;
    let fahrenheit = 1.8 * (kelvin - 273) + 32;
    let iconCode = data.list[i].weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

    let dateEl = document.createElement("li");
    let tempEl = document.createElement("li");
    let iconEl = document.createElement("img");
    let windEl = document.createElement("li");
    let humidityEl = document.createElement("li");

    let dateString = data.list[i].dt_txt;
    let date = moment(dateString);

    dateEl.textContent = date.format("ddd MM/DD/YYYY");
    tempEl.textContent = "Temperature: " + fahrenheit.toFixed(2) + " °F";
    iconEl.setAttribute("src", iconUrl);
    windEl.textContent = "wind: " + data.list[i].wind.speed + " MPH";
    humidityEl.textContent = "Humidity: " + data.list[i].main.humidity + " %";

    $("#forecast" + i).append(dateEl);
    $("#forecast" + i).append(tempEl);
    $("#forecast" + i).append(iconEl);
    $("#forecast" + i).append(windEl);
    $("#forecast" + i).append(humidityEl);
  }
}

function saveToLS(data) {
  localStorage.setItem(data.name, data.name);
}

function loadFromLS() {
  searchInput.value(localStorage.getItem(data.main, data.main));
}

function createHistoryBtn() {
  for (var i = 0; i < localStorage.length; i++) {
    const historyButton = document.getElementById("history");
    const btn = document.createElement("button");
    btn.setAttribute("id", "btn");
    btn.innerHTML = localStorage.getItem(localStorage.key(i));
    historyButton.appendChild(btn);
  }
}

//event listeners

searchBtn.addEventListener("click", getCity);
