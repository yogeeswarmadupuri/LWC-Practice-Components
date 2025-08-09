import { LightningElement } from 'lwc';
import profilePic from '@salesforce/resourceUrl/profilePhoto';

export default class ProfileComponent extends LightningElement {
    // Expose the static resource URL to the template
    profilePicUrl = profilePic;
}