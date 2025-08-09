public class ExceptionHandler {
    
    public static void inserException(Exception ex, String processName)
    {
        Error_Log__c errorLog = new Error_Log__c(
        Log_Details__c = ex.getStackTraceString() + '<br>/'+ex.getMessage()+'<br/>'+ex.getCause()
        +'<br/>'+ex.getLineNumber()+'<br/>'+ex.getTypeName(),
        Lod_DateTime__c = system.now(),
        Process_Name__c = processName);
        if(schema.SObjectType.Error_Log__c.iscreateable())
        {
            insert errorLog;
        }
    }

}