import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('About Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AboutComponent] });
  });

  it('should say stuff', () => {
    const fixture: ComponentFixture<AboutComponent> = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('About the Bortosky Family');
  });

});
