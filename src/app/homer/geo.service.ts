import { Injectable } from '@angular/core';
import { Dms } from 'geodesy';

import { GoogleService } from './google/google.service';
import { StaticMap } from './google/static-map';
import { Location } from './models';

@Injectable()
export class GeoService {
  constructor(private goog: GoogleService) {}
  public async getCurrentPosition(): Promise<Position> {
    return new Promise<Position>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve({
            coords: {
              // hmmm native coords is flaky.. make a copy... spread op didn't work either :(
              accuracy: pos.coords.accuracy,
              altitude: pos.coords.altitude,
              altitudeAccuracy: pos.coords.altitudeAccuracy,
              heading: pos.coords.heading,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              speed: pos.coords.speed,
            },
            timestamp: pos.timestamp,
          });
        },
        e => {
          reject(e);
        },
        { enableHighAccuracy: true }
      );
    });
  }
  public computeDistanceBetween(
    from: Coordinates,
    to: Coordinates,
    radius?: number
  ) {
    return this.goog.computeDistanceBetween(from, to, radius);
  }

  public async getCurrentLocation(): Promise<Location> {
    const pos = await this.getCurrentPosition();
    return this.getLocation(pos.coords);
  }

  public async getLocation(coords: Coordinates): Promise<Location> {
    return new Promise<Location>((resolve, reject) => {
      this.goog.getAddress(
        coords,
        address => {
          resolve({
            address,
            coordinates: coords,
            dms: `${Dms.toLat(coords.latitude)},${Dms.toLon(coords.longitude)}`,
            latLon: StaticMap.stringifyCoords(coords),
          });
        },
        status => {
          reject(status);
        }
      );
    });
  }

  public getMapUrl(home: Coordinates, current: Coordinates): string {
    return StaticMap.googleMapUrl(home, current);
  }
}
