import { LightningElement,wire,track } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import createAccount from '@salesforce/apex/AccountDetailsController.createAccount';

export default class CreateAccountUsingApex extends LightningElement {

    @track industryOptions;
    @track ratingOptions;
    @track typeOptions;
    @track accountObjectInfo;
    @track accountObjectData = {};
    @track error;

    @wire(getObjectInfo,{objectApiName: 'Account'})
    wiredAccountObjectInfo({data,error}){
        if(data){
            this.accountObjectInfo = data;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues,{fieldApiName : INDUSTRY_FIELD ,recordTypeId :'$accountObjectInfo.defaultRecordTypeId'})
    wiredIndustryFieldValues({data,error}){
        if(data){
            this.industryOptions = data.values;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues,{fieldApiName : TYPE_FIELD ,recordTypeId :'$accountObjectInfo.defaultRecordTypeId'})
    wiredTypeFieldValues({data,error}){
        if(data){
            this.typeOptions = data.values;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues,{fieldApiName : RATING_FIELD ,recordTypeId :'$accountObjectInfo.defaultRecordTypeId'})
    wiredRatingFieldValues({data,error}){
        if(data){
            this.ratingOptions = data.values;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    handleAccountChange(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.accountObjectData[name] = value;
    }

    handleCreateAccount(event){
        event.preventDefault();
        createAccount({
            accountDetails : JSON.stringify(this.accountObjectData)
        }).then((response) => {
            console.log(JSON.stringify(response));
        }).catch((error) => {
            this.error = error;
        });
    }
}