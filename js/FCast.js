const FCast = (() => {
    /**
     * @param  {DOM Element} Dom node to render the app into
     * @param  {Object:Component} Root Component
     */
    function init(mount, root) {
        FCast.Renderer.init(mount, root);
    }

    return { init };
})();

window.FCast = window.FCast || FCast;
