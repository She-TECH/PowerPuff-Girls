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
import {UserTransactioncacheService} from '../../../../app/user-transactioncache.service';

@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    data;

    constructor(private http: HttpClient) {}
    ngOnInit() {}

    ngAfterViewInit() {
        console.log("rest from python");
        var area = this.http.get("http://132.186.199.33:5000/prediction").subscribe((result:any)=>{
            console.log(result);
        });
        if(UserTransactioncacheService.consumerName=='Shivani')
        {
            this.data= [
                2800.866902927134,
                2609.5717728412096,
                2965.6817850403918,
                3026.6499829728432,
                2894.6432163725276,
            ]
        }
       else{
        this.data= [
            1100.866902927134,
            1309.5717728412096,
            1265.6817850403918,
            1226.6499829728432,
            1194.6432163725276,
        ]
       }
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: [
                    'Mar 6',
                    'Mar 7',
                    'Mar 8',
                    'Mar 9',
                    'Mar 10',
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
                        data: this.data,
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
                                min: 500,
                                max: 6000,
                                maxTicksLimit: 7,
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
