(function () {
    "use strict";

    angular
        .module("common")
        .service("MenuService", MenuService);


    MenuService.$inject = ["$http", "API_BASE_URL"];

    function MenuService($http, API_BASE_URL) {
        var service = this;

        function buildMenuItemImageUrl(menuItem) {
            return [API_BASE_URL, "static/images/menu", menuItem.category_id, menuItem.short_name + ".jpg"].join("/");
        }

        function extendMenuItem(menuItem) {
            menuItem.imageUrl = buildMenuItemImageUrl(menuItem);
            return menuItem;
        }

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
                        .then(function (response) {
                            response.data.menu_items.forEach(extendMenuItem);
                            return response.data;
                        });
        };

        service.getMenuItem = function (shortName) {
            return $http.get(API_BASE_URL + "/menu_item/" + shortName + ".json")
                        .then(function (response) {
                            return extendMenuItem(response.data);
                        });
        };

        service.lookupMenuItem = function (shortName) {
            return $http.get(API_BASE_URL + "/menu_item/" + shortName + ".json");
        };
    }
}());
