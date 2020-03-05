import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { SBSortableHeaderDirective, SortEvent } from '../../directives';
import { Country } from '../../models';
import { CountryService } from '../../services';
import {ResidentService} from '../../../../app/Resident/Resident.service';
import {Resident, Energy} from '../../../../app/org.decentralized.energy.network';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {UserTransactioncacheService} from '../../../../app/user-transactioncache.service';
import {UserService} from '../../../auth/services/user.service';


@Component({
    selector: 'sb-ng-bootstrap-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './ng-bootstrap-table.component.html',
    styleUrls: ['ng-bootstrap-table.component.scss'],
})
export class NgBootstrapTableComponent implements OnInit {
    public allResidents = [];
    public allUsers;
    public errorMessage;
    public user: string = UserService.user.firstName;
    showTable = false;
    @Input() pageSize = 4;

    countries$!: Observable<Country[]>;
    total$!: Observable<number>;
    residents: Observable<Resident[]>;

    sortedColumn!: string;
    sortedDirection!: string;

    @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

    constructor(
        public countryService: CountryService,
        private changeDetectorRef: ChangeDetectorRef,
        public residentService: ResidentService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.countryService.pageSize = this.pageSize;
        this.countries$ = this.countryService.countries$;
        this.loadAllResidents();
        this.total$ = this.countryService.total$;
    }

    onSort({ column, direction }: SortEvent) {
        this.sortedColumn = column;
        this.sortedDirection = direction;
        this.countryService.sortColumn = column;
        this.countryService.sortDirection = direction;
        this.changeDetectorRef.detectChanges();
    }

    loadAllResidents() {
        this.residents =  this.residentService.getAllResidents();
        this.residentService.getAllResidents().subscribe((manyResident: Resident []) => {
            manyResident.forEach(resident => {
                const res: any = resident.energy;
                const id = res.split('#', 2)[1].toString();
                this.residentService.getEnergy(id).subscribe(result => {
                    resident.lastName = result.saleValue.toString();
                    this.allResidents.push(resident);
                    if (this.allResidents.length === 4) {
                        this.showTable = true;
                    }
                });
            });
        });
 }
    submit(x) {
        UserTransactioncacheService.producerId = x.residentID;
        UserTransactioncacheService.producerName = x.firstName;
        UserTransactioncacheService.consumerId = UserService.user.id;
        UserTransactioncacheService.consumerName = UserService.user.firstName;

        this.router.navigate(['/TransactionRR']);
    }

    isDisabled(x): boolean {
            if (x.firstName === this.user) {
              return true;
            }
            return false;
      }

}
