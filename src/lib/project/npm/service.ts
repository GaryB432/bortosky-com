import { error } from "@sveltejs/kit";
import type { Packument } from "./packument";

// TODO add cache
export class Service {
  public async getPackage(name: string): Promise<Packument | undefined> {
    console.log("asking for ", name);
    const response = await fetch(`https://registry.npmjs.org/${name}`);
    const paramPkg = (await response.json()) as Packument & { error: string };

    if (paramPkg.error) {
      error(404, paramPkg.error);
    }

    return paramPkg;
  }
}
