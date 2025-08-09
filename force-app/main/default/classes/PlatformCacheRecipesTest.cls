@isTest
public class PlatformCacheRecipesTest {
    
    @isTest
    public static void veridySetandGetCache(){
        List<String> sessionValues = new List<String>{'Yogi','Sai','Deepthi'};
        Cache.Session.put('local.cachepractice.testing', sessionValues,3600);
        List<String> getValues = (List<String>)Cache.Session.get('local.cachepractice.testing');
        System.debug('Get Values ====> '+getValues);
        Assert.areEqual(sessionValues, getValues);
    }
    
    @isTest
    public static void verifyPlatformcacheMethods(){
        String sessionCacheValue = 'Platform Session Cache With out time variable';
        String sessionCacheWithTimeValue = 'Platform Session cache With Time Variable';
        String orgCacheWithOutTimeValue = 'Platform Org Cache With out Time Variable';
        String orgcacheWithTimeValue = 'Platform Org cache With Time variable';
        List<String> myF5Role = new List<String>{'Admin','Basic','Case manager'};
        Map<String,String> pageVsRole = new Map<String,String> {'CreateCase' => 'Basic,Admin,Case Manager','subscriptionDetails' => 'Basic,Admin'};
        
        
        PlatformCacheRecipes.setPartitionName('local.cachepractice');
        String cachePartitionName = PlatformCacheRecipes.getPartitionName();
        System.debug('Cache Partition Name ====> '+cachePartitionName);
        Assert.areEqual('local.cachepractice', cachePartitionName);
        PlatformCacheRecipes.setDefaultTime(7200);
        Integer timeInSeconds = PlatformCacheRecipes.getDefaultTime();
        System.debug('Default Time =====> '+timeInSeconds);
        Assert.areEqual(7200, timeInSeconds);
        
        //Checking Session Cache Methods
        PlatformCacheRecipes.storeValuesAsStringinSession('sessionCacheWithoutTime', sessionCacheValue);
        String sessionActualValue = PlatformCacheRecipes.getStringValueFromSessionCache('sessionCacheWithoutTime');
        System.debug('Session Cache With out Actual Value ====> '+sessionActualValue);
        Assert.areEqual(sessionCacheValue, sessionActualValue);
        PlatformCacheRecipes.storeValueInSessionCache('sessionCacheWithTime', (Object) sessionCacheWithTimeValue, 3600);
        String sessionActualValueWithTime = (String) PlatformCacheRecipes.getValueFromSessionCache('sessionCacheWithTime');
        System.debug('Session cache value with time ====> '+sessionActualValueWithTime);
        Assert.areEqual(sessionCacheWithTimeValue, sessionActualValueWithTime);
        PlatformCacheRecipes.removeKeyFromSessionCache('sessionCacheWithTime');
        String sessionAfterRemove = (String) PlatformCacheRecipes.getValueFromSessionCache('sessionCacheWithTime');
        System.debug('Session After removal ====> '+sessionAfterRemove);
        Assert.isNull(sessionAfterRemove);
        try{
            PlatformCacheRecipes.removeKeyFromSessionCache('sessionCacheWithTime');
        }catch(Exception ex){
            System.debug('Exception message in Session ====> '+ex.getMessage());
        }
        
        PlatformCacheRecipes.storeValuesAsListinSession('sessionCacheAsList',myF5Role);
        PlatformCacheRecipes.storeValuesAsMapinSession('sessioncacheAsMap',pageVsRole);
        List<String> actualList = PlatformCacheRecipes.getListAsValueFromSessionCache('sessionCacheAsList');
        Map<String,String> actualMap = PlatformCacheRecipes.getMapAsValueFromSessionCache('sessioncacheAsMap');
        System.debug('Actual Data as List ====> '+actualList);
        System.debug('Actual map ====> '+actualMap);
        
        //Checking Org cache Methods
        PlatformCacheRecipes.storeValueInOrgCache('orgCacheWithoutTime', orgCacheWithOutTimeValue);
        String orgActualValue = PlatformCacheRecipes.getValuefromOrgCache('orgCacheWithoutTime');
        System.debug('Org Cache With out Actual Value ====> '+orgActualValue);
        Assert.areEqual(orgCacheWithOutTimeValue, orgActualValue);
        PlatformCacheRecipes.storeValueInOrgCache('orgCacheWithTime', orgcacheWithTimeValue, 3600);
        String orgActualValueWithTime = PlatformCacheRecipes.getValuefromOrgCache('orgCacheWithTime');
        System.debug('Org cache value with time ====> '+orgActualValueWithTime);
        Assert.areEqual(orgActualValueWithTime, orgcacheWithTimeValue);
        PlatformCacheRecipes.removeKeyFromOrgCache('orgCacheWithTime');
        String orgAfterRemove = PlatformCacheRecipes.getValuefromOrgCache('orgCacheWithTime');
        System.debug('Org After removal ====> '+orgAfterRemove);
        Assert.isNull(orgAfterRemove);
        try{
            PlatformCacheRecipes.removeKeyFromOrgCache('orgCacheWithTime');
        }catch(Exception ex){
            System.debug('Exception message in Org ====> '+ex.getMessage());
        }
    }

}