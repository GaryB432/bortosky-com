/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="models.ts" />
namespace Utilities {

    "use strict";

    export function flatten<T>(arrays: T[][]): T[] {
        let merged: T[] = [];
        return merged = merged.concat.apply(merged, arrays);
    }

}

interface IDataService {
    getData(): ng.IPromise<TheaterProfile>;
}

class MathService {
    public add(addend1: number, addend2: number): number {
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
            .error((result: any, status: any) => this.profileDeferred.reject(status));
    }
    public getData(): ng.IPromise<TheaterProfile> {
        return this.profileDeferred.promise;
    }

}

class TheaterService {
    constructor(private dataSvc: IDataService) {
    }

    public static toAnnualReport(productions: IProduction[]): IAnnualCount[] {
        type IYearMap = { [year: string]: number; };

        let years: IAnnualCount[] = [];

        let mapped: IYearMap = productions
            .map((p: IProduction) => {
                return p.opening.getFullYear().toFixed();
            })
            .reduce<IYearMap>(
            (map: IYearMap, year: string) => {
                if (year in map) {
                    map[year]++;
                } else {
                    map[year] = 1;
                }
                return map;
            },
            {});

        for (let year in mapped) {
            years.push({ count: mapped[year], year: year });
        }
        return years;
    }

    public getProductions(): ng.IPromise<IProduction[]> {
        return this.dataSvc.getData().then((d: TheaterProfile) =>
            Utilities.flatten(d.producers.map((producer: Dto.IProducer) => producer.productions.map((show: Dto.IProduction) => {
                return <IProduction>{
                    opening: new Date(show.opening),
                    producer: producer.name,
                    role: show.role,
                    show: show.show
                };
            })))
        );
    }

    public getYears(): ng.IPromise<IAnnualCount[]> {
        return this.getProductions().then((p: IProduction[]) => TheaterService.toAnnualReport(p));
    }
}

angular.module("app.services", [])
    .service("MathService", MathService)
    .service("DataService", ["$q", "$http", DataService])
    .service("TheaterService", ["DataService", TheaterService]);
