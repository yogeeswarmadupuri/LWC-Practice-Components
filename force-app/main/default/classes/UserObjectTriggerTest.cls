@isTest 
public class UserObjectTriggerTest {
    static testMethod void insertNewUser() {
       
       User userToCreate = new User();
       List<Profile> UserprofileId = [Select Id from profile Where Name = 'Standard User' limit 1];
       // Do you recognize these fields?
       userToCreate.FirstName = 'David';
       userToCreate.LastName  = 'Liu';
       userToCreate.Email     = 'dvdkliu+sfdc99@gmail.com';
       userToCreate.Username  = 'sfdc-dreamer@gmail.com784582758745434746872628743';
       userToCreate.Alias     = 'fatty';
       userToCreate.ProfileId = UserprofileId[0].id;

       // Don't worry about these
       userToCreate.TimeZoneSidKey    = 'America/Denver';
       userToCreate.LocaleSidKey      = 'en_US';
       userToCreate.EmailEncodingKey  = 'UTF-8';
       userToCreate.LanguageLocaleKey = 'en_US';
       
       insert userToCreate;
    }
}