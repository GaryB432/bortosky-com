import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gbCustomDate' })
export class CustomDatePipe implements PipeTransform {
  public transform(value: Date, format: string): string {
    return value.toDateString();

    // var d = new Date(date),
    //     month = '' + (d.getMonth() + 1),
    //     day = '' + d.getDate(),
    //     year = d.getFullYear();

    // if (month.length < 2) month = '0' + month;
    // if (day.length < 2) day = '0' + day;

    // return [year, month, day].join('-');

  }
}
