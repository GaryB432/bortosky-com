import { Injectable } from '@angular/core';

export interface MappingService {
  computeDistanceBetween(
    from: Coordinates,
    to: Coordinates,
    radius?: number
  ): number;
  getAddress(
    coords: Coordinates,
    done: (s: string) => void,
    fail: (s: google.maps.GeocoderStatus) => void
  ): void;
}

@Injectable()
export class GoogleService implements MappingService {
  private geoCoder: google.maps.Geocoder = new google.maps.Geocoder();
  public computeDistanceBetween(
    from: Coordinates,
    to: Coordinates,
    radius?: number
  ): number {
    return google.maps.geometry.spherical.computeDistanceBetween(
      GoogleService.getLatLng(from),
      GoogleService.getLatLng(to),
      radius
    );
  }
  public getAddress(
    coords: Coordinates,
    done: (s: string) => void,
    fail: (s: google.maps.GeocoderStatus) => void
  ): void {
    // fail(google.maps.GeocoderStatus.INVALID_REQUEST);
    // setTimeout(() => done(getLatLng(coords).toString()), 3000);
    this.geoCoder.geocode(
      { location: GoogleService.getLatLng(coords) },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === google.maps.GeocoderStatus.OK) {
          done(results[0].formatted_address);
        } else {
          fail(status);
        }
      }
    );
  }
  private static getLatLng(coords: Coordinates): google.maps.LatLng {
    return new google.maps.LatLng(coords.latitude, coords.longitude, true);
  }
}
