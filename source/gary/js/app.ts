/// <reference path="../../../typings/tsd.d.ts" />

angular.module(
    "app",
    [
        "ngRoute",
        "app.services",
        "app.controllers",
        "app.directives"
    ]).config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider): void => {
        $routeProvider
            .when("/", { templateUrl: "templates/states/main.html" })
            .when("/theater", { controller: "TheaterCtrl", controllerAs: "vm", templateUrl: "templates/states/theater.html" })
            .otherwise({ redirectTo: "/" });
    }]);
