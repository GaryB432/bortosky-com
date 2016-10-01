import { Component, OnInit } from '@angular/core';
import { IProduction, Dto } from './models';
import { ProductionService } from './production.service';

import * as flatten from 'array-flatten';

@Component({
  selector: 'gb-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit {

  public shows: IProduction[] = [];

  public annualReport: string;

  constructor(private svc: ProductionService) {
    this.svc.getProfile().subscribe(profile => {
      this.shows = this.getProductions(profile);
    });
  }

  public ngOnInit(): void {
    console.log('Hello Theater');
  }

  public getProductions(profile: Dto.IProfile): IProduction[] {
    return this.sortProductions(
      flatten<IProduction>(profile.producers.map(
        (producer: Dto.IProducer) =>
          producer.productions.map((show: Dto.IProduction) => {
            return {
              opening: new Date(show.opening),
              producer: producer.name,
              role: show.role,
              show: show.show
            };
          }))
      ));
  }

  private sortProductions(productions: IProduction[]): IProduction[] {
    return productions.sort((a, b) => b.opening.valueOf() - a.opening.valueOf());
  }

}
