let cityName = document.querySelector("#city-name")
let cityHistory = document.querySelector("#city-history")
let weatherDisplay = document.getElementById("#weather-display")
let searchButton = document.getElementById("search-button");

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
            cityTemp.innerHTML = "Temperature: " + response.main.temp +" °F"

            let cityHumidity = document.querySelector("#humidity")
            cityHumidity.innerHTML = "Humidity: " + response.main.humidity + "%"

            let cityWind = document.querySelector("#wind")
            cityWind.innerHTML = "Wind Speed: " + response.wind.speed + " MPH"

            let cityWeather = document.querySelector("#weather")
            cityWeather.innerHTML = "Current Weather: " + response.weather[0].description

           

            return latLon(response.coord.lat, response.coord.lon);



        })
        .then(function (response){
            return response.json();
        })
        .then(function (response) {
            console.log(response);

            let uvIndex = document.querySelector("#uv")
            uvIndex.innerHTML = "UV Index: " + response.current.uvi
        })
        .catch(function (error){
            console.log(error);
        });
}

function latLon(lat, lon) {
    return fetch(

        "https://api.openweathermap.org/data/2.5/onecall?"

        +

        "lat=" + lat +

        "&lon=" + lon +

        "&appid=8bed639fd98c9152d287e65173b6a1c7"
        
    ) 
}


function buttonPress() {

    console.log(cityName.value)


    weatherFetch(cityName.value);

}

searchButton.addEventListener("click", buttonPress)

