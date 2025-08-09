import { api, LightningElement, track, wire } from 'lwc';
import { getRecord,updateRecord} from 'lightning/uiRecordApi';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import LEAD_OBJECT from '@salesforce/schema/Lead';
import FIRSTNAME_FIELD from '@salesforce/schema/Lead.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Lead.LastName'
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import INDUSTRY_FIELD from '@salesforce/schema/Lead.Industry';
import ANNUALREVENUE_FIELD from '@salesforce/schema/Lead.AnnualRevenue';
import LEADSOURCE_FIELD from '@salesforce/schema/Lead.LeadSource';

export default class LeadInformation extends LightningElement {
    @api recordId;
    @api objectApiName;
    editFormtoBeDisplayed = false;
    leadrecordFields = {};
    @track recordData = {};

    leadSourceOptions = [
        { value: 'Web', label: 'Web'},
        {
            value: 'Phone Inquiry',
            label: 'Phone Inquiry'
        },
        {
            value: 'Partner Referral',
            label: 'Partner Referral'
        },
        { value: 'Purchased List', label: 'Purchased List'},
        { value: 'Other', label: 'Other'},
    ];

    industryOption = [
        { value: 'Agriculture', label: 'Agriculture'},
        {
            value: 'Banking',
            label: 'Banking'
        },
        {
            value: 'Communications',
            label: 'Communications'
        },
    ];

    @wire(getObjectInfo,{objectApiName:'Account'})
    wiredAccountObjectData({error,data}){
        console.log('data===>'+data);
        console.log('error====>'+error);
    }

    handleEditInformation(event){
        event.preventDefault();
        this.editFormtoBeDisplayed = true;
    }

    handleOnChange(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.leadrecordFields[name] = value;
    }

    handleupdateLeadInformation(event){
        event.preventDefault();
        const allValid = [...this.template.querySelectorAll('lightning-input','lightning-combobox')]
            .reduce((validSoFar, inputFields) => {
                inputFields.reportValidity();
                return validSoFar && inputFields.checkValidity();
            }, true);
        if(allValid){
            let fields = {...this.leadrecordFields};
            fields['Id'] = this.recordId;
            const recordInput = {fields};
            updateRecord(recordInput).then((result) =>{
                if(result){
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Lead record updated',
                            variant: 'success'
                        })
                    );
                    this.editFormtoBeDisplayed = false;
                }

            }).catch((error) =>{
                console.log(JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error Updating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
        }
    }

    @wire(getRecord,{recordId:'$recordId',fields:[FIRSTNAME_FIELD,LASTNAME_FIELD,EMAIL_FIELD,PHONE_FIELD,TITLE_FIELD,COMPANY_FIELD,INDUSTRY_FIELD,ANNUALREVENUE_FIELD,LEADSOURCE_FIELD]})
    wiredLeadrecords({data,error}){
        if(data){
            this.recordData = data;
        }else{
            console.log(JSON.stringify(error));
        }
    }
}