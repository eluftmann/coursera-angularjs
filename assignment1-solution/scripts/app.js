(function () {
    "use strict";

    angular
        .module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController);


    LunchCheckController.$inject = ["$scope"];

    function LunchCheckController($scope) {
        var LUNCH_MENU_ITEMS_LIMIT = 3;

        $scope.lunchMenu = "";
        $scope.message = "";
        $scope.validationStateClass = "";

        $scope.checkLunchMenu = function () {
            // Filter out empty items (e.g. ", ," or ",,") from `lunchMenu`
            var lunchMenuArray = $scope.lunchMenu.split(",")
                                                 .filter(function (item) { return item.trim(); });

            if (lunchMenuArray.length === 0) {
                $scope.message = "Please enter data first";
                $scope.validationStateClass = "has-error";
                return;
            }

            $scope.message = (lunchMenuArray.length <= LUNCH_MENU_ITEMS_LIMIT) ? "Enjoy!" : "Too much!";
            $scope.validationStateClass = "has-success";
        };
    }
}());
