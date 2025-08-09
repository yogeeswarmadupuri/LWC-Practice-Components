import { LightningElement,track } from 'lwc';

export default class CreateRegistrationForm extends LightningElement {
    @track contactRecord = {};
    @track contactRecordsList = [];


    handleChangeEvent(event){
        event.preventDefault();
        let element = event.target;
        let nameVal = element.name;
        let value = element.value;
        this.contactRecord[nameVal] = value;
    }

    createContact(){
        this.contactRecordsList.push({...this.contactRecord});
    }
}