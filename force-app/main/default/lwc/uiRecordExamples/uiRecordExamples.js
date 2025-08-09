import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class UiRecordExamples extends LightningElement {

    @track objectinfo = {};
    @track industryOptions = {};
    accountObjectFields = {};

    @wire(getObjectInfo,{objectApiName: 'Account'})
    wiredAccountObjectInfo({error,data}){
        if(data){
            this.objectinfo = data;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues,{fieldApiName : INDUSTRY_FIELD ,recordTypeId :'$objectinfo.defaultRecordTypeId'})
    wiredIndustryFieldValues({data,error}){
        console.log(JSON.stringify(this.objectinfo));
        if(data){
            this.industryOptions = data.values;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    handleChangeddata(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.accountObjectFields[name] = value;
    }

    createAccount(event){
        event.preventDefault();
        let fields = {...this.accountObjectFields};
        fields['RecordTypeId'] = this.objectinfo.defaultRecordTypeId;
        fields['Integration_Status__c'] = 'Success';
        const recordInput = {apiName : ACCOUNT_OBJECT.objectApiName,fields};
        console.log('recordId',JSON.stringify(recordInput));
        createRecord(recordInput).then((result)=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account record created with Id: '+result.id,
                    variant: 'success',
                }),
            );

        }).catch((error) => {
            console.log(JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'error',
                    message: 'Error occured in creating the Acccount record',
                    variant: 'error',
                }),
            );
        });
    }
}