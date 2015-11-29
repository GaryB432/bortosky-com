/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models.ts" />
/// <reference path="services.ts" />
namespace Controllers {

    export interface ITheaterCtrl {
        shows: IProduction[],
        annualReport: IAnnualCount[]
    }

    export interface ITheaterScope extends ng.IScope, ITheaterCtrl {
    }

    export class TheaterCtrl implements ITheaterCtrl {
        shows: IProduction[]

        annualReport: IAnnualCount[]

        constructor($scop: ITheaterScope, private svc: TheaterService) {
            this.svc.getProductions()
                .then((shows) => this.shows = shows)
                .catch((status) => window.alert(status));
            this.svc.getYears()
                .then((years) => this.annualReport = years)
                .catch((status) => window.alert(status));
        }
    }
}

angular.module("app.controllers", ["app.services"])
    .controller("TheaterCtrl", ["$scope", "TheaterService", Controllers.TheaterCtrl]);
