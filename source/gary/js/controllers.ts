/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models.ts" />
/// <reference path="services.ts" />
namespace Controllers {

    "use strict";

    export interface ITheaterCtrl {
        shows: IProduction[];
        annualReport: IAnnualCount[];
    }

    export interface ITheaterScope extends ng.IScope, ITheaterCtrl {
    }

    export class TheaterCtrl implements ITheaterCtrl {
        public shows: IProduction[];

        public annualReport: IAnnualCount[];

        constructor($scop: ITheaterScope, svc: TheaterService) {
            svc.getProductions()
                .then((shows: IProduction[]) => this.shows = shows)
                .catch((status: any) => window.alert(status));
            svc.getYears()
                .then((years: IAnnualCount[]) => this.annualReport = years)
                .catch((status: any) => window.alert(status));
        }
    }
}

angular.module("app.controllers", ["app.services"])
    .controller("TheaterCtrl", ["$scope", "TheaterService", Controllers.TheaterCtrl]);
