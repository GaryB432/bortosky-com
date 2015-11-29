/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models.ts" />
/// <reference path="services.ts" />
namespace Controllers {
    
    export interface ITheaterCtrl {
        shows: IProduction[]
    }

    export interface ITheaterScope extends ng.IScope, ITheaterCtrl {
    }

    export class TheaterCtrl implements ITheaterCtrl {
        shows: IProduction[]
        
        constructor($scop: ITheaterScope, private data: TheaterService) {
            this.data.getProductions()
                .then((shows) => this.shows = shows)
                .catch((status) => window.alert(status));
        }
    }
}

angular.module("app.controllers", ["app.services"])
    .controller("TheaterCtrl", ["$scope", "TheaterService", Controllers.TheaterCtrl]);
