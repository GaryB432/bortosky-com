import { GDate } from './gdate';

describe('GDate', () => {
  it('strings', () => {
    expect(new GDate(1, 2, 3, 4, 5).toString()).toEqual('0001-02-03T04:05Z');
    expect(new GDate(1959, 5, 20, 2, 25).toString()).toEqual(
      '1959-05-20T02:25Z'
    );
  });
});
