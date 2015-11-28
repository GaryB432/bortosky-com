/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models.ts" />
namespace Utilities {
    export function flatten<T>(arrays: T[][]): T[] {
        var merged: T[] = [];
        return merged = merged.concat.apply(merged, arrays);
    }

}

interface IDataService {
    getData(): ng.IPromise<TheaterProfile>
}

class MathService {
    add(addend1: number, addend2: number) {
        return addend1 + addend2;
    }
}

type TheaterProfile = Dto.IProfile;

class DataService implements IDataService {
    private profileDeferred: ng.IDeferred<TheaterProfile>;

    constructor($q: ng.IQService, $http: ng.IHttpService) {
        this.profileDeferred = $q.defer<TheaterProfile>();

        $http.get("theater.json")
            .success((profile: TheaterProfile) => { this.profileDeferred.resolve(profile); })
            .error((result, status) => this.profileDeferred.reject(status));
    }
    getData(): ng.IPromise<TheaterProfile> {
        return this.profileDeferred.promise;
    }

}

class TheaterService {
    constructor(private dataSvc: IDataService) {
    }

    getProductions(): ng.IPromise<IProduction[]> {
        return this.dataSvc.getData().then((d) =>
            Utilities.flatten(d.producers.map((producer) => producer.productions.map((show) => {
                return <IProduction>{
                    show: show.show,
                    opening: new Date(show.opening),
                    producer: producer.name,
                    role: show.role
                };
            })))
        );
    }
}

angular.module('app.services', [])
    .service('MathService', MathService)
    .service('DataService', ["$q", "$http", DataService])
    .service('TheaterService', ["DataService", TheaterService]);
