
// weather api
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=

// my api key
// 22b9a0b55690d6f460e09b867c2777d1


// variables
var currentDay = moment().format("MM-DD-YYYY");
var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("cityBox");
var user = document.getElementById("userInput");

cityArray = [];

  





// returns city weather data
function citySearch() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ user.value + "&appid=22b9a0b55690d6f460e09b867c2777d1")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        cityInfo(data);
    });

   cityHistory();



}

function cityHistory() {
    if (user.value === null) {
        searchHistory = [user.value];
    }
    cityArray.push(user.value);
    console.log(cityArray);

    localStorage.setItem("city", JSON.stringify(cityArray));  

    var list = document.querySelector(".list-group");

    for (var i = 0; i < cityArray.length; i++) {
        var newLiEl = document.createElement("li");

        newLiEl.textContent = cityArray[i].
        list.appendChild(newLiEl);
        newLiEl.classList.add("list-group-item");
        
    }

}



// add info to current city weather info
function cityInfo(weatherData) {
    var city = document.getElementById("cityName");
    city.textContent = weatherData.name + " " + "(" + currentDay + ")";
    var temp = document.getElementById("temperature");
    temp.textContent = "Temperature:" + " " + (Math.round(((weatherData.main.temp * 9/5) - 459.67))) + " " + "°F";
    var humid = document.getElementById("humidity");
    humid.textContent = "Humidity:" + " " + weatherData.main.humidity + "%";
    var wind = document.getElementById("windspeed");
    wind.textContent = "Wind Speed:" + " " + (Math.round(weatherData.wind.speed / .44704)) + " " + "MPH";
    var uv = document.getElementById("uvindex");

}



// when user clicks search button
searchButton.addEventListener("click", citySearch)