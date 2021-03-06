FCast.components.Details = (() => {
    let dayDetails;

    function createDOM() {
        return dayDetails ? `
            <div class="container">
                <div>
                    <div>
                        <img src="https://openweathermap.org/img/w/${dayDetails.weather[0].icon}.png" alt="weather-icon" />
                    </div>
                    <div class="heading">
                        <h2>
                            ${FCast.Utils.formatDate(dayDetails.dt)}
                        </h2>
                    </div>
                </div>

                <div>
                    <div>
                        ${dayDetails.weather[0].description}
                    </div>
                </div>

                <div class="details">
                    <ul>
                        <li>Clouds - ${dayDetails.clouds}</li>
                        <li>Humidity - ${dayDetails.humidity}</li>
                    </ul>
                </div>

                <div id="temp-change">
                    <h3>Temperature change during the day</h3>
                    <div class="canvas-wrapper">
                        <canvas id="analytics" height="150"></canvas>
                    </div>
                </div>

            </div>
        ` : '';
    }

    /**
     * Initializes canvas on every update. Not the best way, but works
     */
    function initCanvas() {
        const canvas = document.getElementById('analytics');
        const width = Math.min(window.innerWidth - 30, 600);
        canvas.style.width = width + 'px';
        canvas.style.height = 150 + 'px';

        canvas.width = window.devicePixelRatio * width;
        canvas.height = window.devicePixelRatio * canvas.height;
        const ctx = canvas.getContext('2d');

        const { morn, day, eve, night } = dayDetails.temp;

        draw(ctx, canvas.width, [morn, day, eve, night]);
    }

    /**
     * Given the list of temperatures, draws a line between them on an even-spaced distance
     * @param  {Object} 
     * @param  {Array}
     */
    function draw(ctx, width, temps) {
        const gutter = width / 3;
        const height = 150 * window.devicePixelRatio;
        const textVerticalMargin = 10 * window.devicePixelRatio;
        const textHorizontalMargin = 40 * window.devicePixelRatio;

        const minT = -40;
        const maxT = 40;

        ctx.beginPath();
        ctx.lineWidth = 3 * window.devicePixelRatio;
        ctx.strokeStyle = '#44AF69';
        ctx.font = 14 * window.devicePixelRatio + 'px Merriweather Sans';

        temps.forEach((t, i) => {
            const method = !i ? 'moveTo' : 'lineTo';

            let x = i * gutter;
            let y = lerp(t, minT, maxT);
            y = height - y * height;

            let textX = x;

            if (i === temps.length - 1) {
                textX -= textHorizontalMargin;
            } else if (i) {
                textX -= textHorizontalMargin / 2;
            }

            ctx.fillText(t, textX, y - textVerticalMargin);
            ctx[method](x, y);
        });

        ctx.stroke();
    }

    /**
     * Interpolate value between [0, 1] given min and max
     * @param  {Number} value
     * @param  {Number} min 
     * @param  {Number} max 
     * @return {Number}    
     */
    function lerp(value, min, max) {
        return value / (max - min) + .5;
    }

    const Details = new FCast.Component('details', createDOM());

    FCast.Dispatcher.subscribe('day:change', day => {
        dayDetails = day;
        Details.update(createDOM());
        initCanvas();
    });

    return Details;
})();