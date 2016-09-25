import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';

@Component({
    selector: 'gb-overviasdf',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
    // id: number;

    // sub: Subscription;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        // this.sub = this.route.params.subscribe(params => {
        //     this.id = +params['id']; // (+) converts string 'id' to a number
        // });
    }

    ngOnDestroy() {
        // this.sub.unsubscribe();
    }
}
