/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.energy.test.SampleTransaction} sampleTransaction
 * @transaction
 */
/*async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.energy.test.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.energy.test', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}*/

/**
 * Energy to Coins transaction
 * @param {org.energy.test.EnergyToCoins} UpdateValues 
 * @transaction
 */
async function EnergyToCoins(UpdateValues) {

    //determine change in coins value from the rate
    var coinsChange = (UpdateValues.energyRate * UpdateValues.energyValue);

    //update values of the assets
    UpdateValues.coinsInc.value = UpdateValues.coinsInc.value + coinsChange;
    UpdateValues.coinsDec.value = UpdateValues.coinsDec.value - coinsChange;
    UpdateValues.energyInc.value = UpdateValues.energyInc.value + UpdateValues.energyValue;
    UpdateValues.energyDec.value = UpdateValues.energyDec.value - UpdateValues.energyValue;
	
    //get asset registry for Coins and Energy, and update on the ledger
    return getAssetRegistry('org.energy.test.Coins')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.coinsInc,UpdateValues.coinsDec]);
        })                
        .then(function () {
            return  getAssetRegistry('org.energy.test.Energy')
            .then(function (assetRegistry) {
                return assetRegistry.updateAll([UpdateValues.energyInc,UpdateValues.energyDec]);
            });            
        });        
   
}

/**
 * Energy to Energy transaction
 * @param {org.energy.test.EnergyToSell} UpdateValues 
 * @transaction
 */
async function EnergyToSell(UpdateValues) {

  
  //saleValue=100
  //energyValue=1000
  var remainingEnergy= (UpdateValues.updatedEnergy.value - UpdateValues.saleValue);
  var soldEnergy=UpdateValues.saleValue;
    //determine change in coins value from the rate
   // var coinsChange = (UpdateValues.energyRate * UpdateValues.energyValue);

    //update values of the assets
   // UpdateValues.coinsInc.value = UpdateValues.coinsInc.value + coinsChange;
   // UpdateValues.coinsDec.value = UpdateValues.coinsDec.value - coinsChange;
    UpdateValues.updatedEnergy.value = remainingEnergy;
    UpdateValues.updatedEnergy.saleValue = UpdateValues.updatedEnergy.saleValue + soldEnergy;
	
    //get asset registry for Energy, and update on the ledger
    return getAssetRegistry('org.energy.test.Energy')
        .then(function (assetRegistry) {
            return assetRegistry.updateAll([UpdateValues.updatedEnergy]);
        });    
   
}


/* Sample transaction
 * @param {org.energy.test.Login} login
 * @returns{org.energy.test.UserContext} the return data
 * @transaction
 */

async function loginValidation(login){
  
  const userContext= getFactory().newConcept('org.energy.test','UserContext');

  let qry = buildQuery('SELECT org.energy.test.Resident WHERE (firstName ==_$firstName)');
  
  let results= await query(qry, {firstName: login.firstName});
  console.log("@debug Login Validation is excuted and result length is ", results.length);
  if(results.length > 0){
     let user  = results[0];
     userContext.firstName = user.firstName;
     userContext.lastName = user.lastName;
     userContext.residentID = user.residentID;
     //let recordFromReg = await user.get(user.energy);
     //userContext.energyVal = recordFromReg.value;
    console.log("@debug UserContext", user.firstName);
	
	let qry1 = buildQuery('SELECT org.energy.test.Energy WHERE (ownerID ==_$ownerID)');
    let results1= await query(qry1, {ownerID: user.residentID});
    if(results1.length > 0){
     let energy  = results1[0];
      userContext.energyValue = energy.value;
      userContext.saleValue = energy.saleValue;
    }
    
    let qry2 = buildQuery('SELECT org.energy.test.Coins WHERE (ownerID ==_$ownerID)');
    let results2= await query(qry2, {ownerID: user.residentID});
    if(results2.length > 0){
     let coins  = results2[0];
      userContext.coinsValue = coins.value;
    }
    
  }
  return userContext;  
}