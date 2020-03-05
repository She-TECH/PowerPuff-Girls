import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration } from './configuration';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

import { LoginComponent } from './login/login.component';
import { ResidentService} from './Resident/Resident.service';
import { UserService} from '../modules/auth/services/user.service';
import { NavigationModule } from '../modules/navigation/navigation.module';
import { TransactionEnergyToSellComponent } from './transaction-energy-to-sell/transaction-energy-to-sell.component';
import { TransactionRRService } from '../app/TransactionRR/TransactionRR.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,

    TransactionRRComponent,
    TransactionRUComponent,
    TransactionRBComponent,

    AllTransactionsComponent,

    ResidentComponent,
    BankComponent,
    UtilityCompanyComponent,

    CoinsComponent,
    EnergyComponent,
    CashComponent,

    LoginComponent,

    TransactionEnergyToSellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NavigationModule
  ],
  providers: [
    Configuration,
    DataService,
    ResidentService,
    UserService,
    TransactionRRService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
