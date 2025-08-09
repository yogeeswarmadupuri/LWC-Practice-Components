@RestResource(urlMapping = '/apexSecurityRest')
global with sharing class ApexSecurityRest {
    @HttpGet
    global static Contact doGet() {
        Id recordId = RestContext.request.params.get('id');
        Contact result;

        if (recordId == null) {
            throw new FunctionalException('Id parameter is required');
        }

        List <Contact> results = [SELECT Id, Name, Title, Top_Secret__c, Account.Name FROM Contact WHERE Id =: recordId];

        SObjectAccessDecision securityDecision = Security.stripInaccessible(AccessType.READABLE, results); //Security.StripInaccessible

        if (! results.isEmpty()) {
            result = (Contact)securityDecision?.getRecords()[0];  //safe navigation
            result.Description = result?.Account?.Name; //safe navigation
        }
        return result;
    }

    public class FunctionalException extends Exception {}
}