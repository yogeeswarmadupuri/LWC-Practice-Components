import { LightningElement, track, wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountDetailsController.getAccountDetails';

export default class WireAccountList extends LightningElement {

    @track accountDetailsList;
    @track error;
    @track selectedAccountDetails=[];

    @wire(fetchAccounts)
    getAccountDetail({data,error}){
        if(data){
            this.accountDetailsList = data;
        }else{
            this.error = error;
        }
    }

    handleEventReceived(event){
        event.preventDefault();
        this.selectedAccountDetails = this.accountDetailsList.filter((item) => 
            item.Name === event.detail.selectedName && item.Phone === event.detail.selectedPhone
        );
    }

}