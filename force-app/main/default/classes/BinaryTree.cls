/**
* @description A class to represent a binary tree
 * This class offers an insert method to insert objects into the binary tree
 * and a print method to print the binary tree level by level
 */

public without sharing class BinaryTree {
    
    /**
     * The root node of the binary tree.
     */
    Node root;
    /**
     * A node in the binary tree.
     */
    public class Node{ // NOPMD
        /**
         * The data stored in the node.
         */
        Object data;
        /**
         * The left child node.
         */
        Node left;
        /**
         * The right child node.
         */
        Node right;
        /**
         * @description Creates a new node with the given data.
         *
         * @param data the data to be stored in the node
         */
        Node(Object data){
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }
    

    /**
     * @description Inserts a new node into the binary tree.
     *
     * @param data the data to be inserted into the tree
     */
    private void inserBinnaryTree(Object data){

        if(root == null){
            root = new Node(data);
            return;
        }

        List<Node> nodesQueue = new List<Node>();
        nodesQueue.add(root);

        while (!nodesQueue.isEmpty()) {
            Node current = nodesQueue.get(0);
            nodesQueue.remove(0);

            if(current.left == null){
                current.left = new Node(data);
                return;
            }else {
                nodesQueue.add(current.left);
            }

            if(current.right == null){
                current.right = new Node(data);
                return;
            }else {
                nodesQueue.add(current.right);
            }
        }
    }

    /**
     * @description Creates a binary tree from a list of objects.
     *
     * @param data the list of objects to be inserted into the tree
     */
    public void createBinaryTree(List<Object> data){
        for(Object obj : data){
            inserBinnaryTree(obj);
        }
    }
    /**
    * @description Prints the binary tree level by level.
     */
    public void orderLevelPrint(){

        if(root == null){
            
            return;
        }

        List<Node> nodesQueue = new List<Node>();
        nodesQueue.add(root);
        String result = '\n';
        result = printLevel(nodesQueue, result);
        
    }
    /**
     * @description Prints a level of the binary tree.
     *
     * @param nodesQueue the queue of nodes to be printed
     * @param result the string to append the level to
     * @return the updated result string
     */
    private string printLevel(List<Node> nodesQueue,String result){
        Boolean listEmpty = false;
        if(nodesQueue.isEmpty()){
            return result;
        }
        Integer nodecurrentLevelSize = nodesQueue.size();

        for(Integer i=0;i<nodecurrentLevelSize;i++){
            Node current = nodesQueue.remove(0);
            result += current.data + ' ';
            if (current.left != null) {
                nodesQueue.add(current.left);
            }

            if (current.right != null) {
                nodesQueue.add(current.right);
            }
        }
        result += '\n';
        System.debug('Result before Level ====> '+result);
        printLevel(nodesQueue, result);
        System.debug('Result Adter Level ====> '+result);
        return result;
    }

    public void createBinaryTreeUsingParent(Object data,Object parentData,Comparator comparator){
        if(root ==null){
            root = new Node(data);
            return;
        }

        insertDataRecursive(root, parentData, data, comparator);
    }

    private Node insertDataRecursive(Node root, object parentData, Object data,Comparator comparator){

        if(comparator.compare(root.data, parentData)){

            if(root.left == null){
                root.left = new Node(data);
                return root.left;
            }else if (root.right == null) {
                root.right = new Node(data);
                return root.right;
            }else {
                return null;
            }
        }else {
            if(root.left != null){
                Node left = insertDataRecursive(root.left, parentData, data, comparator);
                if(left != null){
                    return left;
                }
            }
            
            if (root.right != null) {
                Node right = insertDataRecursive(root.right, parentData, data, comparator);

                if(right != null){
                    return right;
                }
            }
            return null;
        }
    }
}