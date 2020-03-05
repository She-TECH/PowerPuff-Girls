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
    selector: 'sb-charts-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-bar.component.html',
    styleUrls: ['charts-bar.component.scss'],
})
export class ChartsBarComponent implements OnInit, AfterViewInit {
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    data;

    constructor(private http: HttpClient) {}
    ngOnInit() {}

    ngAfterViewInit() {
        var area = this.http.get("http://132.186.199.33:5001/historical").subscribe((result:any)=>{
            console.log(result);
        });
        if(UserTransactioncacheService.consumerName=='Shivani')
        {
            this.data= [2759.33, 2466.7, 2868.636, 3003.144, 2111.02]
        }
       else{
        this.data= [1159.33, 1200, 1068.636, 1003.144, 1111.02]
       }
        this.chart = new Chart(this.myBarChart.nativeElement, {
            type: 'bar',
            data: {
                labels: ['1-March', '2-March', '3-March', '4-March','5-March'],
                datasets: [
                    {
                        label: 'Revenue',
                        backgroundColor: 'rgba(2,117,216,1)',
                        borderColor: 'rgba(2,117,216,1)',
                        data: this.data,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 6,
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
                                display: true,
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
