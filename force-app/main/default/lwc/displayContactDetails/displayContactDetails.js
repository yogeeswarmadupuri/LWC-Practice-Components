import { LightningElement, track } from 'lwc';

export default class DisplayContactDetails extends LightningElement {
    contactJson = {
        "records": [
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "ContactRef1"
            },
            "Id": 1,
            "AccountId": "@AccountRef1",
            "FirstName": "Amy",
            "LastName": "Taylor",
            "Title": "VP of Engineering",
            "Email": "amy@demo.net",
            "Phone": "4152568563",
            "Picture__c": "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/amy_taylor.jpg"
        },
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "ContactRef2"
            },
            "Id": 2,
            "AccountId": "@AccountRef2",
            "FirstName": "Michael",
            "LastName": "Jones",
            "Title": "VP of Sales",
            "Email": "michael@demo.net",
            "Phone": "4158526633",
            "Picture__c": "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/michael_jones.jpg"
        },
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "ContactRef3"
            },
            "Id": 3,
            "AccountId": "@AccountRef1",
            "FirstName": "Jennifer",
            "LastName": "Wu",
            "Title": "CEO",
            "Email": "jennifer@demo.net",
            "Phone": "4158521463",
            "Picture__c": "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jennifer_wu.jpg"
        },
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "ContactRef4"
            },
            "Id": 4,
            "AccountId": "@AccountRef2",
            "FirstName": "Anup",
            "LastName": "Gupta",
            "Title": "VP of Products",
            "Email": "anup@demo.net",
            "Phone": "4158526398",
            "Picture__c": "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/anup_gupta.jpg"
        },
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "ContactRef5"
            },
            "Id": 5,
            "AccountId": "@AccountRef1",
            "FirstName": "Caroline",
            "LastName": "Kingsley",
            "Title": "VP of Technology",
            "Email": "caroline@demo.net",
            "Phone": "4158753654",
            "Picture__c": "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/caroline_kingsley.jpg"
        },
        {
            "attributes": {
                "type": "Contact",
                "referenceId": "ContactRef6"
            },
            "Id": 6,
            "AccountId": "@AccountRef2",
            "FirstName": "Jonathan",
            "LastName": "Bradley",
            "Title": "VP of Operations",
            "Email": "jonathan@demo.net",
            "Phone": "4158885522",
            "Picture__c": "https://s3-us-west-1.amazonaws.com/sfdc-demo/people/jonathan_bradley.jpg"
        }
        ]
    }
    @track contactRecords = this.contactJson.records;
    hideTitletable = true;

    @track filteredContactList = [];

    handleSelectedContact(event){
        this.contactRecords.find((item) => {
            if(item.Email === event.detail.contactEmail && item.FirstName === event.detail.contactFirstName)
            {
                this.filteredContactList.push(item);
            }
        });
        this.hideTitletable = false;
        console.log(JSON.stringify(this.filteredContactList));

    }

    get selectedContactDetails()
    {
        return this.filteredContactList.length>0;
    }
}