export interface Info {
  home: Location;
  last: Spot;
}
export interface Spot {
  location: Location;
  stamp: number;
}
export interface Location {
  coordinates: Coordinates;
  dms: string;
  address: string;
  latLon: string;
}
