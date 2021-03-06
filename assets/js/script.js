let cityName = document.querySelector("#city-name")
let weatherDisplay = document.getElementById("#weather-display")
let searchButton = document.getElementById("search-button");
city = [];

function weatherFetch(city) {

    fetch(
        // make a fetch request to the weather API
        'https://api.openweathermap.org/data/2.5/weather?q='
        +
        // search term
        city
        +
        // key
        '&units=imperial&appid=8bed639fd98c9152d287e65173b6a1c7'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            // console.log(response);
            // console.log(response.name)

            let citySearch = document.querySelector("#city-search")

            citySearch.innerHTML = '<h2> ' + response.name + ' (' + new Date().toLocaleString() + ')</h2><img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png" />'


            // additional data

            let cityTemp = document.querySelector("#temperature")
            cityTemp.innerHTML = "Temperature: " + response.main.temp + " °F"

            let cityHumidity = document.querySelector("#humidity")
            cityHumidity.innerHTML = "Humidity: " + response.main.humidity + "%"

            let cityWind = document.querySelector("#wind")
            cityWind.innerHTML = "Wind Speed: " + response.wind.speed + " MPH"

            let cityWeather = document.querySelector("#weather")
            cityWeather.innerHTML = "Current Weather: " + response.weather[0].description + '<img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png" />'



            return latLon(response.coord.lat, response.coord.lon);

            // set city name in local storage







        }
        )
        .then(function (response) {
            return response.json();

        })




        // 5 day forecast one call fetch response & UV index

        .then(function (response) {
            console.log(response);

            let uvIndex = document.querySelector("#uv")
            uvIndex.innerHTML = "UV Index: " + response.current.uvi
            if (response.current.uvi <= 2) {
                // low UV index
                uvIndex.classList.remove("bad")
                uvIndex.classList.remove("moderate")
                uvIndex.classList.add("good")

            } else if (response.current.uvi > 3 && response.current.uvi < 7) {
                // moderate UV index
                uvIndex.classList.remove("bad")
                uvIndex.classList.remove("good")
                uvIndex.classList.add("moderate")

            } else if (response.current.uvi > 7) {
                // high UV index
                uvIndex.classList.add("bad")
                uvIndex.classList.remove("good")
                uvIndex.classList.remove("moderate")
            }


            // 5 day forecast

            // day one temperature
            let dayOneTemp = document.querySelector("#temperature-one")
            dayOneTemp.innerHTML = "Temperature: " + response.daily[0].temp.day + " °F" + '<img src="http://openweathermap.org/img/w/' + response.daily[0].weather[0].icon + '.png" />'
            // day one humidity
            let dayOneWet = document.querySelector("#humidity-one")
            dayOneWet.innerHTML = "Humidity: " + response.daily[0].humidity + " %"
            // day one wind speed
            let dayOneWind = document.querySelector("#wind-one")
            dayOneWind.innerHTML = "Wind Speed: " + response.daily[0].wind_speed + " MPH"
            // day one UV index
            let dayOneUV = document.querySelector("#uv-one")
            dayOneUV.innerHTML = "UV Index: " + response.daily[0].uvi

            // day two? same thing?? DRY??????

            function dayForecast(index, date) {

                let day = document.querySelector("#date-" + date)
                day.innerHTML = new Date(response.daily[index].dt * 1000).toLocaleDateString();

                let dayTemp = document.querySelector("#temperature-" + date)
                dayTemp.innerHTML = "Temperature: " + response.daily[index].temp.day + " °F" + '<img src="http://openweathermap.org/img/w/' + response.daily[index].weather[0].icon + '.png" />'
                // day two humidity
                let dayWet = document.querySelector("#humidity-" + date)
                dayWet.innerHTML = "Humidity: " + response.daily[index].humidity + " %"
                // day Two wind speed
                let dayWind = document.querySelector("#wind-" + date)
                dayWind.innerHTML = "Wind Speed: " + response.daily[index].wind_speed + " MPH"
                // day Two UV index
                let dayUV = document.querySelector("#uv-" + date)
                dayUV.innerHTML = "UV Index: " + response.daily[index].uvi

            }

            dayForecast(1, 2)
            dayForecast(2, 3)
            dayForecast(3, 4)
            dayForecast(4, 5)

            // city histories in local storage

             
        })
        .catch(function (error) {
            console.log(error);
        });
}

// uv index latitude and longitude

function latLon(lat, lon) {
    return fetch(

        "https://api.openweathermap.org/data/2.5/onecall?"

        +

        "lat=" + lat +

        "&lon=" + lon +

        "&units=imperial&appid=8bed639fd98c9152d287e65173b6a1c7"



    )

}

// function to add to local storage on button press

function buttonPress() {

    console.log(cityName.value)


    weatherFetch(cityName.value);

    let cityInput = document.getElementById("city-name")
    city.push(cityInput.value)

    localStorage.setItem('cityName', JSON.stringify(city))
    weatherFetch(cityInput.value)

    
let cityHistory = function () {
    cityHistory = document.querySelector("#city-ul")
    cityHistory.textContent = ""
        let cityList = JSON.parse(localStorage.getItem("cityName"))
    console.log(cityList)
    var i, len, text;
    for (i = 0, len = cityList.length, text = ''; i < len; i++) {

        text = cityList[i];
        let cities = document.createElement("li")
        cities.addEventListener("click", function (event) {
            weatherFetch(event.target.textContent)
        })
        cities.textContent = text
        cityHistory.appendChild(cities)
    }

}
cityHistory();

}





searchButton.addEventListener("click", buttonPress)
