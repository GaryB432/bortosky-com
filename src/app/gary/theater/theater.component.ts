import { Component, OnInit } from '@angular/core';
import { IProduction, Dto, IAnnualCount } from './models';
import { ProductionService } from './production.service';

namespace Utilities {
  export function flatten<T>(arrays: T[][]): T[] {
    let merged: T[] = [];
    return merged = merged.concat.apply(merged, arrays);
  }
}

@Component({
  selector: 'gb-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit {

  public shows: IProduction[] = [];

  public annualReport: string;

  public static toAnnualReport(productions: IProduction[]): IAnnualCount[] {
    type YearMap = { [year: string]: number };

    let years: IAnnualCount[] = [];

    let startMap: YearMap = {};

    let finalYear: number = productions
      .map((p: IProduction) => p.opening.getFullYear())
      .reduce((a: number, b: number) => Math.max(a, b), 1972);

    for (let y: number = 1999; y < finalYear + 1; y++) {
      startMap[y.toFixed()] = 0;
    }

    let mapped: YearMap = productions
      .map((p: IProduction) => {
        return p.opening.getFullYear().toFixed();
      })
      .reduce<YearMap>(
      (ymap: YearMap, year: string) => {
        ymap[year]++;
        return ymap;
      },
      startMap);
    /* tslint:disable:forin */
    for (const year in mapped) {
      years.push({ count: mapped[year], year: year });
    }
    return years;
  }

  constructor(private p: ProductionService) {
    this.p.getProfile().subscribe(profile => {
      this.shows = this.getProductions(profile);
    });
  }

  public ngOnInit(): void {
    console.log('Hello Theater');
  }

  public getProductions(profile: Dto.IProfile): IProduction[] {
    return this.sortProductions(
      Utilities.flatten(profile.producers.map(
        (producer: Dto.IProducer) => producer.productions.map((show: Dto.IProduction) => {
          return <IProduction>{
            opening: new Date(show.opening),
            producer: producer.name,
            role: show.role,
            show: show.show
          };
        }))
      ));
  }

  public sortProductions(productions: IProduction[]): IProduction[] {
    return productions.sort((a, b) => { return b.opening.valueOf() - a.opening.valueOf(); });
  }

}
