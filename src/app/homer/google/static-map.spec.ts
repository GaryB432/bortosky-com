import { StaticMap } from './static-map';

describe('StaticMap', () => {
  it('should create an instance', () => {
    expect(new StaticMap()).toBeTruthy();
  });

  it('should stringify coords', () => {
    expect(
      StaticMap.stringifyCoords({
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        latitude: 1.23456789,
        longitude: 9.87654321,
        speed: 0,
      })
    ).toBe('1.234568,9.876543');
  });

  it('should make url', () => {
    expect(
      StaticMap.makeUrl('https://example.com', {
        moar: ['A&B', 'C|D', 'E'],
        stuff: '4',
      })
    ).toBe('https://example.com?moar=A%26B&moar=C%7CD&moar=E&stuff=4');
  });
});
