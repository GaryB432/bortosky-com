/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models.ts" />
/// <reference path="services.ts" />
namespace Controllers {

    export interface ITheaterScope extends ng.IScope {
        shows: IProduction[]
    }

    export class TheaterCtrl {
        constructor($scop: ITheaterScope, data: ProductionDataService) {
            data.getProductions()
                .then((shows) => $scop.shows = shows)
                .catch((status) => window.alert(status));
        }
    }
}

angular.module("app.controllers", ["app.services"])
    .controller("TheaterCtrl", ["$scope", "ProductionDataService", Controllers.TheaterCtrl]);
