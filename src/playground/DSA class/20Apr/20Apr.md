If a BST is like 10 - 20 - 30- 40- 50- 60- 70- 80- 90

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

### V V V V IMPORTANT POINT TO NOTE ###

After insertion of a node (culprit node) the closest disbalanced node from bottom of the tree has to be rotated. means the closest disbalanced node has to either come to left (for RR) or right (for LL)

# LL Rotation

- LL ROTATION MEANS THE CULPRIT IS THE IMPACTED NODE'S LEFT OF LEFT CHILD.
- IN LL ROTATION WE DO CLOCKWISE ROTATION

IN below tree lets say B got impacted due to D. then it's a LL case. so we need to rotate B clockwise. Means C will come to B's position and B will come to C ka right. Now note that C has a Right child already (E). E becomes B's left child 

             A
            /
           B
          / 
         C
        / \
       D   E
After rotation - 
             A
            /
           C
          / \
         D   B
            / 
           E

# RR rotation

- RR ROTATION MEANS THE CULPRIT IS THE IMPACTED NODE'S RIGHT OF RIGHT CHILD.
- IN RR ROTATION WE DO ANTICLOCKWISE ROTATION

IN below tree lets say B got impacted due to E. then it's a RR case. so we need to rotate B ANTI-clockwise. Means C will come to B's position and B will come to C ka LEFT. Now note that C has a LEFT child already (D). D becomes B's RIGHT child

        A
         \
           B
            \ 
             C
            / \
           D   E
After rotation - 
             A
              \
               C
              / \
             B   E
              \ 
               D

## RL Rotation

- RL ROTATION MEANS THE CULPRIT IS THE IMPACTED NODE'S LEFT OF RIGHT CHILD. IMPACTED ka Right ka left child
- IN RR ROTATION WE DO LL Rotation first then RR rotation

IN below tree lets say B got impacted due to D. then it's a RL case. 

        A
         \
           B
            \ 
             C
            / \
           D   E
So first lets do a LL rotation on C. So D goes to C's place, D ka left becomes C ka right (E)

        A
         \
          B
           \
            D
           / \
          E   C

Now lets do a RR Rotation on B. So D comes to B's positon, B becomes left child of D. E becomes Right child of B
        A
         \
          D
         / \
        B   C
         \
          E

## LR Rotation

Do I need to repeat? Can't you guess that it should be the opposite of RL rotation? Chalo likh dete hai

- LR Rotation means Culprit is IMPACTED ka Left ka Right child
- In LR Rotation we do RR Rotation first then LL Rotation

In below tree lets say B got impacted by E. 

             A
            /
           B
          / 
         C
        / \
       D   E

So we first do a RR Rotation on C, E comes to C position, D becomes E ka left child
             A
            /
           B
          / 
         E
        / \
       C   D
Now lets do a LL rotation on B. E comes to B position, D becomes B ka left child
             A
            /
           E
          / \
         C   B
            / 
           D 