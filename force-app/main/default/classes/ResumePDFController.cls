public class ResumePDFController {
    public class ResumeData {
        @AuraEnabled public String name { get; set; }
        @AuraEnabled public String email { get; set; }
        @AuraEnabled public String location { get; set; }
        @AuraEnabled public String experience { get; set; }
        @AuraEnabled public String summary { get; set; }
        @AuraEnabled public List<String> salesforceSkills { get; set; }
        @AuraEnabled public List<WorkExperience> workExperience { get; set; }
        @AuraEnabled public List<Education> education { get; set; }
        @AuraEnabled public List<String> achievements { get; set; }
    }
    
    public class WorkExperience {
        @AuraEnabled public String company { get; set; }
        @AuraEnabled public String position { get; set; }
        @AuraEnabled public String duration { get; set; }
        @AuraEnabled public String project { get; set; }
    }
    
    public class Education {
        @AuraEnabled public String institution { get; set; }
        @AuraEnabled public String degree { get; set; }
        @AuraEnabled public String year { get; set; }
        @AuraEnabled public String grade { get; set; }
    }
    
    public ResumeData resumeData { get; set; }
    
    @AuraEnabled
    public static String generatePDF(ResumeData data) {
        PageReference pdf = Page.ResumeAsPDF;
        pdf.getParameters().put('data', JSON.serialize(data));
        
        // Generate PDF content
        Blob pdfBlob;
        try {
            pdfBlob = pdf.getContent();
            // Convert to base64 for LWC
            return EncodingUtil.base64Encode(pdfBlob);
        } catch(Exception e) {
            throw new AuraHandledException('Error generating PDF: ' + e.getMessage());
        }
    }
    
    public ResumePDFController() {
        // Deserialize the data passed from LWC
        String jsonData = ApexPages.currentPage().getParameters().get('data');
        if(String.isNotBlank(jsonData)) {
            resumeData = (ResumeData)JSON.deserialize(jsonData, ResumeData.class);
        }
    }
}
