export class Chalk {
  private static colors = {
    black: '\u001b[30m',
    blackBright: '\u001b[30;1m',
    blue: '\u001b[34m',
    blueBright: '\u001b[34;1m',
    cyan: '\u001b[36m',
    cyanBright: '\u001b[36;1m',
    green: '\u001b[32m',
    greenBright: '\u001b[32;1m',
    magenta: '\u001b[35m',
    magentaBright: '\u001b[35;1m',
    red: '\u001b[31m',
    redBright: '\u001b[31;1m',
    white: '\u001b[37m',
    whiteBright: '\u001b[37;1m',
    yellow: '\u001b[33m',
    yellowBright: '\u001b[33;1m',
  };
  public black(s: string): string {
    return this.postReset(Chalk.colors.black, s);
  }
  public blackBright(s: string): string {
    return this.postReset(Chalk.colors.blackBright, s);
  }
  public blue(s: string): string {
    return this.postReset(Chalk.colors.blue, s);
  }
  public blueBright(s: string): string {
    return this.postReset(Chalk.colors.blueBright, s);
  }
  public green(s: string): string {
    return this.postReset(Chalk.colors.green, s);
  }
  public greenBright(s: string): string {
    return this.postReset(Chalk.colors.greenBright, s);
  }
  public magenta(s: string): string {
    return this.postReset(Chalk.colors.magenta, s);
  }
  public magentaBright(s: string): string {
    return this.postReset(Chalk.colors.magentaBright, s);
  }
  public red(s: string): string {
    return this.postReset(Chalk.colors.red, s);
  }
  public redBright(s: string): string {
    return this.postReset(Chalk.colors.redBright, s);
  }
  public white(s: string): string {
    return this.postReset(Chalk.colors.white, s);
  }
  public whiteBright(s: string): string {
    return this.postReset(Chalk.colors.whiteBright, s);
  }
  public yellow(s: string): string {
    return this.postReset(Chalk.colors.yellow, s);
  }
  public yellowBright(s: string): string {
    return this.postReset(Chalk.colors.yellowBright, s);
  }
  private postReset(color: string, s: string): string {
    return `${color}${s}\u001b[0m`;
  }
}
