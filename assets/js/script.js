
// weather api
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=

// my api key
// 22b9a0b55690d6f460e09b867c2777d1


// variables
var currentDay = moment().format("MM-DD-YYYY");
var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("cityBox");
var user = document.getElementById("userInput");

var cityArray = [];


// 5 day forecast var
var day2 = moment().add(1, "days").format("L");
var day3 = moment().add(2, "days").format("L");
var day4 = moment().add(3, "days").format("L");
var day5 = moment().add(4, "days").format("L");
var day6 = moment().add(5, "days").format("L");



// returns city weather data
function citySearch() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + user.value + "&appid=22b9a0b55690d6f460e09b867c2777d1")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            cityInfo(data);
        });

    cityHistory();
    fiveDay();

}

function cityHistory() {
    if (user.value === null) {
        user.value == true
    }
    cityArray.push(user.value);
    console.log(cityArray);

    localStorage.setItem("city", JSON.stringify(cityArray));
    cityArray = JSON.parse(localStorage.getItem("city"));


    var list = document.querySelector(".list-group");
    list.innerHTML = "";

    for (var i = 0; i < cityArray.length; i++) {
        var newLiEl = document.createElement("li");

        list.appendChild(newLiEl);
        newLiEl.classList.add("list-group-item");
        newLiEl.innerHTML = cityArray[i]
        console.log(newLiEl);
    }

}



// add info to current city weather info
function cityInfo(weatherData) {
    var city = document.getElementById("cityName");
    city.textContent = weatherData.name + " " + "(" + currentDay + ") " + "<img src=' http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png'>";
    var temp = document.getElementById("temperature");
    temp.textContent = "Temperature:" + " " + (Math.round(((weatherData.main.temp * 9 / 5) - 459.67))) + " " + "°F";
    var humid = document.getElementById("humidity");
    humid.textContent = "Humidity:" + " " + weatherData.main.humidity + "%";
    var wind = document.getElementById("windspeed");
    wind.textContent = "Wind Speed:" + " " + (Math.round(weatherData.wind.speed / .44704)) + " " + "MPH";
    var uv = document.getElementById("uvindex");

}

// 5 day weather forecast

function fiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + user.value + "&appid=22b9a0b55690d6f460e09b867c2777d1")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            fiveDayForecast(data);
        });

}

function fiveDayForecast(forecast) {
    console.log(forecast);

        var date2 = document.getElementById("day-2");
        date2.textContent = day2;
        var temp2 = document.getElementById("temp-2")
        temp2.textContent = "Temp: " + forecast.list[0].main.temp + " " + "F";
 
  
       


        var date3 = document.getElementById("day-3");
        date3.textContent = day3;
 



        var date4 = document.getElementById("day-4");
        date4.textContent = day4;
    



        var date5 = document.getElementById("day-5");
        date5.textContent = day5;



        var date6 = document.getElementById("day-6");
        date6.textContent = day6;


       

    
}





// when user clicks search button
searchButton.addEventListener("click", citySearch)