import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  public ngOnInit() {
    console.log('Hello About');
  }

}
