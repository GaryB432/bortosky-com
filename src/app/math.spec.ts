import { adder, parse } from './math';

describe('adder', () => {
  it('adds', () => {
    expect(adder(1, 2, 3)).toEqual(6);
  });
  it('parses', () => {
    expect(parse('1,2,3')).toEqual([1, 2, 3]);
  });
});
