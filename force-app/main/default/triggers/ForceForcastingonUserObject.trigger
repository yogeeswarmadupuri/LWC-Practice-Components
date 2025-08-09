trigger ForceForcastingonUserObject on User (before insert) {
    for(User userrecord : Trigger.New)
    {
        userrecord.ForceForcasting__c = true;
    }
}