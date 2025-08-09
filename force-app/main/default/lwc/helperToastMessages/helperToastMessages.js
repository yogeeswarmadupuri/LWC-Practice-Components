import { api, LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class HelperToastMessages extends LightningElement {

    @api message;
    @api title;
    @api variant;
    @api mode;
    @api messageData;
    connectedCallback(){

        let showToastobject = {
            title: this.title,
            message: this.message,
            variant:this.variant,
            mode: this.mode
        }
        if(this.messageData){
            showToastobject.messageData = this.messageData;
        }
        const toastEvent = new ShowToastEvent({showToastobject
        });
        this.dispatchEvent(toastEvent);
    }
    showToast(){
        const toastEvent = new ShowToastEvent({
            title: 'Success Toast message',
            message: 'Success Toast message',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(toastEvent);
    }

    onFailureToast(){
        const toastEvent = new ShowToastEvent({
            title: 'Failure Toast message',
            message: 'Failure Toast Message',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(toastEvent);
    }

    onInfoToast(){
        const toastEvent = new ShowToastEvent({
            title: 'Info Toast message',
            message: 'Info Toast Message',
            variant: 'info',
            mode: 'dismissable'
        });
        this.dispatchEvent(toastEvent);
    }
}