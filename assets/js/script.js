function weatherFetch(){
    fetch(
        // make a fetch request to the weather API
        'https://api.openweathermap.org/data/2.5/weather?q='
        +
        // search term
        'Salt Lake City&'
        +
        // api key
        'appid=8bed639fd98c9152d287e65173b6a1c7'
    )
    .then(function(){
        return
    })
}

weatherFetch();