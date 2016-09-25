import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatter, FormatString } from 'gb-date-formatter';

@Pipe({ name: 'gbCustomDate' })
export class CustomDatePipe implements PipeTransform {
  private static namedFormats: { [name: string]: FormatString; } = {
    'medium': 'MMMM y',
    'long': 'EEE MMM d, y h:mm a'
  };
  private formatter = new DateFormatter('en-US');

  public transform(value: Date, fmt: string): string {
    return this.formatter.format(value, CustomDatePipe.namedFormats[fmt]);

  }
}
