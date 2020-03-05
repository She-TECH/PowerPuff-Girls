import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserTransactioncacheService } from '../../../../app/user-transactioncache.service';
import {TransactionRRService} from '../../../../app/TransactionRR/TransactionRR.service';
import { UserContext } from '../../../../app/org.decentralized.energy.network';

@Component({
    selector: 'sb-dashboard-cards',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-cards.component.html',
    styleUrls: ['dashboard-cards.component.scss'],
})
export class DashboardCardsComponent implements OnInit {

    userInfo;
     userCoins;
     userEnergy;
     show=false;
    
    constructor(private serviceTransaction:TransactionRRService) {}
    ngOnInit() {

    }
    
    onshow() {
        setTimeout(() => {
        }, 3000);
            this.userCoins = UserTransactioncacheService.userCoins;
            this.userEnergy = UserTransactioncacheService.userEnergy;
            this.show=true;
       
    }
}
