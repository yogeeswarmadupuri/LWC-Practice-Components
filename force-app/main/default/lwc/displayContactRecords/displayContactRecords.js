import { api, LightningElement,track } from 'lwc';

export default class DisplayContactRecords extends LightningElement {
  @api contactList=[];

  get displayTableContent()
  {
    return this.contactList.length>0;
  }
}