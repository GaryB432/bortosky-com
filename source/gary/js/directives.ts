/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models" />
/// <reference path="app" />

/* tslint:disable:typedef */

namespace Directives {

    "use strict";

    export class Factory {

        public static RoleDirective(): ng.IDirective {
            return {
                restrict: "A",
                templateUrl: "templates/directives/role.html"
            };
        }

        public static ProductionChartDirective($q: ng.IQService): ng.IDirective {
            return {
                link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {
                    scope.$watch("years", (newValue: IAnnualCount[]) => {
                        if (newValue) {
                            outsideAngularViz.acceptData(element.children()[0], newValue);
                        }
                    });
                },
                restrict: "E",
                scope: { years: "=" },
                template: "<div />"
            };
        }
    }

}

angular.module("app.directives", [])
    .directive("gbRole", Directives.Factory.RoleDirective)
    .directive("productionChart", ["$q", Directives.Factory.ProductionChartDirective]);
