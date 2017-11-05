import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataService } from './data.service';
import { DistancePipe } from './distance.pipe';
import { GeoService } from './geo.service';
import { GoogleService } from './google/google.service';
import { HomerComponent } from './homer.component';
import { HomerService } from './homer.service';
import { LocationComponent } from './location/location.component';
import { MomentPipe } from './moment.pipe';
import { SpotComponent } from './spot/spot.component';

const routes: Routes = [
  { path: '', component: HomerComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    HomerComponent,
    LocationComponent,
    SpotComponent,
    MomentPipe,
    DistancePipe,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [DataService, GeoService, GoogleService, HomerService],
})
export class HomerModule {}
