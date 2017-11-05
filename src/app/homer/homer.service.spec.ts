// tslint:disable:max-classes-per-file
import { inject, TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { GeoService } from './geo.service';
import { HomerService } from './homer.service';
import { Location } from './models';

class MockGeoService {
  public async getCurrentPosition(): Promise<Position> {
    return Promise.resolve({
      coords: {
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        latitude: 2,
        longitude: 1,
        speed: 0,
      },
      timestamp: Number(new Date()),
    });
  }
  public computeDistanceBetween(
    from: Coordinates,
    to: Coordinates,
    _radius?: number
  ) {
    return from.latitude - to.latitude;
  }

  public async getCurrentLocation(): Promise<Location> {
    const pos = await this.getCurrentPosition();
    return this.getLocation(pos.coords);
  }

  public async getLocation(coords: Coordinates): Promise<Location> {
    return new Promise<Location>(resolve => {
      resolve({
        address: JSON.stringify(coords.latitude),
        coordinates: coords,
        dms: 'DMS',
        latLon: 'LATLON',
      });
    });
  }
}

class MockDataService {}

describe('HomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomerService,
        { provide: GeoService, useclass: MockGeoService },
        { provide: DataService, useclass: MockDataService },
      ],
    });
  });

  it(
    'should be created',
    inject([HomerService], (service: HomerService) => {
      expect(service).toBeTruthy();
    })
  );
});
