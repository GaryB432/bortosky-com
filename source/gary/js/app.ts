/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models" />

/* tslint:disable:typedef */

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
    interface IChartModel {
        element: HTMLElement;
        years: IAnnualCount[];
    }

    export class Viz {
        private started: Promise<string>;

        private infoAccepted: Promise<IChartModel>;

        public start(): void {
            this.started = new Promise<string>((resolve, reject) => {
                google.load("visualization", "1.0", { packages: ["corechart"] });
                google.setOnLoadCallback(() => {
                    console.log("started");
                    resolve("ready");
                });
            });
            console.log("starting....");
            this.draw();
        }
        public acceptData(elem: HTMLElement, years: IAnnualCount[]): void {
            this.infoAccepted = new Promise<IChartModel>((resolve, reject) => {
                resolve({ element: elem, years: years });
            });
            this.draw();
        }
        private draw(): void {
            this.started.then((r) => {
                console.log(r);
                if (this.infoAccepted) {
                    this.infoAccepted.then((j) => {
                        j.element.innerText = j.years.length.toString();
                        console.log(j);
                        console.log(this.createDataTable(j.years));
                    });
                } else {
                    console.log("no data");
                }
            });
        }
        private createDataTable(years: IAnnualCount[]): google.visualization.DataTable {
            let data: google.visualization.DataTable = new google.visualization.DataTable();
            data.addColumn("string", "Year");
            data.addColumn("number", "Shows");
            data.addRows(years.map((y: IAnnualCount) => [y.year, y.count]));
            return data;
        }
    }
}

declare var outsideAngularViz: Google.Viz;
