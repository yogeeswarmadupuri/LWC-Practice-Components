import { api, LightningElement } from 'lwc';

export default class CaseDetails extends LightningElement {
    @api recordId;
    @api objectApiName;
}