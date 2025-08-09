public without sharing class IntegerComparator extends Comparator {
    
    public override Boolean compare(Object obj1, Object obj2){
        return (Integer)obj1 == (Integer)obj2;
    }
}