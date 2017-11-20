import { Component, OnInit } from '@angular/core';

import { HomerService } from './homer.service';
import { Location, Spot } from './models';

@Component({
  selector: 'bfam-root',
  styleUrls: ['./homer.component.scss'],
  templateUrl: './homer.component.html',
})
export class HomerComponent implements OnInit {
  public title = 'bfam';
  public home: Location;
  public last: Spot;
  public distance: number = 0;
  public ready: boolean = false;

  constructor(private svc: HomerService) {
    this.home = {
      address: 'home address',
      coordinates: {
        accuracy: 0,
        altitude: 0,
        altitudeAccuracy: 0,
        heading: 0,
        latitude: 2,
        longitude: 1,
        speed: 0,
      },
      dms: 'home dms',
      latLon: 'home latLon',
    };
    this.last = {
      location: {
        address: 'last address',
        coordinates: {
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          latitude: 2,
          longitude: 1,
          speed: 0,
        },
        dms: 'last dms',
        latLon: 'last latLon',
      },
      stamp: 0,
    };
  }

  public async ngOnInit() {
    try {
      const { home, last } = await this.svc.readInfo();
      this.home = home;
      this.last = last;
      this.ready = true;
    } catch (e) {
      this.home.address = 'PRESS HOME WHEN YOU ARE AT HOME';
    }
    this.computeDistance();
  }

  get mapUrl() {
    return this.svc.getMapUrl(
      this.home.coordinates,
      this.last.location.coordinates
    );
  }
  public async setHome(e: MouseEvent) {
    return this.setCurrent(e, true);
  }
  public async setCurrent(
    _e: MouseEvent,
    home: boolean = false
  ): Promise<void> {
    const current = await this.svc.getCurrentLocation();
    this.last.location = current;
    this.last.stamp = Number(new Date());
    if (home) {
      this.home = current;
    }
    this.computeDistance();
    this.saveInfo();
  }

  private saveInfo() {
    this.svc.writeInfo({
      home: this.home,
      last: {
        location: this.last.location,
        stamp: this.last.stamp,
      },
    });
    this.ready = true;
  }

  private computeDistance() {
    this.distance = this.svc.computeDistanceBetween(
      this.home.coordinates,
      this.last.location.coordinates
    );
  }
}
