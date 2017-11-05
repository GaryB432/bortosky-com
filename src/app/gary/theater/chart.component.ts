import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AnnualCountNterface, ProductionNterface2 } from './models';

type GoogleColumnChart = google.visualization.ColumnChart;

@Component({
  selector: 'bfam-production-chart',
  styleUrls: ['./chart.component.scss'],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnChanges {
  @Input() public shows: ProductionNterface2[];

  private started: Promise<GoogleColumnChart>;

  private columnChartOptions: google.visualization.ColumnChartOptions = {
    colors: ['#007bc4'],
    legend: { position: 'none' },
    title: 'Productions by Year',
    vAxis: {
      format: '0',
    },
  };

  constructor(private element: ElementRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    // tslint:disable-next-line:no-string-literal
    if (changes['shows'].isFirstChange()) {
      this.started = new Promise<
        GoogleColumnChart
      >(
        (
          resolve: (value?: GoogleColumnChart) => void,
          _reject: (error?: any) => void
        ) => {
          google.charts.load('current', { packages: ['corechart'] });
          google.charts.setOnLoadCallback(() => {
            resolve(
              new google.visualization.ColumnChart(this.element.nativeElement)
            );
          });
        }
      );
    } else {
      this.drawChart();
    }
  }

  private drawChart(): void {
    this.started.then(chart => {
      chart.draw(
        ChartComponent.createDataTable(
          ChartComponent.toAnnualReport(this.shows)
        ),
        this.columnChartOptions
      );
    });
  }

  private static createDataTable(
    years: AnnualCountNterface[]
  ): google.visualization.DataTable {
    const data: google.visualization.DataTable = new google.visualization
      .DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Shows');
    data.addRows(years.map((y: AnnualCountNterface) => [y.year, y.count]));
    return data;
  }

  private static toAnnualReport(
    productions: ProductionNterface2[]
  ): AnnualCountNterface[] {
    interface YearMap {
      [year: string]: number;
    }

    const years: AnnualCountNterface[] = [];
    const startMap: YearMap = {};
    const finalYear: number = productions
      .map((p: ProductionNterface2) => p.opening.getFullYear())
      .reduce((a: number, b: number) => Math.max(a, b), 1972);

    for (let y: number = 1999; y < finalYear + 1; y++) {
      startMap[y.toFixed()] = 0;
    }

    const mapped: YearMap = productions
      .map((p: ProductionNterface2) => p.opening.getFullYear().toFixed())
      .reduce<YearMap>((ymap: YearMap, year: string) => {
        ymap[year]++;
        return ymap;
      }, startMap);
    /* tslint:disable-next-line:forin */
    for (const year in mapped) {
      years.push({ count: mapped[year], year });
    }
    return years;
  }
}
