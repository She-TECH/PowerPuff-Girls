import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';

import { Resident, EnergyToSell, UserContext } from '../org.decentralized.energy.network';
import { Coins } from '../org.decentralized.energy.network';
import { Energy } from '../org.decentralized.energy.network';
import { EnergyToCoins } from '../org.decentralized.energy.network';

import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TransactionRRService {

    //define namespace strings for api calls
	  private RESIDENT: string = 'Resident';
    private ENERGY: string = 'Energy';
    private COINS: string = 'Coins';
    private UserContext: string = 'UserContext'
    private ENERGY_TO_COINS: string = 'EnergyToCoins';
    private ENERGY_TO_SELL: string = 'EnergyToSell';

    //use data.service.ts to create services to make API calls
    constructor(private residentService: DataService<Resident>, private coinsService: DataService<Coins>, private energyService: DataService<Energy>, private energyToCoinsService: DataService<EnergyToCoins>, private energyToSellService: DataService<EnergyToSell>, private userInfoService: DataService<UserContext>) {
    };

    //get all resident objects on the blockchain network
    public getAllResidents(): Observable<Resident[]> {
        return this.residentService.getAll(this.RESIDENT);
    }

    //get energy asset by id
    public getEnergy(id: any): Observable<Energy> {
      return this.energyService.getSingle(this.ENERGY, id);
    }

    //get energy asset by id
    public getUserInfo(firstName: any): Observable<UserContext> {
      return this.userInfoService.getSingle(this.UserContext, firstName);
    }

    //get coins asset by id
    public getCoins(id: any): Observable<Coins> {
      return this.coinsService.getSingle(this.COINS, id);
    }
   
    //create energy to coins transaction
    public energyToCoins(itemToAdd: any): Observable<EnergyToCoins> {
      return this.energyToCoinsService.add(this.ENERGY_TO_COINS, itemToAdd);
    }

    //create energy to coins transaction
    public energyToSell(itemToAdd: any): Observable<EnergyToSell> {
      return this.energyToSellService.add(this.ENERGY_TO_SELL, itemToAdd);
    }

}
