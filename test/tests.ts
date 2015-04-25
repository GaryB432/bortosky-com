/// <reference path="../typings/tsd.d.ts" />
// thanks http://www.benlesh.com/2013/06/angular-js-unit-testing-services.html
// https://raw.githubusercontent.com/yearofmoo/fitc-rtec-angularjs-demo/master/test/unit/homePagesSpec.js

describe('testing Math service', function () {
    var svc: MathService;

    beforeEach(function () {
        module('app.services');

        inject(function (_MathService_: MathService) {
            svc = _MathService_;
        });
    });

    it('should add properly.', function () {
        expect(svc.add(3, -1)).toEqual(2);
    });
});

describe('array flattener',() => {
    it('should flatten correctly',() => {
        expect(Utilities.flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

