@isTest
public class FormulaInjectionDetectorTest {
    @isTest
    static void testValidAccount() {
        Account acc = new Account(Name = 'Test Account', Website = 'https://example.com');
        FormulaInjectionDetector.validateAccountFields(acc);
        // If no exception is thrown, the test passes
        System.assert(true, 'No exception thrown for valid account');
    }

    @isTest
    static void testInvalidAccountName() {
        Account acc = new Account(Name = '=HYPERLINK("https://malicious.com")');
        try {
            FormulaInjectionDetector.validateAccountFields(acc);
            System.assert(false, 'Expected CustomException to be thrown');
        } catch (CustomException e) {
            System.assertEquals('Potential formula injection detected in Name: =HYPERLINK("https://malicious.com")', e.getMessage());
        }
    }

    @isTest
    static void testInvalidAccountWebsite() {
        Account acc = new Account(Website = 'https://example.com IF(TRUE, "malicious", "safe")');
        try {
            FormulaInjectionDetector.validateAccountFields(acc);
            System.assert(false, 'Expected CustomException to be thrown');
        } catch (CustomException e) {
            System.assert(e.getMessage().contains('Potential formula injection detected in Website'));
        }
    }

    @isTest
    static void testNullFieldValues() {
        Account acc = new Account(Name = null, Website = null);
        FormulaInjectionDetector.validateAccountFields(acc);
        // If no exception is thrown, the test passes
        System.assert(true, 'No exception thrown for null field values');
    }
}