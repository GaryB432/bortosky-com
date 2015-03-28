module Utilities {
    export function flatten(arrays: any[]): any[] {
        var merged: any[] = [];
        return merged = merged.concat.apply(merged, arrays);
    }

}

class MathService {
    add(addend1: number, addend2: number) {
        return addend1 + addend2;
    }
}

class ProductionDataService {
    private productionDeferred: ng.IDeferred<IProduction[]>;

    constructor($q: ng.IQService, $http: ng.IHttpService) {
        this.productionDeferred = $q.defer<IProduction[]>();

        $http.get("producers.json")
            .success((producers: Dto.IProducer[]) => {
                this.productionDeferred.resolve(Utilities.flatten(producers.map((producer) => producer.productions.map((show) => {
                    return <IProduction>{
                        show: show.show,
                        opening: new Date(show.opening),
                        producer: producer.name,
                        role: show.role
                    };
                }))));
            })
            .error((result, status) => this.productionDeferred.reject(status));
    }

    getProductions(): ng.IPromise<IProduction[]> {
        return this.productionDeferred.promise;
    }
}

angular.module('app.services', [])
    .service('MathService', MathService)
    .service('ProductionDataService', ["$q", "$http", ProductionDataService]);
