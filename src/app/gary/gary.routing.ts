import { RouterModule, Routes } from '@angular/router';

import { GaryComponent } from './gary.component';
import { TheaterComponent } from './theater/theater.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: 'gary', component: GaryComponent, children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'theater', component: TheaterComponent }
    ]
  }

];

export const garyRouting = RouterModule.forChild(routes);
