import { GDate } from './gdate';

describe('GDate', () => {
  it('strings', () => {
    expect(new GDate(1, 2, 3, 4, 5).toString()).toEqual('0001-02-03T04:05Z');
    expect(new GDate(1959, 5, 20, 2, 25).toString()).toEqual(
      '1959-05-20T02:25Z'
    );
    expect(GDate.create('19590520T0225Z').toString()).toEqual(
      '1959-05-20T02:25Z'
    );
  });
  it('adds', () => {
    const nd = new GDate(1959, 5, 20, 2, 25).addMinutes(20);
    expect(nd.toString()).toEqual('1959-05-20T02:45Z');
  });
  it('carries hours', () => {
    const nd = new GDate(1959, 5, 20, 2, 25).addMinutes(40);
    expect(nd.toString()).toEqual('1959-05-20T03:05Z');
  });

  it('carries days', () => {
    const nd = new GDate(1959, 5, 20, 2, 25).addMinutes(24 * 60);
    expect(nd.toString()).toEqual('1959-05-21T02:25Z');
  });
});
