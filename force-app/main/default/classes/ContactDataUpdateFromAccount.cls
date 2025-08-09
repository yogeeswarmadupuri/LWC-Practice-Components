global class ContactDataUpdateFromAccount implements Database.Batchable<sObject> {

   global Database.QueryLocator start(Database.BatchableContext BC) {
        String query = 'Select Id,Integration_Status__c,(Select Id from Contacts) from Account where Integration_Status__c != null';
        return Database.getQueryLocator(query);
    }
     
    global void execute(Database.BatchableContext BC, List<Account> accList) {
        try {
            List<Contact> contactrecords = new List<Contact>();
            Map<Id,List<Id>> accountContactMap = new Map<Id,List<Id>>();
            List<Id> contactIds = new List<Id>();
            Map<Id,String> accountIntegrationMap = new Map<Id,String>();
            for(Account acc : accList)
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
            // Update the Account Record
            update contactrecords;
         
        } catch(Exception e) {
            System.debug(e);
        }
         
    }   
     
    global void finish(Database.BatchableContext BC) {
        // execute any post-processing operations like sending email
    }
}