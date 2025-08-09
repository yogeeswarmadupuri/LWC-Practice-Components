public class ClosedOwnOpportunityValidation {
    public static void restrictUserFromdeletingClosedOwnOpp(Set<Account> accountRecords)
    {
        Set<Id> accountIds = new Set<Id>();
        for(Account acc : accountRecords)
        {
            accountIds.add(acc.Id);
        }
        
        for(Account acclist : [Select Id,(Select Id,StageName from Opportunities) from Account where Id =: accountIds])
        {
            for(Opportunity opp : acclist.Opportunities)
            {
                if(opp.stageName=='Closed Won')
                {
                    acclist.addError('The Account is associated with Closed Won Opportunity.Please reassign the opportunity and do the account deletion');
                    break;
                }
            }
        }
    }
}