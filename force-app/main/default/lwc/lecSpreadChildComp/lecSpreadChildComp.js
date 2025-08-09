import { api, LightningElement } from 'lwc';

export default class LecSpreadChildComp extends LightningElement {
    @api firstName;
    @api lastName;
    @api email;
    @api phone;
}