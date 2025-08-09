public class BinarySearch {
    
    public static Integer searchTheValue(List<Integer> integerArray,Integer targetValue){
        Integer start = 0;
        Integer endVal = integerArray.size()-1;
        System.debug('Start value before Iterate ===> '+start);
        System.debug('End Value before Iteration ====> '+endVal);
        while(start <= endVal){
            
            Integer middle = start + (endVal - start)/2;
            System.debug('Middle Value ====> '+middle);
            if(integerArray[middle] == targetValue){
                return middle;
            }else if(integerArray[middle] > targetValue){
                endVal = middle -1;
                System.debug('End Value in the Iteration ====> '+endVal);
            }else{
                start = middle + 1;
                System.debug('Start Value in the Iteration ====> '+start);
            }
        }
        return start;
    }

}