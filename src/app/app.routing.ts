import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GaryComponent } from './gary/gary.component';
import { TheaterComponent } from './gary/theater/theater.component';
import { OverviewComponent } from './gary/overview/overview.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'gary', component: GaryComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'theater', component: TheaterComponent }
    ]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
