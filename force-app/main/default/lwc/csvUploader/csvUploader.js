import { LightningElement, track } from 'lwc';
import validateCSV from '@salesforce/apex/CSVValidator.validateCSV';

export default class CsvUploader extends LightningElement {
    @track validationResult;

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const csvContent = reader.result;
                this.validateCSVContent(csvContent);
            };
            reader.readAsText(file);
        }
    }

    validateCSVContent(csvContent) {
        validateCSV({ csvContent })
            .then(result => {
                this.validationResult = result;
            })
            .catch(error => {
                this.validationResult = 'Error: ' + error.body.message;
            });
    }
}