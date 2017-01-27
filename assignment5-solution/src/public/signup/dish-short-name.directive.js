(function () {
    "use strict";

    angular
        .module("public")
        .directive("dishShortName", DishShortNameDirective);


    DishShortNameDirective.$inject = ["$q", "MenuService"];

    function DishShortNameDirective($q, MenuService) {
        return {
            require: "ngModel",
            link: function ($scope, element, attributes, ngModelController) {
                ngModelController.$asyncValidators.dishShortName = function (modelValue, viewValue) {
                    if (ngModelController.$isEmpty(modelValue)) {
                        // Consider empty model invalid
                        return $q.reject();
                    }

                    return MenuService.lookupMenuItem(modelValue);
                };
            }
        };
    }
}());
