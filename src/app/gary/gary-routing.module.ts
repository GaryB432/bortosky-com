import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaryComponent } from './gary.component';
import { OverviewComponent } from './overview/overview.component';
import { TheaterComponent } from './theater/theater.component';

const routes: Routes = [
  {
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'theater', component: TheaterComponent },
    ],
    component: GaryComponent,
    path: '',
    pathMatch: 'prefix',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class GaryRoutingModule {}
