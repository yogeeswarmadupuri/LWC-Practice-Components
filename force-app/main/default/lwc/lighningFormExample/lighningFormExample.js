import { LightningElement,api,track,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class LighningFormExample extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api recordTypeName;
    @track objectInfo;
    @api fieldApiNames;
    fields = [];
    fieldtemp = {};

    @wire(getObjectInfo, { objectApiName: 'Account' })
    objectInfo;

    get recordTypeId() {
        // Returns a map of record type Ids 
        console.log(JSON.stringify(objectInfo.data));
        const rtis = this.objectInfo.data.recordTypeInfos;
        console.log(JSON.stringify(rtis));
        let recordInfo = Object.keys(rtis).find(rti => rtis[rti].name === this.recordTypeName);
        return recordInfo.recordTypeId;
    }

    get fieldApiNameList(){
        if(this.fieldApiNames){
            let fieldApiList = this.fieldApiNames.split(',');
            for(let field =0;field < fieldApiList.length;field++)
            {
                this.fieldtemp['objectApiName'] = this.objectApiName;
                this.fieldtemp['fieldApiName'] = fieldApiList[field];
                this.fields.push({...this.fieldtemp});
            }
        }
        return this.fields;
    }
}