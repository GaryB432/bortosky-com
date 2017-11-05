import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatter, FormatString } from 'gb-date-formatter';

@Pipe({ name: 'bfamCustomDate' })
export class CustomDatePipe implements PipeTransform {
  private static namedFormats: { [name: string]: FormatString } = {
    long: 'EEE MMM d, y h:mm a',
    medium: 'MMMM y',
  };
  private formatter: DateFormatter = new DateFormatter('en-US');

  public transform(value: Date, fmt: string): string {
    if (CustomDatePipe.namedFormats.hasOwnProperty(fmt)) {
      return this.formatter.format(value, CustomDatePipe.namedFormats[fmt]);
    }
    throw new Error(`fmt ${fmt} is unrecognized.`);
  }
}
