(function () {
    "use strict";

    angular
        .module("public")
        .component("menuItem", {
            templateUrl: "src/public/menu-item/menu-item.html",
            bindings: {
                menuItem: "<"
            },
            controller: MenuItemController
        });


    MenuItemController.$inject = ["API_BASE_URL"];

    function MenuItemController(API_BASE_URL) {
        var $ctrl = this;

        $ctrl.basePath = API_BASE_URL;
    }
}());
