import { LightningElement,api } from 'lwc';

export default class CaseLightningForm extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldapiNames;

    fields = [];
    fieldtemp = {};

    get fieldApiNameList(){
        console.log(JSON.stringify(this.fieldapiNames));
        if(this.fieldapiNames){
            let fieldApiList = this.fieldapiNames.split(',');
            console.log(JSON.stringify(fieldApiList));
            for(let field =0;field < fieldApiList.length;field++)
            {
                this.fieldtemp['objectApiName'] = this.objectApiName;
                this.fieldtemp['fieldApiName'] = fieldApiList[field];
                this.fields.push({...this.fieldtemp});
            }
        }
        console.log(JSON.stringify(this.fields));
        return this.fields;
    }

    handleOnSubmit(event){
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Subject = 'Case is created By Lightning Form'; // modify a field
        this.template.querySelector('lightning-record-form').submit(fields);
    }

}