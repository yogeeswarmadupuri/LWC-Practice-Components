import { LightningElement,track , wire} from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountDetailsController.getAccountDetailsWithLimit';

export default class WiredAccountListWithButton extends LightningElement {


    @track accountDetailsList;
    @track error;
    @track accountlimit = 10;

    @wire(fetchAccounts,{limitNum : '$accountlimit'})
    getAccountDetail({data,error}){
        if(data){
            
            this.accountDetailsList = data;
        }else{
            this.error = error;
        }
    }
    handleClick(event){
        event.preventDefault();
        if(this.accountlimit > 0){
            this.accountlimit -= 1;
            console.log('account Limit Sub Value',this.accountlimit);
        }else{
            this.accountlimit += 1;
            console.log('account Limit Add Value',this.accountlimit);
        }
    }
}