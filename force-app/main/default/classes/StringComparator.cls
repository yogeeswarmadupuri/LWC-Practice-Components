public without sharing class StringComparator extends Comparator {
    
    public override Boolean compare(Object obj1, Object obj2){
        String data1 = (String) obj1;
        String data2 = (String) obj2;

        return data1.equals(data2);
    }
}