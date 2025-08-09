import { LightningElement,track } from 'lwc';

export default class LwcRefParentComponent extends LightningElement {
    @track userDetails = {
        firstName : 'Yogeeswar',
        lastName : 'Madupuri',
        department : 'IT',
    };
}