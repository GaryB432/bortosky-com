import { GDate } from './gdate';

describe('GDate', () => {
  it('strings', () => {
    expect(new GDate(1, 2, 3, 4, 5).toString()).toEqual('00010203T0405Z');
    expect(new GDate(1959, 5, 20, 2, 25).toString()).toEqual(
      '19590520T0225Z'
    );
    expect(GDate.create('19590520T0225Z').toString()).toEqual(
      '19590520T0225Z'
    );
  });
  it('adds', () => {
    const nd = new GDate(1959, 5, 20, 2, 25).addMinutes(20);
    expect(nd.toString()).toEqual('19590520T0245Z');
  });
  it('carries hours', () => {
    const nd = new GDate(1959, 5, 20, 2, 25).addMinutes(40);
    expect(nd.toString()).toEqual('19590520T0305Z');
  });

  it('carries days', () => {
    const nd = new GDate(1959, 5, 20, 2, 25).addMinutes(24 * 60);
    expect(nd.toString()).toEqual('19590521T0225Z');
  });
});
