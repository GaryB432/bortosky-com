import { Component, OnInit } from '@angular/core';
import { IProduction, Dto } from './models';
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

  constructor(private p: ProductionService) {
    this.p.getProfile().subscribe(profile => {
      console.log(profile);
      this.shows = this.getProductions(profile);
    });
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

  public ngOnInit(): void {
    console.log('Hello Theater');
  }

}
