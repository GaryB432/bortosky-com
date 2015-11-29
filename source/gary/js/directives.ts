/// <reference path="../../../typings/tsd.d.ts" />
namespace Directives {

    "use strict";

    export class Factory {

        public static RoleDirective(): ng.IDirective {
            return {
                restrict: "A",
                templateUrl: "templates/directives/role.html"
            };
        }

    }

}

angular.module("app.directives", [])
    .directive("gbRole", Directives.Factory.RoleDirective);
