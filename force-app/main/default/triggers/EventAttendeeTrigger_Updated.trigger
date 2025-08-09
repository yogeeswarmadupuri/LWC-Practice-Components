trigger EventAttendeeTrigger_Updated on Event_Attendee__c (after insert) {
    
    if(Trigger.isafter && Trigger.isinsert)
    {
        SendEmailConfirmationToAttendee.doSendConfirmationEmail(Trigger.New);
    }
}