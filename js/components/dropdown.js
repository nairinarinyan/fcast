FCast.components.Dropdown = (() => {
    const cities = [
        {
            name: 'Gyumri',
            value: 'gyumri'
        },
        {
            name: 'Vanadzor',
            value: 'vanadzor'
        },
        {
            name: 'Goris',
            value: 'goris'
        },
        {
            name: 'Paris',
            value: 'paris'
        },
        {
            name: 'Tokyo',
            value: 'tokyo'
        }
    ];   

    const listeners = [
        {
            type: 'change',
            cb(e) {
                const city = cities.find(city => city.value === e.target.value);
                FCast.Dispatcher.inform('city:change', city);
            }
        }
    ];

    function createDOM() {
        return `
            <div>
                <select name="city-selector">
                    ${cities.map(city => `<option value=${city.value}>${city.name}</option>`)}
                </select>
            </div>
        `;
    }

    const Dropdown = new FCast.Component('dropdown', createDOM(), listeners);

    FCast.Dispatcher.subscribe('city:fetched', city => {
        if (city) {
            cities.unshift(city);
        }
        
        Dropdown.update(createDOM());
        FCast.Dispatcher.inform('city:change', city || cities[0]);
    });

    return Dropdown;
})();
