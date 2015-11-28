/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../source/gary/js/services" />
/// <reference path="../source/gary/js/models" />
// thanks http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html
// https://raw.githubusercontent.com/yearofmoo/fitc-rtec-angularjs-demo/master/test/unit/homePagesSpec.js

describe('testing Math service', function () {
    var svc: MathService;

    beforeEach(function () {
        angular.mock.module('app.services');

        inject(function (_MathService_: MathService) {
            svc = _MathService_;
        });
    });

    it('should add properly.', function () {
        expect(svc.add(3, -1)).toEqual(2);
    });
});

describe('ProductionDataService', function () {
    var svc: ProductionDataService;

    beforeEach(function () {
        angular.mock.module('app.services');

        inject(function (_ProductionDataService_: ProductionDataService) {
            svc = _ProductionDataService_;
        });
    });

    it('should get shows properly.', function () {

        inject(($httpBackend: ng.IHttpBackendService) => {
            $httpBackend.expect('GET', 'theater.json')
                .respond(200, '{ "producers": [{"name": "P1","productions": [{ "show": "S1", "opening": "1999-11-12T20:00:00-06:00", "role": "R1" },{ "show": "S2", "opening": "2005-11-11T20:00:00-06:00", "role": "R2" }]},{"name": "P2","productions": [{ "show": "S3", "opening": "2010-07-30T20:00:00-05:00", "role":"R3" }]}] }');

            var expectedShows = [
                { show: 'S1', opening: new Date('1999-11-12T20:00:00-06:00'), producer: 'P1', role: 'R1' },
                { show: 'S2', opening: new Date('2005-11-11T20:00:00-06:00'), producer: 'P1', role: 'R2' },
                { show: 'S3', opening: new Date('2010-07-30T20:00:00-05:00'), producer: 'P2', role: 'R3' }
            ];

            svc.getProductions().then((resultShows) => {
                expect(resultShows).toEqual(expectedShows);
            });

            $httpBackend.flush();

        });
    });
});

describe('array flattener',() => {
    it('should flatten correctly',() => {
        expect(Utilities.flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

