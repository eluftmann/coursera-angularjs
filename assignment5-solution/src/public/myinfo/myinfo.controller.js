(function () {
    "use strict";

    angular
        .module("public")
        .controller("MyInfoController", MyInfoController);


    MyInfoController.$inject = ["userDetails", "userFavouriteDish"];

    function MyInfoController(userDetails, userFavouriteDish) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.userDetails = userDetails;
            $ctrl.userFavouriteDish = userFavouriteDish;
        };
    }
}());
