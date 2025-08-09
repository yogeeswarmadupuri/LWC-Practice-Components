trigger ClosedOwnOpportunityDeletion on Account (before delete) {
    Set<Id> accountIds = Trigger.OldMap.KeySet();
    List<Opportunity> oppList = [Select Id,Name,StageName,AccountId from Opportunity where accountId IN : accountIds and  IsWon = true];
    Map<Id,List<opportunity>> accountOppMap = new Map<Id,List<Opportunity>>();
    for(Opportunity opp : oppList)
    {
        if(accountOppMap.keySet().contains(opp.AccountId))
        {
            accountOppMap.get(opp.AccountId).add(opp);
        }else
        {
            accountOppMap.put(opp.AccountId, new List<opportunity>{opp});
        }
    }
    for(Account acc : Trigger.Old)
    {
        if(accountOppMap.keySet().contains(acc.Id))
        {
            acc.addError('The user not allowed to delete the account having closed own opportunity');
        }
    }
}