(function () {
    "use strict";

    angular
        .module("MenuApp")
        .controller("MenuDetailController", MenuDetailController);


    MenuDetailController.$inject = ["items"];

    function MenuDetailController(items) {
        var $ctrl = this;

        $ctrl.items = items;
    }
}());
