import { api, LightningElement } from 'lwc';

export default class WireAccountInformation extends LightningElement {
    @api selectedAccountList;

    get isAccountSelected(){
        return this.selectedAccountList.length>0;
    }
}