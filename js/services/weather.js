FCast.WeatherService = (() => {
    const key = 'e191ab5bf4f600d009196b020796edde';
    const dayCount = 7;

    function getUrl(name) {
        return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${name}&cnt=${dayCount}&appid=${key}&units=metric`;
    }

    /**
     * Fetch the forecast given the city name
     * @param  {Object} 
     * @return {Promise}
     */
    function fetchData({ name }) {
        return fetch(getUrl(name))
            .then(data => data.json());
    }

    return { fetchData };
})();