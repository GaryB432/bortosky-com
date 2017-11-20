import { Pipe, PipeTransform } from '@angular/core';

type UnitOfMeasure = 'km' | 'mi';
@Pipe({
  name: 'bfamDistance',
})
export class DistancePipe implements PipeTransform {
  public transform(meters: number, unit: UnitOfMeasure = 'km'): string {
    const conversion = {
      km: 0.001,
      mi: 0.000621371192237,
    };
    const result = meters * conversion[unit];
    return result.toFixed(2);
  }
}
