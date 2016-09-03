FCast.Root = (() => {
    const RootComponent = new FCast.Component();

    RootComponent.children = [
        FCast.components.Dropdown,
        FCast.components.Forecast,
        FCast.components.Details
    ];

    return RootComponent;
})();