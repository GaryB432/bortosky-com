import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'bfamMoment',
})
export class MomentPipe implements PipeTransform {
  public transform(value: string | number, _args?: any): string {
    return moment(value).fromNow();
  }
}
