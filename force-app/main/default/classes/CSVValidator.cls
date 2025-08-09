public with sharing class CSVValidator {
    @AuraEnabled
    public static String validateCSV(String csvContent) {
        try {
            List<String> lines = csvContent.split('\n');
            if (lines.isEmpty()) {
                return 'Error: CSV file is empty.';
            }
            String[] headers = lines[0].split(',');
            if (!headers.contains('Name') || !headers.contains('Email')) {
                return 'Error: CSV missing mandatory columns (Name, Email).';
            }
            for (Integer i = 1; i < lines.size(); i++) {
                String[] data = lines[i].split(',');
                Integer emailIndex = getIndex(headers, 'Email');
                if (emailIndex != -1 && !isValidEmail(data[emailIndex])) {
                    return 'Error at line ' + (i + 1) + ': Invalid email format.';
                }
            }
            return 'Success: CSV validation passed.';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
    
    private static Integer getIndex(String[] headersArray, String target) {
        for (Integer i = 0; i < headersArray.size(); i++) {
            if (headersArray[i].trim().equalsIgnoreCase(target)) {
                return i;
            }
        }
        return -1;
    }
    
    private static Boolean isValidEmail(String email) {
        String emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
        Pattern myPattern = Pattern.compile(emailRegex);
        Matcher myMatcher = myPattern.matcher(email.trim());
        return myMatcher.matches();
    }
}