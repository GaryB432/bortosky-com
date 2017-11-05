import { Component, Input } from '@angular/core';
import { Spot } from '../models';

@Component({
  selector: 'bfam-spot',
  styleUrls: ['./spot.component.scss'],
  templateUrl: './spot.component.html',
})
export class SpotComponent {
  @Input() public spot: Spot;
}
