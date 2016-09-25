// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   {
//     path: 'gary', component: GaryComponent, children: [
//       { path: '', redirectTo: 'overview', pathMatch: 'full' },
//       { path: 'overview', component: OverviewComponent },
//       { path: 'theater', component: TheaterComponent }
//     ]
//   }
// ];

// const routing = RouterModule.forRoot(routes, { useHash: true });

xdescribe('Home Component', () => {
  const html = '<gb-home></gb-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, TestComponent]
    });
    TestBed.overrideComponent(TestComponent, { set: { template: html } });
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
  });

});

@Component({ selector: 'gb-test', template: '' })
class TestComponent { }
