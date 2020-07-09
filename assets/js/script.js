
// weather api
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=

// my api key
// 22b9a0b55690d6f460e09b867c2777d1


// variables
var currentDay = moment().format("MM-DD-YYYY");
var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("cityBox");

// when user clicks search button
searchButton.addEventListener("click", citySearch)

// retunrns city weather data
function citySearch() {
    var user = document.getElementById("userInput");
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ user.value + "&appid=22b9a0b55690d6f460e09b867c2777d1")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        cityInfo(data);
    });

}

function cityInfo(weatherData) {
    var city = document.getElementById("cityName");
    city.textContent = weatherData.name + " " + "(" + currentDay + ")";
    var temp = document.getElementById("temperature");
    temp.textContent = "Temperature:" + weatherData.main.temp;
}
