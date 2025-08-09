import { LightningElement, track } from 'lwc';

export default class RegistrationFormAssignment extends LightningElement {
    nameFieldValue;
    nameToBeDisplayed = false;
    emailFieldvalue;
    emailToBeDisplayed= false;

    @track departments = [{name: "ECE",value: "ECE"},
                {name:"CSE",value:"CSE"},{name:"EEE",value:"EEE"},{name:"IT",value:"IT"}]

    handleInputChange(event) {
        this.nameToBeDisplayed = true;
        this.nameFieldValue = event.detail.value;
    }

    handleEmailChange(event) {
        this.emailToBeDisplayed = true;
        this.emailFieldvalue = event.detail.value;
    }

    get hasOptions()
    {
        return this.departments && this.departments.length>0;
    }
}