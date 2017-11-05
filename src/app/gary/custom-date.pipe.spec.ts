import { inject, TestBed } from '@angular/core/testing';

import { CustomDatePipe } from './custom-date.pipe';

describe('Custom Date Pipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CustomDatePipe, useClass: CustomDatePipe }],
    });
  });

  it(
    'should transform to something',
    inject([CustomDatePipe], (sut: CustomDatePipe) => {
      expect(sut.transform(new Date(), 'long')).toBeDefined();
    })
  );

  it(
    'should throw on bad fmt',
    inject([CustomDatePipe], (sut: CustomDatePipe) => {
      expect(() => sut.transform(new Date(), 'wtf')).toThrow(
        new Error('fmt wtf is unrecognized.')
      );
    })
  );
});
