import { api, LightningElement } from 'lwc';

export default class ContactDetails extends LightningElement {
    @api recordId;
    @api objectApiName;
}