import { LightningElement, track,api } from 'lwc';

export default class DisplayContactListWithTitle extends LightningElement {
    @api contactList;
    
    get contactRecordSize()
    {
        return this.contactList.length;
        
    }
    triggerEvent(event){
        event.preventDefault();
        const contactEvent = new CustomEvent('selectedcontact', {bubbles :true,
            
            detail: { contactEmail: event.currentTarget.dataset.email,
                contactFirstName: event.currentTarget.dataset.firstname,
                contactLastName: event.currentTarget.dataset.lastname
        },
        composed:true
        });
        this.dispatchEvent(contactEvent);
    }
}