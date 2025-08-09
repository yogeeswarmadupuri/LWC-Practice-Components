import { LightningElement } from 'lwc';

export default class EventExampleSuperParent extends LightningElement {
    handleSendContact(event)
    {
        console.log('Super Parent Component');
        console.log(JSON.stringify(event.detail));
    }
}