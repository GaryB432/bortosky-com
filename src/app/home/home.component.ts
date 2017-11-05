import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bfam-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public message: string;

  public ngOnInit() {
    this.message = 'Hello';
  }
}
