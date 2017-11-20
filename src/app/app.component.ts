import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'bfam-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title = 'bfam';
  constructor(meta: Meta, title: Title) {
    meta.addTags([
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]);
    title.setTitle('Bortosky Family');
  }
}
