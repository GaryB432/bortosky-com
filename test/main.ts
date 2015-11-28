/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../source/gary/js/services" />
/// <reference path="../source/gary/js/models" />
// thanks http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html
// https://raw.githubusercontent.com/yearofmoo/fitc-rtec-angularjs-demo/master/test/unit/homePagesSpec.js

xdescribe('testing Math service', function() {
    var svc: MathService;

    beforeEach(function() {
        angular.mock.module('app.services');

        inject(function(_MathService_: MathService) {
            svc = _MathService_;
        });
    });

    it('should add properly.', function() {
        expect(svc.add(3, -1)).toEqual(2);
    });
});

xdescribe('DataService', function() {
    var svc: DataService;

    beforeEach(function() {
        angular.mock.module('app.services');

        inject(function(_DataService_: DataService) {
            svc = _DataService_;
        });
    });

    it('should get theater profile properly.', function() {

        inject(($httpBackend: ng.IHttpBackendService) => {
            $httpBackend.expect('GET', 'theater.json')
                .respond(200, '{ "producers": [{"name": "P1","productions": [{ "show": "S1", "opening": "1999-11-12T20:00:00-06:00", "role": "R1" },{ "show": "S2", "opening": "2005-11-11T20:00:00-06:00", "role": "R2" }]},{"name": "P2","productions": [{ "show": "S3", "opening": "2010-07-30T20:00:00-05:00", "role":"R3" }]}] }');

            svc.getData().then((profile) => {
                expect(profile.producers.length).toEqual(2);
            });

            $httpBackend.flush();

        });
    });
});

class FakeDataService implements IDataService {
    constructor(private $q: ng.IQService) { }

    getData() {
        let d = this.$q.defer<TheaterProfile>();
        d.resolve({
            producers: [{ name: "hi", productions: [{ show: "S1", opening: "2002", role: "R1" }] }]
        });
        return d.promise;
    }
}

describe('TheaterService', () => {
    let scope: ng.IRootScopeService;
    let bs: TheaterService;
    let result: IProduction[];
    beforeEach(function() {
        //angular.mock.module('app.services');

        inject(function($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            bs = new TheaterService(new FakeDataService($q));
            scope = $rootScope;
        });
    });
    it('should get productions', () => {
        bs.getProductions().then((productions) => {
            result = productions;
        });
        scope.$apply();
        expect(result.length).toEqual(1);
    });
});


describe('array flattener', () => {
    it('should flatten correctly', () => {
        expect(Utilities.flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

