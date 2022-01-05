function zf(n: number, length = 2) {
  const tmp = new Array(length).fill('0').concat(String(n)).join('');
  return tmp.slice(tmp.length - length);
}

export class GDate {
  public constructor(
    public year: number,
    public month: number,
    public day: number,
    public hour: number,
    public minute: number
  ) {}

  public static create(tmz: string): GDate {
    const parts = [
      tmz.slice(0, 4),
      tmz.slice(4, 6),
      tmz.slice(6, 8),
      tmz.slice(9, 11),
      tmz.slice(11, 13),
    ].map((p) => Number(p));
    return new GDate(parts[0], parts[1], parts[2], parts[3], parts[4]);
  }

  public addMinutes(m: number): this {
    this.minute += m;
    while (this.minute > 59) {
      this.hour += 1;
      this.minute -= 60;
    }
    while (this.hour > 23) {
      this.day += 1;
      this.hour -= 24;
    }
    return this;
  }

  public toString(): string {
    const d = [zf(this.year, 4), zf(this.month), zf(this.day)].join('');
    const t = [zf(this.hour), zf(this.minute), zf(0)].join('');
    return `${d}T${t}Z`;
  }
}
