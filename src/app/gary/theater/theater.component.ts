import { Component } from '@angular/core';
import * as flatten from 'array-flatten';

import * as Dto from './dto';
import { ProductionNterface2 } from './models';
import { ProductionService } from './production.service';

@Component({
  selector: 'bfam-theater',
  styleUrls: ['./theater.component.scss'],
  templateUrl: './theater.component.html',
})
export class TheaterComponent {
  public shows: ProductionNterface2[] = [];

  public annualReport: string;

  constructor(private svc: ProductionService) {
    this.svc.getProfile().subscribe(profile => {
      this.shows = this.getProductions(profile);
    });
  }

  public getProductions(profile: Dto.ProfileNterface): ProductionNterface2[] {
    return this.sortProductions(
      flatten<ProductionNterface2>(
        profile.producers.map((producer: Dto.ProducerNterface) =>
          producer.productions.map((show: Dto.ProductionNterface) => {
            return {
              opening: new Date(show.opening),
              producer: producer.name,
              role: show.role,
              show: show.show,
            };
          })
        )
      )
    );
  }

  private sortProductions(
    productions: ProductionNterface2[]
  ): ProductionNterface2[] {
    return productions.sort(
      (a, b) => b.opening.valueOf() - a.opening.valueOf()
    );
  }
}
