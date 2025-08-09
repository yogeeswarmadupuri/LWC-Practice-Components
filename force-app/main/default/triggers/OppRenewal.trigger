trigger OppRenewal on Opportunity (before update) {
List<Opportunity> opprenewal = new List<Opportunity>();
string userId = UserInfo.getUserId();
for(Opportunity opp : Trigger.New)
{
if(opp.stageName.contains('Closed') && Trigger.OldMap.get(opp.id).stageName!=opp.stagename)
{
Opportunity oppRen = new Opportunity();
oppRen.OwnerId = userId;
oppRen.Name = opp.Name+ 'Renewal';
oppRen.Amount = opp.Amount;
oppRen.CloseDate = opp.CloseDate.addDays(365);
oppRen.StageName = 'Prospecting';
opprenewal.add(oppRen);
}
}
insert opprenewal;
System.debug('Created Renewal Opportunity is '+opprenewal);
}