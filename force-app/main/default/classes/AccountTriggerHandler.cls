public class AccountTriggerHandler {

    public static void afterInsertOrUpdate(List<Account> newAccounts,List<Account> oldAccounts)
    {
        List<Opportunity> opplist = new List<Opportunity>();
        string userid = userinfo.getUserId();
        Map<Id,Account> accountOppMap = new Map<Id,Account>([Select Id,(Select Id, Name from Opportunities) from Account where Id IN : newAccounts]);
       	System.debug('New Account List are '+accountOppMap);
        for(Account acc : newAccounts)
        {
            System.debug('accountOppMap.get(acc.Id).Opportunities.size()=' + accountOppMap.get(acc.Id).Opportunities.size());
            if(accountOppMap.get(acc.Id).Opportunities.size()==0)
            {
                Opportunity opp = new Opportunity();
                opp.Name = acc.Name + ' Opportunity';
                opp.Amount = 10000.00;
                opp.StageName= 'Prospecting';
                opp.CloseDate = system.today().addmonths(1);
                opp.OwnerId = userid;
                opp.AccountId = acc.Id;
                opplist.add(opp);
            }
        }
        if(opplist.size()>0)
        {
            insert opplist;
            System.debug(opplist.size() + ' Opportunity Records are Created Succesfully');
        }
    }
    
    public static void beforeDelete(List<Account> newAccounts,List<Account> oldAccounts,Map<Id,Account> oldAccountMap)
    {
        for(Account Acc : [SELECT Id FROM Account WHERE Id IN (SELECT AccountId FROM Opportunity) AND Id IN :oldAccounts])
        {
            oldAccountMap.get(acc.Id).addError('Cannot delete account with related opportunities.');
        }
    }
}