import { api, LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecords extends LightningElement {
    @api recordId;
    @api objectApiName;

    contactRecordFields = {};
    accountrecordfields = [];

    handleAccountChange(event){
        event.preventDefault();
        let{name,value} = event.target;
        this.accountrecordfields[name] = value;
    }

    handleContactChange(event){
        event.preventDefault();
        let{name,value} = event.target;
        this.contactRecordFields[name] = value;
    }

    handleCreateRecords(event){
        event.preventDefault();
        let fields = {...this.accountrecordfields};
        fields['RecordTypeId'] = '0120o000001e8pIAAQ';
        const recordInput = {apiName : ACCOUNT_OBJECT.objectApiName,fields};
        createRecord(recordInput).then((result) => {
            console.log(JSON.stringify(result));
            if(result){
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Account is created Succesfully',
                    variant: 'success',
                }),
                );
                this.handleContactrecord(result.id);
            }
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }

    handleContactrecord(accountId){
        let fields = {...this.contactRecordFields};
        fields[ACCOUNTID_FIELD.fieldApiName] = accountId;
        const recordInput = {apiName:CONTACT_OBJECT.objectApiName,fields};
        createRecord(recordInput).then((response) => {
            console.log(JSON.stringify(response));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Contact is created Succesfully',
                variant: 'success',
            }),
            );
        }).catch((error) => {
            console.log(JSON.stringify(error));
        });
    }
}