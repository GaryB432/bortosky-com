import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomDatePipe } from '../shared/custom-date.pipe';
import { GaryRoutingModule } from './gary-routing.module';
import { GaryComponent } from './gary.component';
import { OverviewComponent } from './overview/overview.component';
import { ChartComponent } from './theater/chart.component';
import { ProductionService } from './theater/production.service';
import { TheaterComponent } from './theater/theater.component';

@NgModule({
  declarations: [
    GaryComponent,
    TheaterComponent,
    OverviewComponent,
    ChartComponent,
    CustomDatePipe,
  ],
  imports: [CommonModule, GaryRoutingModule],
  providers: [ProductionService],
})
export class GaryModule {}
