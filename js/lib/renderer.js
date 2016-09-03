FCast.Renderer = (() => {
    return {
        /**
         * @param  {DOM Element} Dom node to render the app into
         * @param  {Object:Component} Root Component
         */
        init(mount, root) {
            root.children && root.children.forEach(child =>
                mount.appendChild(child.DOM)
            );
        },

        /**
         * @param  {Object:Component} Rerenders the given component
         */
        render(component) {
            const el = document.getElementById(component.id);
            el.parentNode.replaceChild(component.DOM, el);
        }
    }
})();
