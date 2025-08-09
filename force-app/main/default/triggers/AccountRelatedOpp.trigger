trigger AccountRelatedOpp on Account (before insert,before update,before delete,after insert, after update, after delete,after undelete) {
    if(Trigger.isinsert)
    {
        if(Trigger.isbefore)
        {
            System.debug('Trigger before Insert is executed');
        }else if(Trigger.isafter)
        {
            AccountTriggerHandler.afterInsertOrUpdate(Trigger.New, Trigger.Old);
        }
    }else if(Trigger.isupdate)
    {
        if(Trigger.isbefore)
        {
             System.debug('Trigger before Update is executed');
        }else if(Trigger.isafter)
        {
            AccountTriggerHandler.afterInsertOrUpdate(Trigger.New, Trigger.Old); 
        }        
    }else if(Trigger.isdelete && Trigger.isbefore)
    {
        AccountTriggerHandler.beforeDelete(Trigger.New,Trigger.Old,Trigger.OldMap);
        System.debug('Trigger before delete is executed');
    }else if(Trigger.isUndelete && Trigger.isafter)
    {
         System.debug('Trigger After Undelete is executed');
    }

}