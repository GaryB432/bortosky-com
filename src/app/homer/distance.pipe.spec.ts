import { DistancePipe } from './distance.pipe';

describe('DistancePipe', () => {
  it('create an instance', () => {
    const pipe = new DistancePipe();
    expect(pipe).toBeTruthy();
  });
  it('convert to km', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(1000, 'km')).toBe('1.00');
  });
  it('convert to mi', () => {
    const pipe = new DistancePipe();
    expect(pipe.transform(1609.344, 'mi')).toBe('1.00');
  });
});
