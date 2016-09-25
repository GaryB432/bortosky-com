import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gb-gary',
  templateUrl: './gary.component.html',
  styleUrls: ['./gary.component.scss']
})
export class GaryComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Gary');
  }

}
