import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
 })
export class UserTransactioncacheService {

  public static producerId:string;
  public static producerName:string;
  public static consumerId:string;
  public static consumerName:string;
  public static userEnergy:string;
  public static userCoins:string

  constructor() { }

  setValues(producerId,producerName,consumerId,consumerName){
    UserTransactioncacheService.producerId=producerId;
    UserTransactioncacheService.producerName=producerName;
    UserTransactioncacheService.consumerId=consumerId;
    UserTransactioncacheService.consumerName=consumerName;
  }

}
