import { LightningElement,track } from 'lwc';

export default class AddTaskItems extends LightningElement {
    @track taskTitle = '';
    @track taskPriority = '';
    @track taskList = [];

    options = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High Priority', value: 'High Priority' },
    ];

    handleTextChange(event) {
        this.taskTitle = event.target.value;
    }

    handlePicklistChange(event) {
        this.taskPriority = event.target.value;
    }

    handleButtonClick() {
        if (this.taskTitle && this.taskPriority) {
            this.taskList.push(this.taskTitle + ' - ' + this.taskPriority);
            this.taskTitle = '';
            this.taskPriority = '';
        }
    }
}