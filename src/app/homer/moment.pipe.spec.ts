import { MomentPipe } from './moment.pipe';

describe('MomentPipe', () => {
  it('says a few seconds ago', () => {
    const pipe = new MomentPipe();
    expect(pipe.transform(Number(new Date()))).toBe('a few seconds ago');
  });
});
