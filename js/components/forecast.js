FCast.components.Forecast = (() => {
    let forecastData = [];

    const listeners = [
        {
            type: 'click',
            cb(e) {
                const elToCapture = e.target.closest('.day');
                if (elToCapture) {
                    const idx = +elToCapture.id.match(/\d/)[0];
                    FCast.Dispatcher.inform('day:change', forecastData[idx]);
                }
            }
        }
    ];

    function createDOM() {
        return `
            <div class="wrapper">
                ${forecastData
                    .map((day,i) =>
                        `<div class="day" id=${'day-' + i}>
                            <h4>
                                ${FCast.Utils.formatDate(day.dt)}
                            </h4>
                            <div>
                                <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather-icon" />
                                <div class="temp">${day.temp.day + '°C'}</div>
                            </div>
                        </div>`
                    )
                    .join('')
                }
            </div>
        `;
    }

    const Forecast = new FCast.Component('forecast', createDOM(), listeners);

    FCast.Dispatcher.subscribe('weather:fetched', weatherData => {
        forecastData = weatherData.list;
        Forecast.update(createDOM());
        FCast.Dispatcher.inform('day:change', forecastData[0]);
    });

    return Forecast;
})();