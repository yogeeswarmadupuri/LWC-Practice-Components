import { LightningElement, wire ,api} from 'lwc';
import queryAccountsByRevenue from '@salesforce/apex/AccountListControllerLwc.queryAccountsByRevenue';

export default class AccountFinder extends LightningElement {
    annualRevenue = null;
    @api recordId;

    @wire(queryAccountsByRevenue, {annualRevenue:'$annualRevenue'})
    accounts;

    handleChange(event){
        this.annualRevenue = event.detail.value;
    }

    reset(){
        this.annualRevenue = null;
    }
}