FCast.Controller = (() => {
    FCast.GeoService.getCurrentCity(city => {
        FCast.Dispatcher.inform('city:fetched', city)
    }, () => {
        FCast.Dispatcher.inform('city:fetched', null);
    });

    FCast.Dispatcher.subscribe('city:change', city => {
        FCast.WeatherService.fetchData(city).then(data =>
            FCast.Dispatcher.inform('weather:fetched', data)
        );
    });
})();