import { Injectable } from '@angular/core';
import { Info } from './models';

const KEY: string = 'HOMER';

@Injectable()
export class DataService {
  public readInfo(): Promise<Info> {
    const info = localStorage.getItem(KEY);
    return new Promise<Info>((resolve, reject) => {
      if (info) {
        resolve(JSON.parse(info));
      } else {
        reject('no data');
      }
    });
  }
  public writeInfo(info: Info): void {
    localStorage.setItem(KEY, JSON.stringify(info));
  }
}
