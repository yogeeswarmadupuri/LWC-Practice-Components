public class MapCreator {
    public static Map<String, SObject> createMapByIndex(List<SObject> aList, String indexField) {
    //https://learnsf.wordpress.com/2014/12/29/trick-how-to-obtain-a-map-indexed-by-any-field-not-just-id-faster-and-without-loops/
    // get the list in JSON format
    String jsonList = JSON.serialize( aList );
    
    // remove enclosing []
    jsonList = jsonList.substring( 1,jsonList.length()-1);
    
    // copy the indexField value in front of each
    // {} group using RegEx substitution
    // example result: value:{…”indexField”:”value”…}
    jsonList = '{' + jsonList.replaceAll('(\\{.*?"' + indexField + '":"(.*?)"(,".*?"")*\\},?)', '"$2":$1' ) + '}';
    
    // create map from the modified JSON
    Map<String, SObject> changedMap = (Map<String, SObject>) JSON.deserialize(jsonList, Map<String, SObject>.class);
    
    return changedMap;
    }

}