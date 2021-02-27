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
        // api key
        '&appid=8bed639fd98c9152d287e65173b6a1c7'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            console.log(response.name)

            let citySearch = document.querySelector("#city-search")

            citySearch.innerHTML = response.name;

            // additional data

        })


    let cityResult = document.createElement('h2');





}

function buttonPress() {

    console.log(cityName.value)


    weatherFetch(cityName.value);

}

searchButton.addEventListener("click", buttonPress)

