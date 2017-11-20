import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'gary', loadChildren: './gary/gary.module#GaryModule' },
  { path: 'homer', loadChildren: './homer/homer.module#HomerModule' },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
  { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
