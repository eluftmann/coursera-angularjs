(function () {
    "use strict";

    angular
        .module("data")
        .service("MenuDataService", MenuDataService);


    MenuDataService.$inject = ["$http", "API_BASE_URL"];

    function MenuDataService($http, API_BASE_URL) {
        var service = this;

        service.getAllCategories = function () {
            return $http.get(API_BASE_URL + "/categories.json")
                        .then(function (response) { return response.data; });
        };

        service.getItemsForCategory = function (categoryShortName) {
            return $http.get(API_BASE_URL + "/menu_items.json", {params: {category: categoryShortName}})
                        .then(function (response) { return response.data.menu_items; });
        };
    }
}());
