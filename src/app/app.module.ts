import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaryModule } from './gary/gary.module';
import { HomeComponent } from './home/home.component';
// import { CustomDatePipe } from './shared/custom-date.pipe';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    GaryModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'my-bfam' }),
    BrowserAnimationsModule,
  ],
  providers: [],
})
export class AppModule {}
