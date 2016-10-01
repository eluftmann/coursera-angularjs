(function () {
    "use strict";

    angular
        .module("NarrowItDownApp", [])
        .service("MenuSearchService", MenuSearchService)
        .directive("foundItems", FoundItemsDirective)
        .controller("NarrowItDownController", NarrowItDownController)
        .constant("API_BASE_URL", "https://davids-restaurant.herokuapp.com");


    MenuSearchService.$inject = ["$filter", "$q", "$http", "API_BASE_URL"];

    function MenuSearchService($filter, $q, $http, API_BASE_URL) {
        var service = this;

        var filterItems = $filter('filter');

        service.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer();

            $http.get(API_BASE_URL + "/menu_items.json").then(
                function success(response) {
                    deferred.resolve(filterItems(response.data.menu_items, {description: searchTerm}));
                }
            );

            return deferred.promise;
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
        }
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
