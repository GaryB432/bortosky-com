import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

import { Location } from '../models';

@Component({
  animations: [
    trigger('addrState', [
      state(
        'addr',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'latlon',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      transition('* <=> *', animate('200ms ease-in-out')),
    ]),
  ],
  selector: 'bfam-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html',
})
export class LocationComponent {
  public state: 'latlon' | 'addr' = 'addr';
  @Input() public location: Location;
  public toggleState(_e: MouseEvent) {
    this.state = this.state === 'addr' ? 'latlon' : 'addr';
  }
}
