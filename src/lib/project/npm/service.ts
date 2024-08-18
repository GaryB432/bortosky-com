import type { Packument } from "./packument";

export interface IService {
  getPackage(name: string): Promise<Packument | undefined>;
}

export class Service implements IService {
  public async getPackage(name: string): Promise<Packument | undefined> {
    return new Promise<Packument | undefined>((resolve) => {
      fetch(this.registryUrl(name)).then((res) => {
        if (res.ok) {
          res.json().then((pack: Packument) => {
            resolve(pack);
          });
        } else {
          resolve(undefined);
        }
      });
    });
  }

  private registryUrl(name: string): string | URL | Request {
    return `https://registry.npmjs.org/${name}`;
  }
}
