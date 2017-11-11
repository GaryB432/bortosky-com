import { inject, TestBed } from '@angular/core/testing';

import { GeoService } from './geo.service';
import { GoogleService, MappingService } from './google/google.service';

class MockMappingService implements MappingService {
  public computeDistanceBetween(
    _from: Coordinates,
    _to: Coordinates,
    _radius?: number | undefined
  ): number {
    throw new Error('Method not implemented.');
  }
  public getAddressPromise(coords: Coordinates): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.getAddress(coords, address => resolve(address), e => reject(e));
    });
  }
  public getAddress(
    _coords: Coordinates,
    _done: (s: string) => void,
    _fail: (s: google.maps.GeocoderStatus) => void
  ): void {
    throw new Error('Method not implemented.');
  }
}

describe('GeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeoService,
        { provide: GoogleService, useClass: MockMappingService },
      ],
    });
  });

  it(
    'should be created',
    inject([GeoService], (service: GeoService) => {
      expect(service).toBeTruthy();
    })
  );
});
