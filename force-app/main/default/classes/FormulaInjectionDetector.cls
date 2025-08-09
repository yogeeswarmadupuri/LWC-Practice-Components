public class FormulaInjectionDetector {
    private static final String REGEX_PATTERN = '(?i).*(^=|\\+|-|@|HYPERLINK\\(|IF\\(|VLOOKUP\\(|CONCATENATE\\(|TEXT\\(|DATEVALUE\\(|TIMEVALUE\\(|DATETIMEVALUE\\().*';

    public static void validateFieldValue(String fieldValue, String fieldName) {
        if (Pattern.matches('.*' + REGEX_PATTERN + '.*', fieldValue)) {
            throw new CustomException('Potential formula injection detected in ' + fieldName + ': ' + fieldValue);
        }
    }

    public static void validateAccountFields(Account account) {
        List<String> fieldsToValidate = new List<String> { 'Name', 'Website', 'Phone', 'Description' };

        for (String field : fieldsToValidate) {
            Object fieldValue = account.get(field);
            if (fieldValue != null && fieldValue instanceof String) {
                validateFieldValue((String) fieldValue, field);
            }
        }
    }
}