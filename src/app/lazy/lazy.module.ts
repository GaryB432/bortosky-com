import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';

@NgModule({
  declarations: [LazyComponent],
  imports: [CommonModule, LazyRoutingModule],
})
export class LazyModule {}

// import {NgModule, Component} from '@angular/core'
// import {RouterModule} from '@angular/router'

// @Component({
//   selector: 'lazy-view',
//   template: `<h3>i'm lazy</h3>`
// })
// export class LazyComponent {}

// @NgModule({
//   declarations: [LazyComponent],
//   imports: [
//     RouterModule.forChild([
//       { path: '', component: LazyComponent, pathMatch: 'full'}
//     ])
//   ]
// })
// export class LazyModule {

// }
