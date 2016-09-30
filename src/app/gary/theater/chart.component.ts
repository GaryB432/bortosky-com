import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'gb-production-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    @Input() public years: string;

    public ngOnInit(): void {
        console.log('Hello Chart');
    }

}
