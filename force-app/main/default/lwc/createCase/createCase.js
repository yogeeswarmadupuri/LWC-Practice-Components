import { LightningElement,api } from 'lwc';
import CASE_OBJECT from "@salesforce/schema/Case";
import CONTACT_FIELD from "@salesforce/schema/Case.ContactId";
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateCase extends LightningElement {

    caseData=[];
    @api recordId;
    @api objectApiName;

    statusOptions = [
        { value: 'new', label: 'New', description: 'A new item' },
        {
            value: 'in-progress',
            label: 'In Progress',
            description: 'Currently working on this item',
        },
        {
            value: 'finished',
            label: 'Finished',
            description: 'Done working on this item',
        },
    ];

    priorityOptions = [
        { value: 'High', label: 'High'},
        {
            value: 'Medium',
            label: 'Medium'
        },
        {
            value: 'Low',
            label: 'Low'
        },
    ];

    regionOptions = [
        { value: 'APJC', label: 'APJC'},
        {
            value: 'EMEA',
            label: 'EMEA'
        },
        {
            value: 'LATAM',
            label: 'LATAM'
        },
        {
            value: 'NA',
            label: 'NA'
        },
    ];

    handleChangeddata(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.caseData[name] = value;
    }

    createCase() {
        //Validate the mandatory Fields
        const formValidity = [...this.template.querySelectorAll('lightning-input','lightning-textarea','lightning-combobox')]
        .reduce((validity, input) => {
            input.reportValidity();
            return validity && input.checkValidity();
        }, true);
        //Block will excute if all the fields have valid input
        if (formValidity) {
            let fields = {...this.caseData};
            fields[CONTACT_FIELD.fieldApiName] = this.recordId;
            const recordInput = { apiName: CASE_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(result => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Case created with Id: '+result.id,
                            variant: 'success',
                        }),
                    );
                })
                .catch(error => {
                    console.error('Error creating Case: ', JSON.stringify(error));
                });
        }
    }
}