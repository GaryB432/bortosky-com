/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models" />
angular.module("app", [
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

namespace Google {
    "use strict";
    export class Viz {
        private started: boolean = false;

        private element: HTMLElement;
        private years: IAnnualCount[];

        public start(): void {
            google.load("visualization", "1.0", { packages: ["corechart"] });
            google.setOnLoadCallback(() => {
                console.log("started");
                this.started = true;
                this.draw();
            });
            console.log("starting....");
        }
        public acceptData(elem: HTMLElement, years: IAnnualCount[]): void {
            elem.innerText = "TBD";
            this.element = elem;
            this.years = years;
            this.draw();
        }
        private createDataTable(years: IAnnualCount[]): google.visualization.DataTable {
            let data: google.visualization.DataTable = new google.visualization.DataTable();
            data.addColumn("string", "Year");
            data.addColumn("number", "Shows");
            data.addRows(years.map((y: IAnnualCount) => [y.year, y.count ]));
            return data;
        }
        private draw(): void {
            if (!this.started || this.years === void 0) {
                console.log("No charts for now");
            } else {
                let d: google.visualization.DataTable = this.createDataTable(this.years);
                console.log(this.years, d);
                this.element.innerText = this.years.length.toString();
            }
        }
    }
}

declare var outsideAngularViz: Google.Viz;
