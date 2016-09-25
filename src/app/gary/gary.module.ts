import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GaryComponent } from './gary.component';
import { TheaterComponent } from './theater/theater.component';
import { OverviewComponent } from './overview/overview.component';
import { ProductionService } from './theater/production.service';
import { garyRouting } from './gary.routing';
import { CustomDatePipe } from '../shared';

// import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

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
    CustomDatePipe,
  ],
  providers: [
    ProductionService
  ],
  exports: [GaryComponent]
})
export class GaryModule {
  constructor(public appRef: ApplicationRef) { }
  public hmrOnInit(store) {
    console.log('HMR Gary store', store);
  }
  //   hmrOnDestroy(store) {
  //     let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //     // recreate elements
  //     store.disposeOldHosts = createNewHosts(cmpLocation);
  //     // remove styles
  //     removeNgStyles();
  //   }
  //   hmrAfterDestroy(store) {
  //     // display new elements
  //     store.disposeOldHosts();
  //     delete store.disposeOldHosts;
  //   }
}
