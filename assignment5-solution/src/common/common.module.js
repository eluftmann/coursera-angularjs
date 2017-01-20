(function () {
    "use strict";

    angular
        .module("common", [])
        .constant("API_BASE_URL", "https://angularjs-restaurant-server.appspot.com")
        .config(config);


    config.$inject = ["$httpProvider"];

    function config($httpProvider) {
        $httpProvider.interceptors.push("loadingHttpInterceptor");
    }
}());
