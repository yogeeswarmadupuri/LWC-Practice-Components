public with sharing class AccountDetailsController {

    @AuraEnabled( cacheable = true )
    public static List<Account> getAccountDetails()
    {
        return [Select Id,Name,Phone, Rating, Industry, Type, Website, NumberOfEmployees, BillingAddress,CreatedDate from Account order by CreatedDate desc LIMIT 100];
    }

    @AuraEnabled( cacheable = true )
    public static List<Account> getAccountDetailsWithLimit(String limitNum)
    {
        return [Select Id,Name,Phone, Rating, Industry, Type, Website, NumberOfEmployees, BillingAddress,CreatedDate from Account order by CreatedDate desc LIMIT : Integer.valueof(limitNum)];
    }

    @AuraEnabled
    public static Account createAccount(String accountDetails){
        try {
            AccountDetailsWrapper accountWrapper = (AccountDetailsWrapper)JSON.deserialize(accountDetails,AccountDetailsWrapper.class);
            System.System.debug('Account Wrapper ====> '+accountWrapper);
            Account acct = new Account();
            acct.Name = accountWrapper.name;
            acct.Phone = accountWrapper.phone;
            acct.Integration_Status__c = accountWrapper.integration;
            acct.Industry = accountWrapper.industry;
            acct.Website = accountWrapper.website;
            acct.NumberOfEmployees = Integer.valueof(accountWrapper.noOfEmployees);
            acct.Type = accountWrapper.type;
            acct.Rating = accountWrapper.rating;
            insert acct;
            if(acct.Id != null){
                return acct;
            }else {
                return new Account();
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public Class AccountDetailsWrapper{
        @AuraEnabled
        public String name {get; set;}
        @AuraEnabled
        public String phone {get; set;}
        @AuraEnabled
        public String integration {get; set;}
        @AuraEnabled
        public String industry {get; set;}
        
        @AuraEnabled
        public String noOfEmployees {get; set;}
        @AuraEnabled
        public String website {get; set;}
        @AuraEnabled
        public String type {get; set;}
        @AuraEnabled
        public String rating {get; set;}
    }
}