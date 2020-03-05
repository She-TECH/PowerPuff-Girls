import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { CoinsComponent } from './Coins/Coins.component';
import { EnergyComponent } from './Energy/Energy.component';
import { CashComponent } from './Cash/Cash.component';

import { ResidentComponent } from './Resident/Resident.component';
import { BankComponent } from './Bank/Bank.component';
import { UtilityCompanyComponent } from './UtilityCompany/UtilityCompany.component';

import { TransactionRRComponent } from './TransactionRR/TransactionRR.component';
import { TransactionRUComponent } from './TransactionRU/TransactionRU.component';
import { TransactionRBComponent } from './TransactionRB/TransactionRB.component';

import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';
import { LoginComponent} from './login/login.component';
import { TransactionEnergyToSellComponent } from './transaction-energy-to-sell/transaction-energy-to-sell.component';

const routes: Routes = [

    {path: '', component: HomeComponent},
    {path: 'About', component: AboutComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'TransactionEnergyToSellComponent', component: TransactionEnergyToSellComponent},

    {path: 'dashboard', loadChildren: () =>
    import('../modules/dashboard/dashboard-routing.module').then(
        m => m.DashboardRoutingModule
    )},

    { path: 'Coins', component: CoinsComponent},
    { path: 'Energy', component: EnergyComponent},
    { path: 'Cash', component: CashComponent},

    { path: 'Resident', component: ResidentComponent},
    { path: 'Bank', component: BankComponent},
    { path: 'UtilityCompany', component: UtilityCompanyComponent},

    { path: 'TransactionRR', component: TransactionRRComponent },
    { path: 'TransactionRU', component: TransactionRUComponent },
    { path: 'TransactionRB', component: TransactionRBComponent },

    { path: 'AllTransactions', component: AllTransactionsComponent },

    {path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
