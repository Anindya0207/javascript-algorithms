Linked list

In the beginning array has to be specified with the size which is the biggest problem with array in DS

1. single linked list -> one node points to another node
2. double linked listv -> the next node can point to the previous node (advantage is we can traverse from any node to any node. disadvantage is space complexity)
3. circular linked list -> there won't be ref of all parent and child but one child node can point to one parent node
4. circular double linked list => so every node will have parent and child reference and last node will point to the first node


we need to remember the starting address - the address of the first node - we call it head
this will be globally defined
every element will have next and previous (if double linked list) and value stored


