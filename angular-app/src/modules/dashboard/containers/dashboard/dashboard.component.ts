import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TransactionRRService } from '../../../../app/TransactionRR/TransactionRR.service';
import {UserTransactioncacheService} from '../../../../app/user-transactioncache.service';
import {UserContext} from '../../../../app/org.decentralized.energy.network';

@Component({
    selector: 'sb-dashboard',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userInfo;
    constructor(private serviceTransaction:TransactionRRService) {}
    ngOnInit() {

        this.userInfo = {
            $class: "org.energy.test.Login",
            "firstName": UserTransactioncacheService.consumerName,
          };
    
            this.serviceTransaction.getUserInfo(this.userInfo).subscribe((usercontext :UserContext)=>{
                console.log("userContext",usercontext);
                UserTransactioncacheService.userCoins = usercontext.coinsValue.toString();
                UserTransactioncacheService.userEnergy = usercontext.energyValue.toString();
            })

    }
}
