import { api, LightningElement, track, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import { getPicklistValuesByRecordType,getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
import STAGENAME_FIELD from '@salesforce/schema/Opportunity.StageName';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import LEVEL_FIELD from '@salesforce/schema/Contact.Level__c';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CreateObjectByParameter extends LightningElement {

    selectedObject;
    accountPanelToBeEnabled = false;
    contactPanelToBeEnabled = false;
    opportunitypanelToBeEnabled = false;
    @track opportunityObjectPickListvalues;
    @track opportunityObjectData = {};
    @track accountObjectData = {};
    @track contactObjectData = {};
    @track typeOptions = {};
    @track stageNameOptions = {};
    @track accountObjectInfo;
    @track contactObjectInfo;
    @track industryOptions = {};
    @track levelOptions = {};

    get selectedobject(){
        return this.selectedObject;
    }
    
    @api
    set selectedobject(value){
        switch(value){
            case "Account":
                this.selectedObject = "Account";
                this.accountPanelToBeEnabled = true;
                break;
            case "Contact":
                this.selectedObject = "Contact";
                this.contactPanelToBeEnabled = true;
                break;
            case "Opportunity":
                this.selectedObject = "Opportunity";
                this.opportunitypanelToBeEnabled = true;
                break;
        }
    }

    @wire(getObjectInfo,{objectApiName: 'Account'})
    wiredAccountObjectInfo({someerror,somedata}){
        if(somedata){
            this.accountObjectInfo = somedata;
        }else{
            console.log(JSON.stringify(someerror));
        }
    }

    @wire(getObjectInfo,{objectApiName: 'Contact'})
    wiredContactObjectInfo({error,data}){
        if(data){
            this.contactObjectInfo = data;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT_OBJECT,recordTypeId:'012000000000000AAA'})
    wiredAccountObjectPicklist({error,data}){
        if(data){
            console.log("Account Object Data",JSON.stringify(data));
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValuesByRecordType,{objectApiName:CONTACT_OBJECT,recordTypeId:'012000000000000AAA'})
    wiredAccountObjectPicklist({error,data}){
        if(data){
            console.log("Contact Object Data",JSON.stringify(data));
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValuesByRecordType,{objectApiName:OPPORTUNITY_OBJECT,recordTypeId:'012000000000000AAA'})
    wiredAccountObjectPicklist({error,data}){
        if(data){
            this.opportunityObjectPickListvalues = data;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues,{fieldApiName: TYPE_FIELD, recordTypeId:'012000000000000AAA'})
    wiredTypeFields({error,data}){
        if(data){
            this.typeOptions = data.values;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    @wire(getPicklistValues,{fieldApiName: STAGENAME_FIELD, recordTypeId:'012000000000000AAA'})
    wiredStageNameFields({error,data}){
        if(data){
            this.stageNameOptions = data.values;
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

    @wire(getPicklistValues,{fieldApiName : LEVEL_FIELD ,recordTypeId :'$contactObjectInfo.defaultRecordTypeId'})
    wiredLevelFieldValues({data,error}){
        if(data){
            this.levelOptions = data.values;
        }else{
            console.log(JSON.stringify(error));
        }
    }

    

    handleOpportunityChange(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.opportunityObjectData[name] = value;
    }

    handleContactChange(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.contactObjectData[name] = value;
    }

    handleAccountChange(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.accountObjectData[name] = value;
    }

    handleCreateOpportunity(event){
        event.preventDefault();
        if(this.validateForm()){
            const fields = {...this.opportunityObjectData};
            const recordInput = {apiName: OPPORTUNITY_OBJECT.objectApiName,fields};
            createRecord(recordInput).then((result) => {
                console.log(JSON.stringify(result));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Opportunity created with Id: '+result.id,
                        variant: 'success',
                    }),
                );
                const sentEvent = new CustomEvent('eventreceived',{
                    detail:{objectCreated:true},
                    bubbles:true,
                    composed:false
                });
                this.dispatchEvent(sentEvent);
            }).catch((error)=>{
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

    handleCreateAccount(event){
        event.preventDefault();
        //Validate the mandatory Fields
        if(this.validateForm()){
            let fields = {...this.accountObjectData};
            fields['RecordTypeId'] = this.accountObjectInfo.defaultRecordTypeId;
            fields['Integration_Status__c'] = 'Success';
            const recordInput = {apiName : ACCOUNT_OBJECT.objectApiName,fields};
            createRecord(recordInput).then((result)=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account record created with Id: '+result.id,
                        variant: 'success',
                    }),
                );
                const sentEvent = new CustomEvent('eventreceived',{
                    detail:{objectCreated:true},
                    bubbles:true,
                    composed:false
                });
                this.dispatchEvent(sentEvent);

            }).catch((error) => {
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

    validateForm(){
        const formValidity = [...this.template.querySelectorAll('lightning-input','lightning-combobox')]
        .reduce((validity, input) => {
            input.reportValidity();
            return validity && input.checkValidity();
        }, true);
        return formValidity;
    }

    handleCreateContact(event){
        event.preventDefault();
        //Validate the mandatory Fields
        if(this.validateForm()){
            let fields = {...this.contactObjectData};
            const recordInput = {apiName : CONTACT_OBJECT.objectApiName,fields};
            createRecord(recordInput).then((result)=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record created with Id: '+result.id,
                        variant: 'success',
                    }),
                );
                const sentEvent = new CustomEvent('eventreceived',{
                    detail:{objectCreated:true},
                    bubbles:true,
                    composed:false
                });
                this.dispatchEvent(sentEvent);

            }).catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'error',
                        message: 'Error occured in creating the Contact record',
                        variant: 'error',
                    }),
                );
            });
        }
    }
}