(function () {
    "use strict";

    angular
        .module("public")
        .directive("dishShortName", DishShortNameDirective);


    DishShortNameDirective.$inject = ["$q", "MenuService"];

    function DishShortNameDirective($q, MenuService) {
        return {
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                ctrl.$asyncValidators.dishShortName = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // Consider empty model invalid
                        return $q.reject();
                    }

                    return MenuService.getMenuItem(modelValue);
                };
            }
        };
    }
}());
