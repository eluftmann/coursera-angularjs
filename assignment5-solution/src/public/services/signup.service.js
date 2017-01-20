(function () {
    "use strict";

    angular
        .module("public")
        .service("SignUpService", SignUpService);


    /**
     * Used to store and track information about the signed up user.
     * This is intended to be injected any time we need some user metadata
     * or to find out if the user has signed up.
     */
    function SignUpService() {
        var service = this,
            data = null;

        service.signUp = function (firstName, lastName, emailAddress, phoneNumber, favouriteDishNumber) {
            data = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber,
                favouriteDishNumber: favouriteDishNumber
            };
        };

        service.hasSignedUp = function () {
            return !!data;
        };

        service.getFirstName = function () {
            if (!service.hasSignedUp()) {
                throw "User has not signed up";
            }

            return data.firstName;
        };

        service.getLastName = function () {
            if (!service.hasSignedUp()) {
                throw "User has not signed up";
            }

            return data.lastName;
        };

        service.getEmailAddress = function () {
            if (!service.hasSignedUp()) {
                throw "User has not signed up";
            }

            return data.emailAddress;
        };

        service.getPhoneNumber = function () {
            if (!service.hasSignedUp()) {
                throw "User has not signed up";
            }

            return data.phoneNumber;
        };

        service.getFavouriteDishNumber = function () {
            if (!service.hasSignedUp()) {
                throw "User has not signed up";
            }

            return data.favouriteDishNumber;
        };
    }
}());
