FCast.Utils = (() => {
    /**
     * @param  {Number} Unix timestamp from the api
     * @return {String} Nice formatted date
     */
    function formatDate(timestamp) {
        let date = new Date(timestamp * 1000);
        const year = date.getFullYear();

        date = date.toUTCString();
        return date.slice(0, date.indexOf(year) + 4);
    }

    return { formatDate };
})();