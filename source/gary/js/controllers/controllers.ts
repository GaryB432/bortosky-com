module Controllers {

    export interface ITheaterScope extends ng.IScope {
        shows: IProduction[]
    }

    export class TheaterCtrl {
        constructor($scop: ITheaterScope, $http: ng.IHttpService) {


            $http.get("producers.json")
                .success((producers: Dto.IProducer[]) => {
                    var shows: IProduction[] = [];
                    producers.forEach((producer) => {
                        producer.productions.forEach((production) => {
                            shows.push({
                                show: production.show,
                                opening: new Date(production.opening),
                                producer: producer.name,
                                role: production.role
                            })
                        })
                    });
                    $scop.shows = shows;
                }).error((result, status) => window.alert(status));
        }

    }

}
    
angular.module("app.controllers", ["app.services"])
    .controller("TheaterCtrl", ["$scope", "$http", Controllers.TheaterCtrl]);