export class Vector {
  public readonly x: number = 0;
  public readonly y: number = 0;
  public constructor(x: number, y: number) {
    this.x = x;
    this.x = y;
  }
  public static create(x: number, y: number) {
    return new Vector(x, y);
  }
}
