trigger IntegrationStatusUpdateonContact on Account (after insert,after update) {
List<Contact_Data_Update__e> contactDataUpdateList = new List<Contact_Data_Update__e>();
for(Account acc : Trigger.New)
{
    Contact_Data_Update__e contactDataUpdate = new Contact_Data_Update__e(AccountId__c=acc.Id);
    contactDataUpdateList.add(contactDataUpdate);
}
if(contactDataUpdateList.size()>0)
{
Database.SaveResult[] srs = EventBus.publish(contactDataUpdateList);
}
}