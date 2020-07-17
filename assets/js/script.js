
// weather api
//https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=

// my api key
// 22b9a0b55690d6f460e09b867c2777d1


// variables
var currentDay = moment().format("MM-DD-YYYY");
var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("cityBox");
var user = document.getElementById("userInput");
var uvIndex = document.getElementById("uvindex");

var cityArray = [];


// 5 day forecast var
var day2 = moment().add(1, "days").format("L");
var day3 = moment().add(2, "days").format("L");
var day4 = moment().add(3, "days").format("L");
var day5 = moment().add(4, "days").format("L");
var day6 = moment().add(5, "days").format("L");



// returns city weather data
function citySearch(cityname) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=22b9a0b55690d6f460e09b867c2777d1")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            cityInfo(data);
        });
    cityHistory(cityname);
    fiveDay(cityname);

}

function cityHistory(city) {
    if (user.value === "") {
        return
    }
    if (cityArray.includes(city)) {
        return
    }
    cityArray.push(user.value);
    console.log(cityArray);

    localStorage.setItem("city", JSON.stringify(cityArray));
    getCityHistory();

}

function getCityHistory() {
    cityArray = JSON.parse(localStorage.getItem("city"));
    if (!cityArray) {
        cityArray = [];
        return
    }

    var list = document.querySelector(".list-group");
    list.innerHTML = "";

    for (var i = 0; i < cityArray.length; i++) {
        var newLiEl = document.createElement("li");
        newLiEl.addEventListener("click", handleCityClick)

        newLiEl.classList.add("list-group-item");
        newLiEl.innerHTML = cityArray[i]
        list.appendChild(newLiEl);
        console.log(newLiEl);
    }
}

function handleCityClick(event) {
    var liCity = event.target.textContent
    citySearch(liCity)
}

/*// uv index



function cityUV(lon, lat, city) {
    fetch("https://api.openweathermap.org/data/2.5/uvi?q=" + user.value + "&appid=22b9a0b55690d6f460e09b867c2777d1" + "&lat=" + lat + "&lon=" + lon)
    .then(function (response) {
        return response.json()
    })
    .then(function (lon, lat, city) {
        displayUV(lon, lat, city);
    });

}
var lon = city.coord.lon;
var lat = city.coord.lat;
cityUV(lon, lat, user.value);

function displayUV(data) {
    var uv = data.value;
    if (uv >=6) {
        uvIndex.classList="badgebadge-danger"
        uvIndex.innerHTML=" " + uv + " ";
    }
}
*/

// add info to current city weather info
function cityInfo(weatherData) {

    var iconHTML = document.getElementById("icon");
    var icon = weatherData.weather[0].icon;
    var weatherIcon = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    iconHTML.setAttribute("src", weatherIcon);
    var city = document.getElementById("cityName");
    city.textContent = weatherData.name + " " + "(" + currentDay + ") ";
    var temp = document.getElementById("temperature");
    temp.textContent = "Temperature:" + " " + (Math.round(((weatherData.main.temp * 9 / 5) - 459.67))) + " " + "°F";
    var humid = document.getElementById("humidity");
    humid.textContent = "Humidity:" + " " + weatherData.main.humidity + "%";
    var wind = document.getElementById("windspeed");
    wind.textContent = "Wind Speed:" + " " + (Math.round(weatherData.wind.speed / .44704)) + " " + "MPH";
    var uv = document.getElementById("uvindex");

}

// 5 day weather forecast

function fiveDay(cityname) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&cnt=5&appid=22b9a0b55690d6f460e09b867c2777d1")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            fiveDayForecast(data);
        });

}

function fiveDayForecast(forecast) {
    console.log(forecast);

    for (var i = 0; i < 5; i++) {

        // 5 Day Forecast
        var five = document.getElementById("five");
        five.textContent = "5 Day Forecast:";

        var date2 = document.getElementById("day-2");
        date2.textContent = day2;
        var iconHTML2 = document.getElementById("day-2-icon");
        var icon2 = forecast.list[0].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + icon2 + "@2x.png";
        iconHTML2.setAttribute("src", weatherIcon);
        var temp2 = document.getElementById("temp-2")
        temp2.textContent = "Temp: " + (Math.round(((forecast.list[0].main.temp * 9 / 5) - 459.67))) + " " + "°F";
        var humid2 = document.getElementById("humid-2");
        humid2.textContent = "Humidity:" + " " + forecast.list[0].main.humidity + "%";


        var date3 = document.getElementById("day-3");
        date3.textContent = day3;
        var iconHTML3 = document.getElementById("day-3-icon");
        var icon3 = forecast.list[1].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + icon3 + "@2x.png";
        iconHTML3.setAttribute("src", weatherIcon);
        var temp3 = document.getElementById("temp-3")
        temp3.textContent = "Temp: " + (Math.round(((forecast.list[1].main.temp * 9 / 5) - 459.67))) + " " + "°F";
        var humid3 = document.getElementById("humid-3");
        humid3.textContent = "Humidity:" + " " + forecast.list[1].main.humidity + "%";

        var date4 = document.getElementById("day-4");
        date4.textContent = day4;
        var iconHTML4 = document.getElementById("day-4-icon");
        var icon4 = forecast.list[2].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + icon4 + "@2x.png";
        iconHTML4.setAttribute("src", weatherIcon);
        var temp4 = document.getElementById("temp-4")
        temp4.textContent = "Temp: " + (Math.round(((forecast.list[2].main.temp * 9 / 5) - 459.67))) + " " + "°F";
        var humid4 = document.getElementById("humid-4");
        humid4.textContent = "Humidity:" + " " + forecast.list[2].main.humidity + "%";

        var date5 = document.getElementById("day-5");
        date5.textContent = day5;
        var iconHTML5 = document.getElementById("day-5-icon");
        var icon5 = forecast.list[3].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + icon5 + "@2x.png";
        iconHTML5.setAttribute("src", weatherIcon);
        var temp5 = document.getElementById("temp-5")
        temp5.textContent = "Temp: " + (Math.round(((forecast.list[2].main.temp * 9 / 5) - 459.67))) + " " + "°F";
        var humid5 = document.getElementById("humid-5");
        humid5.textContent = "Humidity:" + " " + forecast.list[1].main.humidity + "%";

        var date6 = document.getElementById("day-6");
        date6.textContent = day6;
        var iconHTML6 = document.getElementById("day-6-icon");
        var icon6 = forecast.list[4].weather[0].icon;
        var weatherIcon = "https://openweathermap.org/img/wn/" + icon6 + "@2x.png";
        iconHTML6.setAttribute("src", weatherIcon);
        var temp6 = document.getElementById("temp-6")
        temp6.textContent = "Temp: " + (Math.round(((forecast.list[2].main.temp * 9 / 5) - 459.67))) + " " + "°F";
        var humid6 = document.getElementById("humid-6");
        humid6.textContent = "Humidity:" + " " + forecast.list[1].main.humidity + "%";


    }


}

function handleClick() {
    citySearch(user.value);
}

getCityHistory();



// when user clicks search button
searchButton.addEventListener("click", handleClick)
