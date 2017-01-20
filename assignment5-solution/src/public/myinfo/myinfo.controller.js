(function () {
    "use strict";

    angular
        .module("public")
        .controller("MyInfoController", MyInfoController);


    MyInfoController.$inject = ["API_BASE_URL", "MenuService", "SignUpService"];

    function MyInfoController(API_BASE_URL, MenuService, SignUpService) {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.apiBaseUrl = API_BASE_URL;

            $ctrl.hasSignedUp = SignUpService.hasSignedUp();
            if ($ctrl.hasSignedUp) {
                $ctrl.firstName = SignUpService.getFirstName();
                $ctrl.lastName = SignUpService.getLastName();
                $ctrl.emailAddress = SignUpService.getEmailAddress();
                $ctrl.phoneNumber = SignUpService.getPhoneNumber();
                $ctrl.favouriteDishNumber = SignUpService.getFavouriteDishNumber();

                MenuService.getMenuItem($ctrl.favouriteDishNumber).then(function (item) {
                    $ctrl.favouriteDish = item;
                });
            }
        };
    }
}());
