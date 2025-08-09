import { LightningElement, api } from 'lwc';

export default class LwcRefChildComponent extends LightningElement {
    _firstName;
    _lastname;
    _department;

    get firstName() {
        return this._firstName;
    }
    @api
    set firstName(value) {
        this._firstName = value;
    }

    get lastname() {
        return this._lastname;
    }

    @api
    set lastname(value) {
        this._lastname = value;
    }

    get department() {
        return this._department;
    }

    @api
    set department(value) {
        this._department = value;
    }
}
