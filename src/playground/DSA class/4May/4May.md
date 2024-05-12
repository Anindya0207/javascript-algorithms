Graph Traversal

BFS : Queue Datastructure (FIFO)
DFS: Stack Data structure (LIFO)


# DFS

Stack based approach 
![alt text](<Screenshot 2024-05-04 at 9.10.43 PM.png>)
1. let's take a node A
2. Push it in Stack [A]
3. Pop it and push it's neighbours in Stack [B, C]
4. Pop C and push it's neighbours D, E [B, D, E]
5. Pop E ,D, B
6. While popping a node, we need to push it's neighbours. Now if ay neighbour is already in stack or already visited we should not push again. May need to take a hashmap to achieve this

While implementing DFS we use recursion since recursion uses stack

# BFS

Queue based approach
1. We Enqueue one node in Queue
2. DEqueue it
3. Enqueue it's neighbouring nodes
4. Dequeue first one and again enqueue it's neighouring nodes
