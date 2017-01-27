(function () {
    "use strict";

    angular
        .module("NarrowItDownApp", [])
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItemsDirective)
        .controller("NarrowItDownController", NarrowItDownController)
        .constant("API_BASE_URL", "https://davids-restaurant.herokuapp.com");


    MenuSearchService.$inject = ["$filter", "$http", "API_BASE_URL"];

    function MenuSearchService($filter, $http, API_BASE_URL) {
        var service = this;

        var filterItems = $filter('filter');

        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get(API_BASE_URL + "/menu_items.json").then(
                function success(response) {
                    return filterItems(response.data.menu_items, {description: searchTerm});
                }
            );
        };
    }


    function FoundItemsDirective() {
        return {
            restrict: "E",
            templateUrl: "templates/foundItems.template.html",
            transclude: {
                'noResults': '?noResults'
            },
            scope: {
                items: "<",
                onRemove: "&"
            },
            controller: function () {},
            controllerAs: "$ctrl",
            bindToController: true
        };
    }


    NarrowItDownController.$inject = ["MenuSearchService"];

    function NarrowItDownController(MenuSearchService) {
        var vm = this;

        vm.searchTerm = "";
        vm.found = null;

        vm.search = function () {
            if (!vm.searchTerm) {
                vm.found = [];
                return;
            }

            MenuSearchService.getMatchedMenuItems(vm.searchTerm).then(
                function success(found) {
                    vm.found = found;
                },
                function failure(response) {
                    console.log(response);
                }
            );
        };

        vm.discardItem = function (itemIndex) {
            vm.found.splice(itemIndex, 1);
        };
    }
}());
