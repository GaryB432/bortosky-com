/// <reference path="../../../../node_modules/@types/google.visualization/index.d.ts"/>

import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef } from '@angular/core';
import { IProduction, IAnnualCount } from './models';

type GoogleColumnChart = google.visualization.ColumnChart;

@Component({
    selector: 'gb-production-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
    @Input() public shows: IProduction[];

    private started: Promise<GoogleColumnChart>;

    private columnChartOptions: google.visualization.ColumnChartOptions = {
        legend: { position: 'none' },
        title: 'Productions by Year',
        vAxis: {
            format: '0'
        }
    };

    private static createDataTable(years: IAnnualCount[]): google.visualization.DataTable {
        const data: google.visualization.DataTable = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Shows');
        data.addRows(years.map((y: IAnnualCount) => [y.year, y.count]));
        return data;
    }

    private static toAnnualReport(productions: IProduction[]): IAnnualCount[] {
        type YearMap = { [year: string]: number };

        const years: IAnnualCount[] = [];
        const startMap: YearMap = {};
        const finalYear: number = productions
            .map((p: IProduction) => p.opening.getFullYear())
            .reduce((a: number, b: number) => Math.max(a, b), 1972);

        for (let y: number = 1999; y < finalYear + 1; y++) {
            startMap[y.toFixed()] = 0;
        }

        const mapped: YearMap = productions
            .map((p: IProduction) => p.opening.getFullYear().toFixed())
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

    constructor(private element: ElementRef) {
    }

    public ngOnInit(): void {
        console.log('Hello Chart');
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['shows'].isFirstChange()) {
            this.started = new Promise<GoogleColumnChart>((resolve: (value?: GoogleColumnChart) => void, reject: (error?: any) => void) => {
                google.charts.load('current', { packages: ['corechart'] });
                google.charts.setOnLoadCallback(() => {
                    resolve(new google.visualization.ColumnChart(this.element.nativeElement));
                });
            });
        } else {
            this.drawChart();
        }
    }

    private drawChart(): void {
        this.started.then(chart => {
            chart.draw(
                ChartComponent.createDataTable(ChartComponent.toAnnualReport(this.shows)),
                this.columnChartOptions);
        });

    }

}
