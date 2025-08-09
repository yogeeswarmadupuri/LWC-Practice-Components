trigger integrationStatusUpdate on Contact_Data_Update__e (after insert) {
List<Id> integrationStatusList = new List<Id>();
for(Contact_Data_Update__e event : Trigger.New)
{
integrationStatusList.add(event.AccountId__c);
}
UpdateIntegrationStatus.handleIntegrationStatus(integrationStatusList);
}