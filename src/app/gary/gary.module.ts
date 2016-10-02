import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { GaryComponent } from './gary.component';
import { TheaterComponent } from './theater/theater.component';
import { OverviewComponent } from './overview/overview.component';
import { ChartComponent } from './theater/chart.component';
import { ProductionService } from './theater/production.service';
import { garyRouting } from './gary.routing';
import { CustomDatePipe } from '../shared';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    garyRouting
  ],
  declarations: [
    GaryComponent,
    TheaterComponent,
    OverviewComponent,
    ChartComponent,
    CustomDatePipe,
  ],
  providers: [
    ProductionService
  ],
  exports: [GaryComponent]
})
export class GaryModule {
  constructor(public appRef: ApplicationRef) { }
}
