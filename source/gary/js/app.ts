/// <reference path="../../../typings/tsd.d.ts" />
angular.module("app",
    [
        "angulartics",
        "angulartics.google.analytics",
        "ngRoute",
        "app.services",
        "app.controllers",
        "app.directives"
    ]).config(["$routeProvider", "$analyticsProvider", ($routeProvider: ng.route.IRouteProvider, $analyticsProvider: any): void => {
        $routeProvider
            .when("/", { templateUrl: "templates/states/main.html" })
            .when("/about", { templateUrl: "templates/states/about.html" })
            .when("/theater", { templateUrl: "templates/states/theater.html", controller: "TheaterCtrl" })
            .otherwise({ redirectTo: "/" });
        $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
        $analyticsProvider.withAutoBase(true);  /* Records full path */
    }]);