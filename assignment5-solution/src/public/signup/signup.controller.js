(function () {
    "use strict";

    angular
        .module("public")
        .controller("SignUpController", SignUpController);


    SignUpController.$inject = ["SignUpService"];

    function SignUpController(SignUpService) {
        var $ctrl = this;

        $ctrl.signUp = function () {
            SignUpService.signUp(
                $ctrl.firstName,
                $ctrl.lastName,
                $ctrl.emailAddress,
                $ctrl.phoneNumber,
                $ctrl.favouriteDishNumber
            );

            $ctrl.formSubmitted = true;
        };

        $ctrl.$onInit = function () {
            $ctrl.formSubmitted = false;

            if (SignUpService.hasSignedUp()) {
                $ctrl.firstName = SignUpService.getFirstName();
                $ctrl.lastName = SignUpService.getLastName();
                $ctrl.emailAddress = SignUpService.getEmailAddress();
                $ctrl.phoneNumber = SignUpService.getPhoneNumber();
                $ctrl.favouriteDishNumber = SignUpService.getFavouriteDishNumber();
            }
        };
    }
}());
