(function () {
    "use strict";

    angular
        .module("ShoppingListCheckOff", [])
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService)
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController);


    function ShoppingListCheckOffService() {
        var service = this;

        // It is always reasonable to start a shopping list with a decent amount of cookies :)
        var toBuyItems = [
            {name: "cookies", quantity: 40},
            {name: "chocolate cookies", quantity: 20},
            {name: "oatmeal cookies", quantity: 10},
            {name: "fudge cookies", quantity: 10},
            {name: "ginger cookies", quantity: 6},
            {name: "fortune cookies", quantity: 2}
        ];
        var boughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };

        service.buyItem = function (buyItemIndex) {
            var item = toBuyItems.splice(buyItemIndex, 1)[0];
            boughtItems.push(item);
        };
    }


    ToBuyController.$inject = ["ShoppingListCheckOffService"];

    function ToBuyController(ShoppingListCheckOffService) {
        var vm = this;

        vm.items = ShoppingListCheckOffService.getToBuyItems();

        vm.buy = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }


    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var vm = this;

        vm.items = ShoppingListCheckOffService.getBoughtItems();
    }
}());
