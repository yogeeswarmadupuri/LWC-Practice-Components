public without sharing class UpdateIntegrationStatus {

    public static void handleIntegrationStatus(List<Id> accountIds)
    {
        List<Contact> contactrecords = new List<Contact>();
        Map<Id,List<Id>> accountContactMap = new Map<Id,List<Id>>();
        List<Id> contactIds = new List<Id>();
        Map<Id,String> accountIntegrationMap = new Map<Id,String>();
        for(Account acc : [Select Id,Integration_Status__c,(Select Id from Contacts) from Account where Id IN : accountIds ])
        {
            accountIntegrationMap.put(acc.Id,acc.Integration_Status__c);
            for(contact con : acc.contacts)
            {
               contactIds.add(con.Id); 
            }
        }
        for(Contact cont : [Select Id,Integration_Status__c,AccountId from contact where Id IN : contactIds])
        {
            if(accountIntegrationMap.containsKey(cont.AccountId))
            {
                cont.Integration_Status__c = accountIntegrationMap.get(cont.AccountId);
                contactrecords.add(cont);
            }
        }
        update contactrecords;
    }
}