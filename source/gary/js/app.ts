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
    interface IChartModel {
        element: HTMLElement;
        years: IAnnualCount[];
    }

    enum MapLoadState {
        READY,
        NOT_READY
    }

    export class Viz {
        private started: Promise<MapLoadState>;

        private infoAccepted: Promise<IChartModel>;

        private columnChartOptions: google.visualization.ColumnChartOptions = {
            legend: { position: "none" },
            title: "Productions by Year",
            vAxis: {
                format: "0"
            }
        };

        public start(): void {
            this.started = new Promise<MapLoadState>((resolve: (value?: MapLoadState) => void, reject: (error?: any) => void) => {
                google.load("visualization", "1.0", { packages: ["corechart"] });
                google.setOnLoadCallback(() => {
                    console.log("started");
                    resolve(MapLoadState.READY);
                });
            });
            console.log("starting...");
            this.draw();
        }
        public acceptData(elem: HTMLElement, years: IAnnualCount[]): void {
            this.infoAccepted = new Promise<IChartModel>((resolve: (value?: IChartModel) => void, reject: (error?: any) => void) => {
                resolve({ element: elem, years: years });
            });
            this.draw();
        }
        private draw(): void {
            this.started.then((state: MapLoadState) => {
                console.log(MapLoadState[state]);
                if (this.infoAccepted) {
                    this.infoAccepted.then((data: IChartModel) => {
                        console.log(data);
                        let chart: google.visualization.ColumnChart = new google.visualization.ColumnChart(data.element);
                        chart.draw(this.createDataTable(data.years), this.columnChartOptions);
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
