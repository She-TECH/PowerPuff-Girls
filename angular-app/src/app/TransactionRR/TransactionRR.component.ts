import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TransactionRRService } from './TransactionRR.service';
import {UserTransactioncacheService} from '../user-transactioncache.service';
import 'rxjs/add/operator/toPromise';

//provide associated components
@Component({
	selector: 'app-TransactionRR',
	templateUrl: './TransactionRR.component.html',
	styleUrls: ['./TransactionRR.component.css'],
  	providers: [TransactionRRService]
})

//TransactionRRComponent class
export class TransactionRRComponent {

  //define rate of conversion
  public residentCoinsPerEnergy = 1;
  public residentEnergyPerCoin = (1 / this.residentCoinsPerEnergy).toFixed(2);  

  //define variables
  private coinsExchanged;
  private checkResultProducerEnergy = true;
  private checkResultConsumerCoins = true;

  myForm: FormGroup;
  public errorMessage;
  public transactionFrom;

  public allResidents;
  private producerResident;
  private consumerResident;
  
  private energyToCoinsObj;
  public transactionID;

  //initialize form variables
  producerName = UserTransactioncacheService.producerName;
  consumerName = UserTransactioncacheService.consumerName;
  producerResidentID = UserTransactioncacheService.producerId;
	consumerResidentID = UserTransactioncacheService.consumerId;
	energyValue = new FormControl("", Validators.required);
	coinsValue = new FormControl("", Validators.required);
  
  constructor(private serviceTransaction:TransactionRRService, fb: FormBuilder) {
    //intialize form  
	  this.myForm = fb.group({
		  producerResidentID:this.producerResidentID,
		  consumerResidentID:this.consumerResidentID,
      energyValue:this.energyValue,
      coinsValue:this.coinsValue,
    });
    
  };

  //on page initialize, load all residents
  ngOnInit(): void {
    this.transactionFrom  = false;
    this.loadAllResidents()
    .then(() => {
            this.transactionFrom  = true;
    });
    
  }

  //get all Residents
  loadAllResidents(): Promise<any> {

    //retrieve all residents in the tempList array
    let tempList = [];
    
    //call serviceTransaction to get all resident objects
    return this.serviceTransaction.getAllResidents()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      
      //append tempList with the resident objects returned
      result.forEach(resident => {
        tempList.push(resident);
      });

      //assign tempList to allResidents
      this.allResidents = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  //execute transaction
  execute(form: any): Promise<any> {
    console.log(this.allResidents);
    console.log(this.producerResidentID);
    console.log(this.consumerResidentID);

    //loop through all residents, and get producer and consumer resident from user input
    for (let resident of this.allResidents) {      
      if(resident.residentID == this.producerResidentID){
        this.producerResident = resident;
      }
      if(resident.firstName == this.consumerName){
        this.consumerResidentID == resident.residentID
        this.consumerResident = resident;
      }
    }
    //identify energy and coins id which will be debited
    var splitted_energyID = this.producerResident.energy.split("#", 2); 
    var energyID = String(splitted_energyID[1]);

    var splitted_coinsID = this.consumerResident.coins.split("#", 2); 
    var coinsID = String(splitted_coinsID[1]);
    //calculate coins exchanges from the rate
    this.coinsExchanged = this.residentCoinsPerEnergy * this.energyValue.value;

    //create transaction object
    this.energyToCoinsObj = {
      $class: "org.energy.test.EnergyToCoins",
      "energyRate": this.residentCoinsPerEnergy,
      "energyValue": this.energyValue.value,
      "coinsInc": this.producerResident.coins,
      "coinsDec": this.consumerResident.coins,
      "energyInc": this.consumerResident.energy,
      "energyDec": this.producerResident.energy,
    };

    //check consumer coins and producer energy assets for enough balance before creating transaction
    //call serviceTransaction to get energy asset
    return this.serviceTransaction.getEnergy(energyID)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      //check if enough value
      if(result.value) {
        if ((result.value - this.energyValue.value) < 0 ){
          this.checkResultProducerEnergy = false;
          this.errorMessage = "Insufficient energy in producer account";
          return false;
        }
        return true;
      }
    })
    .then((checkProducerEnergy) => {
      //if positive on sufficient energy, then check coins asset whether sufficient coins
      if(checkProducerEnergy)
      {
        //call serviceTransaction to get coins asset        
        this.serviceTransaction.getCoins(coinsID)
        .toPromise()
        .then((result) => {
          this.errorMessage = null;
          //check if enough value
          if(result.value) {
            if ((result.value - this.coinsExchanged) < 0 ){
              this.checkResultConsumerCoins = false;
              this.errorMessage = "Insufficient coins in consumer account";
              return false;
            }
            return true;
          }
        })
        .then((checkConsumerCoins) => {
          //if positive on sufficient coins, then call transaction
          if(checkConsumerCoins)
          {
            //call serviceTransaction call the energyToCoins transaction with energyToCoinsObj as parameter            
            this.serviceTransaction.energyToCoins(this.energyToCoinsObj)      
            .toPromise()
            .then((result) => {
              this.errorMessage = null;
              this.transactionID = result.transactionId;
              console.log(result)     
            })
            .catch((error) => {
                if(error == 'Server error'){
                    this.errorMessage = "Could not connect to REST server. Please check your configuration details";
                }
                else if(error == '404 - Not Found'){
                this.errorMessage = "404 - Could not find API route. Please check your available APIs."
                }
                else{
                    this.errorMessage = error;
                }
            }).then(() => {
              this.transactionFrom = false;
            });
          }
        });
      }
    });
  }
}
