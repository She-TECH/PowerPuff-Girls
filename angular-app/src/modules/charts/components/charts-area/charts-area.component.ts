import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    constructor(private http: HttpClient) {}
    ngOnInit() {}

    ngAfterViewInit() {
        console.log("rest from python");
        var area = this.http.get("http://132.186.199.33:5000/prediction").subscribe((result:any)=>{
            console.log(result);
        });
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: [
                    'Mar 5',
                    'Mar 6',
                    'Mar 7',
                    'Mar 8',
                    'Mar 9',
                ],
                datasets: [
                    {
                        label: 'Sessions',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(2,117,216,0.2)',
                        borderColor: 'rgba(2,117,216,1)',
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(2,117,216,1)',
                        pointBorderColor: 'rgba(255,255,255,0.8)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            1800.866902927134,
                            1609.5717728412096,
                            1765.6817850403918,
                            1726.6499829728432,
                            1594.6432163725276,
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'day',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 20,
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, .125)',
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }
}
