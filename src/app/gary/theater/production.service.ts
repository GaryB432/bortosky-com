import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Dto } from './models';
import { Observable, ObservableInput } from 'rxjs/Observable';

@Injectable()
export class ProductionService {
    constructor(private http: Http) { }

    public getProfile(): Observable<Dto.IProfile> {
        return this.http.get('theater.json')
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response): Dto.IProfile {
        return res.json() as Dto.IProfile;
    }
    private handleError(error: any, caught: Observable<Dto.IProfile>): ObservableInput<Dto.IProfile> {
        let errMsg: any = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
