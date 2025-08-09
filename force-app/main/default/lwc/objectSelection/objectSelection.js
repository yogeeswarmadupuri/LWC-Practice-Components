import { LightningElement } from 'lwc';

export default class ObjectSelection extends LightningElement {

    objectOptions = [{label:"Account", value: "Account"},
                        {label: "Contact", value: "Contact"},
                        {label: "Opportunity", value: "Opportunity"}];
    selectedValue;
    handleChange(event){
        event.preventDefault();
        this.selectedValue = event.target.value;
        console.log(this.selectedValue);
    }

    handleEventreceived(event){
        console.log('Evenet Received and Processed');
        this.selectedValue = null;
    }
}