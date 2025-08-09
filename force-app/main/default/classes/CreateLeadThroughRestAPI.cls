@RestResource(urlMapping='/v1/leadmanagement/')
global class CreateLeadThroughRestAPI {

    @HttpPost
    global static String createLead(String firstName,String lastName,String email,String companyName,String leadSource,String annualRevenue,String description)
    {
        Lead led = new Lead();
        led.FirstName = firstName;
        led.LastName = lastName;
        led.Email = email;
        led.Company = companyName;
        led.LeadSource = leadSource;
        led.AnnualRevenue = integer.valueof(annualRevenue);
        led.Description = description;
        led.Status = 'Open - Not Contacted';
        insert led;
        return 'Lead Record Created Succesfully with Lead unique Id as '+led.Id;
    }
    
    @HttpGet
    global static Lead getLeadDetails()
    {
        Map<String, String> paramsMap = RestContext.request.params;
        String leadid = paramsMap.get('Id');
       	Lead leadRecord =  [Select Id,Name,AnnualRevenue,Email,Status,Title,Company from Lead where Id =: leadid];
        return leadRecord;
    }
    
    @HttpPut
    global static String updateLeadRecord(String id,String annualRevenue,String Status)
    {
        Lead led = new Lead();
        led.Id = id;
        led.AnnualRevenue = Integer.valueOf(annualRevenue);
        led.Status = status;
        update led;
        return 'Lead record is updated';
    }
}