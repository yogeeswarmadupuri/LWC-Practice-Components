public with sharing class AccountListControllerLwc {

    @AuraEnabled(cacheable=true)
    public static List<Account> queryAccountsByRevenue(Decimal annualRevenue){
        return [Select Id,Name,AnnualRevenue from Account where AnnualRevenue >= :annualRevenue WITH Security_Enforced];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> queryAccountsByEmployeeNumber(Integer numberOfEmployees) {
        return [
            SELECT Name
            FROM Account
            WHERE NumberOfEmployees >= :numberOfEmployees
        ];
    }
}