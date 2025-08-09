import { LightningElement } from 'lwc';

export default class TwoButtonClickAssignment extends LightningElement {
    displayButton1text = false;
    displayButton2text = false;

    handleButton1Click(){
        this.displayButton1text = true;
    }

    handleButton2Click(){
        this.displayButton2text = true;
    }
}