If a BSt is like 10 - 20 - 30- 40- 50- 60- 70- 80- 90

then it's all operation will be in n, not logn

- it's called Skew BST

- This is worst case time complexity

- This becomes same as linked list

- some how we need to balance this tree to make lesser time complexity

- Convert a skew BST to a balanced BST

# AVL Tree

it manages a BF ( balance factor)

BF = lH (height of left tree) - rH (height of right tree) Height doesn't mean number of nodes. it means how many levels of sub tree are there


BF should be either -1 0 1

If BF goes beyond that range we have to do rotation

Four types of rotation - LL RR LR RL

We need to do rotation at the time of insertion only

# LL Rotation

If any node which got inserted which disbalanced the tree's root node 

then we need to do a rotation in clockwise direction. since it's happening from left to right, we call this a single left rotation (LL)