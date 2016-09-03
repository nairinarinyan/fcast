FCast.Dispatcher = (() => {
    let listeners = {};

    function unsubscribe(topic, id) {
        const i = listeners[topic].findIndex(id);
        listeners.splice(i, 1);
    }

    return {
        /**
         * @param  {String} topic one's insterested to subscribe
         * @param  {Function} callback
         * @param  {Object} scope to call the callback with
         * @return {Function} easy way to unsubscribe
         */
        subscribe(topic, cb, scope) {
            !listeners[topic] && (listeners[topic] = []);

            const subscribtion = {
                id: Date.now(),
                cb, scope
            };

            listeners[topic].push(subscribtion);
            return unsubscribe.bind(this, topic, subscribtion.id);
        },

        /**
         * @param  {String}
         * @param  {Object} Data to dispatch
         */
        inform(topic, data) {
            listeners[topic].forEach(({ cb, scope }) =>
                cb.call(scope, data)
            );
        }
    };
})();