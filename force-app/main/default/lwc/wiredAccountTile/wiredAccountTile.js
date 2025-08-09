import { LightningElement,api } from 'lwc';

export default class WiredAccountTile extends LightningElement {
    @api accountDetailsList;

    handleSelectedAccount(event){
        event.preventDefault();
        const selectedAccount = new CustomEvent('eventreceived',{
            detail:{
                selectedName: event.currentTarget.dataset.name,
                selectedPhone: event.currentTarget.dataset.phone
            },bubbles:true,
            composed:false
        });
        this.dispatchEvent(selectedAccount);
    }
}