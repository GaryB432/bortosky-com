/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../source/gary/js/services" />
/// <reference path="../source/gary/js/models" />

/* tslint:disable variable-name */

const PROFILE: TheaterProfile = {
    producers: [
        {
            name: "P1",
            productions: [
                { opening: "2001-02-03T20:00:00-05:00", role: "R1", show: "S1" },
                { opening: "2004-02-03T20:00:00-05:00", role: "R2", show: "S2" },
                { opening: "2003-02-03T20:00:00-05:00", role: "R3", show: "S3" },
            ]
        },
        {
            name: "P2",
            productions: []
        },
        {
            name: "P3",
            productions: [
                { opening: "2001-02-03T20:00:00-05:00", role: "R4", show: "S4" },
                { opening: "2004-02-03T20:00:00-05:00", role: "R5", show: "S5" },

            ]
        }]
};

describe("testing Math service", () => {
    let svc: MathService;

    beforeEach(() => {
        angular.mock.module("app.services");

        inject((_MathService_: MathService) => {
            svc = _MathService_;
        });
    });

    it("should add properly.", () => {
        expect(svc.add(3, -1)).toEqual(2);
    });
});

describe("DataService", () => {
    let svc: DataService;

    beforeEach(() => {
        angular.mock.module("app.services");

        inject((_DataService_: DataService) => {
            svc = _DataService_;
        });
    });

    it("should get theater profile properly.", () => {

        inject(($httpBackend: ng.IHttpBackendService) => {

            $httpBackend.expect("GET", "theater.json").respond(200, angular.toJson(PROFILE));

            svc.getData().then((profile: Dto.IProfile) => {
                expect(profile).toEqual(PROFILE);
            });
            $httpBackend.flush();

        });
    });
});

class FakeDataService implements IDataService {
    constructor(private $q: ng.IQService) { }

    public getData(): ng.IPromise<Dto.IProfile> {
        let d: ng.IDeferred<TheaterProfile> = this.$q.defer<TheaterProfile>();
        d.resolve(PROFILE);
        return d.promise;
    }
}

describe("TheaterService", () => {
    let scope: ng.IRootScopeService;
    let svc: TheaterService;
    let resultingProductions: IProduction[];
    let yrs: IAnnualCount[];
    beforeEach(() => {
        inject(($rootScope: ng.IRootScopeService, $q: ng.IQService) => {
            svc = new TheaterService(new FakeDataService($q));
            scope = $rootScope;
        });
    });
    it("should get productions", () => {
        svc.getProductions().then((productions: IProduction[]) => {
            resultingProductions = productions;
        });
        scope.$apply();
        expect(resultingProductions.length).toEqual(5);
    });
    it("should get annuals", () => {
        svc.getYears().then((years: IAnnualCount[]) => {
            yrs = years;
        });
        scope.$apply();
        expect(yrs).toEqual([
            { count: 0, year: "1999" },
            { count: 0, year: "2000" },
            { count: 2, year: "2001" },
            { count: 0, year: "2002" },
            { count: 1, year: "2003" },
            { count: 2, year: "2004" },
        ]);
    });
});

describe("array flattener", () => {
    it("should flatten correctly", () => {
        expect(Utilities.flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

