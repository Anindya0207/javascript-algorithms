Binary tree
- two nodes max
- Binary search tree is also a binary tree where the left node < root < right
Traversal mechanisms in BT/ BST

- In order Left Root Right display will always generate ascending order if the tree is correct
- Pre order is Root Left Right
- Post order is Left Right Root 

Deletion

- is the node has no left and right?
- is the node has right or left only?
- is the node has both left and right?
    - we will first find out the left most element of the right subtree of the node we have to delete
    - swap the node with the node to be deleted
    - initiate deletion for the swapped node