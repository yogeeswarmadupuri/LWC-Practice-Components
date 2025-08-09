import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track isModalOpen = false;
    @track isChecked = false;
    errorMessages = new Set(['Error message 1', 'Error message 2', 'Error message 3']);

    get errors() {
        return [...this.errorMessages];
    }

    handleShowModal() {
        this.isModalOpen = true;
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
    }

    handleCancel() {
        this.isModalOpen = false;
    }

    handleConfirm() {
        if (this.isChecked) {
            console.log('Checkbox is checked');
            this.isModalOpen = false;
        } else {
            const checkbox = this.template.querySelector('lightning-input');
            checkbox.reportValidity();
        }
    }
}