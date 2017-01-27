describe("The menu service", function () {
    "use strict";

    var $httpBackend;
    var API_BASE_URL;
    var MenuService;

    var sampleMenuItem = {
        "category_id": "T",
        "short_name": "TEST_ITEM",
        "name": "Won Ton Soup with Chicken",
        "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
        "price_small": 2.55,
        "small_portion_name": "pint",
        "price_large": 5,
        "large_portion_name": "quart"
    };

    beforeEach(function () {
        // Load module
        module("common");

        // Load any dependencies
        inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            API_BASE_URL = $injector.get("API_BASE_URL");
            MenuService = $injector.get("MenuService");
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should successfully lookup existing menu item", function () {
        var shortName = "TEST_ITEM";

        $httpBackend.expectGET(API_BASE_URL + "/menu_item/" + shortName + ".json").respond(sampleMenuItem);
        MenuService.lookupMenuItem(shortName).then(function (response) {
            expect(response.data.short_name).toEqual(shortName);
        });
        $httpBackend.flush();
    });

    it("should fail to lookup non-existing menu item", function () {
        var shortName = "TEST_ITEM";

        $httpBackend.when("GET", API_BASE_URL + "/menu_item/" + shortName + ".json").respond(404, "");
        MenuService.lookupMenuItem(shortName).catch(function (response) {
            expect(response.status).toEqual(404);
        });
        $httpBackend.flush();
    });
});
