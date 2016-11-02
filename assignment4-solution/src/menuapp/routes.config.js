(function () {
    "use strict";

    angular
        .module("MenuApp")
        .config(RoutesConfig);


    RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "src/menuapp/templates/home.template.html"
            })
            .state("menu", {
                url: "/menu",
                templateUrl: "src/menuapp/templates/menu.template.html",
                controller: "MenuController as $ctrl",
                resolve: {
                    items: ["MenuDataService", function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state("menu.detail", {
                url: "/{categoryShortName}",
                templateUrl: "src/menuapp/templates/menu-detail.template.html",
                controller: "MenuDetailController as $ctrl",
                resolve: {
                    items: ["$stateParams", "MenuDataService", function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
                }
            });
    }
}());
