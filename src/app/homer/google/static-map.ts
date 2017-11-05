interface UrlParameters {
  [index: string]: string | string[];
}

interface StaticMapOptions extends UrlParameters {
  size: string;
  scale: string;
  markers: string[];
}

export class StaticMap {
  public static stringifyCoords(coords: Coordinates) {
    const lat = coords.latitude.toFixed(6);
    const lon = coords.longitude.toFixed(6);
    return `${lat},${lon}`;
  }

  public static googleMapUrl(home: Coordinates, current: Coordinates): string {
    const opts: StaticMapOptions = {
      key: 'AIzaSyB1ajO_zdxrfn2Dt6T-5Hy4yznw4uQaJq4',
      markers: [
        StaticMap.marker('green', 'C', current),
        StaticMap.marker('blue', 'H', home),
      ],
      scale: '2',
      size: '145x172',
    };
    return StaticMap.makeUrl(
      'https://maps.googleapis.com/maps/api/staticmap',
      opts
    );
  }

  public static makeUrl(base: string, params?: UrlParameters): string {
    if (!params) {
      return base;
    }
    const encodeKvp = (k: string, v: string) =>
      `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

    const a: string[] = [];
    for (const p in params) {
      if (params[p] instanceof Array) {
        const subvals = params[p] as string[];
        a.push(...subvals.map(r => encodeKvp(p, r)));
      } else {
        a.push(encodeKvp(p, params[p] as string));
      }
    }
    return base + (base.indexOf('?') < 0 ? '?' : '&') + a.join('&');
  }

  private static marker(color: string, label: string, latlon: Coordinates) {
    return `color:${color}|label:${label}|${StaticMap.stringifyCoords(latlon)}`;
  }
}
