import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { GeoService } from './geo.service';
import { Info, Location } from './models';

@Injectable()
export class HomerService {
  constructor(private geo: GeoService, private data: DataService) {}
  public readInfo(): Promise<Info> {
    return this.data.readInfo();
  }
  public writeInfo(info: Info): void {
    this.data.writeInfo(info);
  }

  public async getCurrentLocation(): Promise<Location> {
    return this.geo.getCurrentLocation();
  }

  public getMapUrl(home: Coordinates, current: Coordinates) {
    return this.geo.getMapUrl(home, current);
  }

  public computeDistanceBetween(
    from: Coordinates,
    to: Coordinates,
    radius?: number
  ) {
    return this.geo.computeDistanceBetween(from, to, radius);
  }
}
