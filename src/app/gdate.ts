function d(n: number, length: number) {
  const tmp = new Array(10).fill('0').concat(String(n)).join('');
  return tmp.slice(tmp.length - length);
}

function d2(n: number) {
  return d(n, 2);
}
function d4(n: number) {
  return d(n, 4);
}

export class GDate {
  constructor(
    public year: number,
    public month: number,
    public day: number,
    public hour: number,
    public minute: number
  ) {}

  public toString(): string {
    const d = [d4(this.year), d2(this.month), d2(this.day)].join('-');
    const t = [d2(this.hour), d2(this.minute)].join(':');
    return `${d}T${t}Z`;
  }
  public static create(): GDate {
    return new GDate(0, 0, 0, 0, 0);
  }
}

interface YMD {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
}
