trigger DuplicateRecordsOnEventSpeaker on EventSpeakers__c (before insert,before Update) {
    Set<Id> speakerId = new Set<Id>();
    Map<Id,List<Id>> eventDataMap = new Map<Id,List<Id>>();
    for(EventSpeakers__c eventSpeaker : Trigger.New)
    {
        speakerId.add(eventSpeaker.Speaker__c);
    }
    List<EventSpeakers__c> eventSpeakerList = [Select Id,Speaker__c,Event__r.Start_DateTime__c,Event__c from EventSpeakers__c where Speaker__c =:speakerId];
    for(EventSpeakers__c eventListItr : eventSpeakerList)
    {
        if(eventDataMap.keySet().contains(eventListItr.Speaker__c))
        {
            eventDataMap.get(eventListItr.Speaker__c).add(eventListItr.Event__c);
        }else
        {
            eventDataMap.put(eventListItr.Speaker__c, new List<Id>{eventListItr.Event__c});
        }
    }
    for(EventSpeakers__c eventSpeaker : Trigger.New)
    {
        if(eventDataMap.keySet().contains(eventSpeaker.Speaker__c) && eventDataMap.get(eventSpeaker.Speaker__c).contains(eventSpeaker.Event__c))
        {
            eventSpeaker.Speaker__c.addError('The Speaker is already booked for this Event');
            eventSpeaker.addError('The Speaker is already booked for this Event');
        }
    }
}