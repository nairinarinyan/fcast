FCast.GeoService = (() => {
    const key = 'AIzaSyDcO42TVYHXiQqGOWvRAiQgOSWdwoLMrMg';

    /**
     * @param  {Number}
     * @param  {Number}
     * @return {String}
     */
    function getUrl({ latitude, longitude }) {
        return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}&language=en`
    }

    /**
     * @param  {Object}
     * @return {Object}
     */
    function findCity({ results }) {
        const components = results[0].address_components;
        const name = components[components.length - 2].short_name;

        return {
            name,
            value: name.toLowerCase()
        };
    }

    /**
     * Figure out user's position in an async fashion
     * @param  {Function}
     * @param  {Function}
     */
    function getCurrentCity(cb, errCb) {
        navigator.geolocation.getCurrentPosition(({ coords }) =>
            fetch(getUrl(coords))
                .then(data => data.json())
                .then(findCity)
                .then(cb)
        , errCb);
    }

    return { getCurrentCity };
})();