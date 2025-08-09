import { LightningElement,api } from 'lwc';

export default class EventExampleChildComp extends LightningElement {
    @api contactRecordList;

    handleClick(event){
        event.preventDefault();
        let fireCustomEvent = new CustomEvent('sendcontact',{
            detail:this.contactRecordList,
            bubbles:true,
            composed:true
        });
        this.dispatchEvent(fireCustomEvent);
    }
}