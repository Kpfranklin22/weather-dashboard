var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementById("searchInput");
var apiKey = "8a42d43f7d7dc180da5b1e51890e67dc";
var cityName = document.getElementById("cityName");
var temp = document.getElementById("temp");
// functions

function getCity() {
  var city = searchInput.value;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
    });
}

function displayCurrentWeather(data) {
  cityName.textContent = data.name;
  temp.textContent = "Temperature: " + data.main.temp;
}
function displayForecastWeather() {}
function saveToLS() {}
function loadFromLS() {}
function createHistroyBtn() {}

//event listeners

searchBtn.addEventListener("click", getCity);
