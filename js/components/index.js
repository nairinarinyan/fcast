FCast.Component = (() => {
    /**
     * @param  {String} Composing the dom element from the passed string
     * @param  {Number} Component ID
     * @return {Object}
     */
    function initDOM(str, id) {
        const el = document.createElement('div');
        el.innerHTML = str ? str.trim().replace(/\s+/g, ' ') : '';
        el.id = id;
        return el;
    }

    /**
     * @param  {Object} Dom element of the component, we are attaching the event listeners to it
     * @param  {Array} Array of listeners
     */
    function initListeners({ DOM, listeners }) {
        listeners.forEach(listener => 
            DOM.addEventListener(listener.type, listener.cb)
        )
    }

    class Component {
        /**
         * @param  {Number}
         * @param  {String}
         * @param  {Array}
         */
        constructor(id, DOM, listeners) {
            this.id = id;
            this.DOM = initDOM(DOM, id);
            this.listeners = listeners;
            this.listeners && initListeners(this);
        }

        /**
         * @param  {String}
         */
        update(DOM) {
            this.DOM = initDOM(DOM, this.id);
            FCast.Renderer.render(this);
            this.listeners && initListeners(this);
        }
    }

    FCast.components = {};
    return Component;
})();
