(function () {
    "use strict";

    angular
        .module("common")
        .service("MenuService", MenuService);


    MenuService.$inject = ["$http", "API_BASE_URL"];

    function MenuService($http, API_BASE_URL) {
        var service = this;

        service.getCategories = function () {
            return $http.get(API_BASE_URL + "/categories.json")
                        .then(function (response) { return response.data.categories; });
        };

        service.getMenuItems = function (category) {
            var config = {};

            if (category) {
                config.params = {category: category};
            }

            return $http.get(API_BASE_URL + "/menu_items.json", config)
                        .then(function (response) { return response.data; });
        };

        service.getMenuItem = function (shortName) {
            return $http.get(API_BASE_URL + "/menu_item/" + shortName + ".json")
                        .then(function (response) { return response.data; });
        };
    }
}());
