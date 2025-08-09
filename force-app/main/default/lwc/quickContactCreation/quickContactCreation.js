import { api, LightningElement } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QuickContactCreation extends LightningElement {
    @api recordId;
    @api objectApiName;
    contactdata = [];

    handleInputdata(event){
        event.preventDefault();
        let {name,value} = event.target;
        this.contactdata[name] = value;
    }

    createContact() {
        //Validate the mandatory Fields
        const formValidity = [...this.template.querySelectorAll('lightning-input','lightning-textarea')]
        .reduce((validity, input) => {
            input.reportValidity();
            return validity && input.checkValidity();
        }, true);
        //Block will excute if all the fields have valid input
        if (formValidity) {
            let fields = {...this.contactdata};
            fields[ACCOUNT_FIELD.fieldApiName] = this.recordId;
            const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(contact => {
                    this.dispatchEvent(new CloseActionScreenEvent());
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Contact created with Id: '+contact.id,
                            variant: 'success',
                        }),
                    );
                })
                .catch(error => {
                    console.error('Error creating Contact: ', JSON.stringify(error));
                });
        }
    }

    handlePopUpClose(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}