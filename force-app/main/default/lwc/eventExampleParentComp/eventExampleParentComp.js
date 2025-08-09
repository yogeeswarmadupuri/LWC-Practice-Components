import { LightningElement } from 'lwc';

export default class EventExampleParentComp extends LightningElement {

    users = [
        {name:'Yogeeswar',email:'yogeeswar@gmail.com'},{name:'Sai Sruthi',email:'sruthi@gmail.com'},{name:'Deepthi',email:'deepthi@gmail.com'}];

    handleSendContact(event)
    {
        console.log('Parent Component');
        console.log(JSON.stringify(event.detail));
    }
}