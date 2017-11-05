import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as Dto from './dto';

@Injectable()
export class ProductionService {
  constructor(private http: HttpClient) {}

  public getProfile(): Observable<Dto.ProfileNterface> {
    return this.http.get<Dto.ProfileNterface>('theater.json');
  }
}
