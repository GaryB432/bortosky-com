export class Vector {
  public readonly x: number = 0;
  public readonly y: number = 0;
  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public get svgstr(): string {
    return `${this.x},${this.y}`;
  }

  public static create(x: number, y: number): Vector {
    return new Vector(x, y);
  }
}
