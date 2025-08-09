public class CountryCodeHelper {
    
    public static String getCountryCode(String country) {
    Country_Code__mdt countryCode = Country_Code__mdt.getInstance(country);
        System.debug('Country Code '+countryCode.Country_Code__c);
    return countryCode.Country_Code__c;
  }

}