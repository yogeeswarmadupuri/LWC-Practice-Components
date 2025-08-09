import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MyF5Modal extends LightningModal {
    isChecked = false;
    errorMessages = new Set(['Error message 1', 'Error message 2', 'Error message 3']);

    get errors() {
        return [...this.errorMessages];
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
    }

    handleCancel() {
        this.close('cancel');
    }

    handleConfirm() {
        if (this.isChecked) {
            this.close('confirm');
        } else {
            const checkbox = this.template.querySelector('lightning-input');
            checkbox.reportValidity();
        }
    }
}