(function () {
    "use strict";

    angular
        .module("public")
        .config(routeConfig);


    routeConfig.$inject = ["$stateProvider"];

    function routeConfig($stateProvider) {
        $stateProvider
            .state("public", {
                abstract: true,
                templateUrl: "src/public/public.html"
            })
            .state("public.home", {
                url: "/",
                templateUrl: "src/public/home/home.html"
            })
            .state("public.signup", {
                url: "/signup",
                templateUrl: "src/public/signup/signup.html",
                controller: "SignUpController",
                controllerAs: "signUpCtrl"
            })
            .state("public.myinfo", {
                url: "/myinfo",
                templateUrl: "src/public/myinfo/myinfo.html",
                controller: "MyInfoController",
                controllerAs: "myInfoCtrl",
                resolve: {
                    userDetails: ["SignUpService", function (SignUpService) {
                        return SignUpService.getUserData();
                    }],
                    userFavouriteDish: ["SignUpService", "MenuService", function (SignUpService, MenuService) {
                        var favouriteDishNumber;

                        try {
                            favouriteDishNumber = SignUpService.getFavouriteDishNumber();
                        } catch (error) {
                            return null;
                        }

                        if (favouriteDishNumber) {
                            return MenuService.getMenuItem(favouriteDishNumber);
                        }

                        return null;
                    }]
                }
            })
            .state("public.menu", {
                url: "/menu",
                templateUrl: "src/public/menu/menu.html",
                controller: "MenuController",
                controllerAs: "menuCtrl",
                resolve: {
                    menuCategories: ["MenuService", function (MenuService) {
                        return MenuService.getCategories();
                    }]
                }
            })
            .state("public.menuitems", {
                url: "/menu/{category}",
                templateUrl: "src/public/menu-items/menu-items.html",
                controller: "MenuItemsController",
                controllerAs: "menuItemsCtrl",
                resolve: {
                    menuItems: ["$stateParams", "MenuService", function ($stateParams, MenuService) {
                        return MenuService.getMenuItems($stateParams.category);
                    }]
                }
            });
    }
}());
