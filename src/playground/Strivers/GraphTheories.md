## GRAPH

- Graph is mainly same as Tree. Only difference is Graph can have a cycle unlike Tree
- The starting node for Graph is root

--------------------------------------------------------------------------------------------------------------------------------

### Graph common terms

- Node/ Vertex: the nodes
- Edges: the connecetion between nodes
- Path: A path is a traversal of multiple node where no node are repated
- Degree (In Undirected graph): total no of edges attached to a node. Total degree of a undirected graph = 2 * E (Total edges)
- In degree and Out degree (In Directed graph) : Total incoming and out going edges from and to a node
- Weight: Edges may have weights. If weight is not specified, it may be unit weight (1)

--------------------------------------------------------------------------------------------------------------------------------

### In degree out degree of a node

In degree is the number of incoming edges to a node of a graph.
In a tree DS, indegree of any node is 1 becuse there is only one edge incoming to any node in a tree.
But in Graph, there can be n edges inoming to a node. Then in degree of the node is n. 

Similarly, the number of edges outgoing from a node in a graph is called outdegree. In a BST, outdegree is <=2 

--------------------------------------------------------------------------------------------------------------------------------

### Dynamic Graph

- how many vertex
- how many edges
- enter the edge where the connection exist
    - 1-2 (directed / undirected)
    - 2-1
--------------------------------------------------------------------------------------------------------------------------------

### Graph types

- Null graph: No edges in the graph
- Trivial Graph: single vertex, smallest graph
- Undirected graph: edges have no direction, Nodes/vertex are unordered pairs in the definition of every edge
- Directed graph: edges have direction, Nodes are ordered pair in the definition of edges
- Connected graph: one node can be visited from any other node in the graph, means there is no disconnection b/w any two nodes
- Disconnected graph: there can be disconnection bw any two nodes in the graph;
- Regular graph: If in a graph degree of every vertex is K, it's called K regular graph (TBD)
- Complete graph: For each node there is a edge to all other nodes
- Cycle graph: The graph is a cycle in itself, every vertex has degree as 2
- Cyclic graph: A graph containing at least one cycle is a cyclic graph
- Acyclic graph: A graph where there is no cycle
- Bipartite graph: if there are two sets of nodes, each set doesn't connect within itselves
- Weighted graph: Graph with weights in all edges


![alt text](image-3.png)
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-4.png)
![alt text](image-5.png)

--------------------------------------------------------------------------------------------------------------------------------

### No of graphs with N nodes

- n nodes can form edges with n-1 other nodes except itself, right?
- so total edge possible is n * (n-1)
- if we remove the duplicate countings, then no of connections possible is n * (n -1) / 2
- each connection can have a edge or not have a edge, right? each for all possibilities, either connection or no connection that becomes a graph
- so total number of graph would be `Math.pow(2, ( n * (n -1) / 2))`

```javascript
 count(n)
    {
        return Math.pow(2, (n * (n - 1) / 2))
    }
```

--------------------------------------------------------------------------------------------------------------------------------

### Adj Matrix (2D array) O(n^2) complexity

       V1 V2 V3 V4
    V1 0   
    V2
    V3
    V4
    - Adj matrix representation is o(1) while inserting or deleting an edge but initialisation is o(n^2)

Scarse graph/Null graph - no of edges less (If no of edges are less, lot of places will be 0, which will be a disadvantage)
Dense graph - no of edges more

TC: O(V) SC: O(V*V)

```javascript
    printGraph(V, edges) {
      let arr = Array.from({length: V}, () => Array.from({length: V}).fill(0));
      for(let i =0; i<edges.length; i++) {
         let [u, v] = edges[i];
         arr[u][v] = 1;
         arr[v][u] = 1;
      }
      return arr
    }
```

--------------------------------------------------------------------------------------------------------------------------------

### Adj List 

    V1 -> V2, V3
    V2 -> V1, V3
    - insert of a edge is o(1) deletion of a edge is o(n) 
    - initialisation is o(n)
No disadvantage if there is a connection there wil be a node available

TC: O(V) SC: O(2*E)

```javascript
    printGraph(V, edges) {
      let arr =  Array.from({length: V}, () => new Array());
      for(let i =0; i<edges.length; i++) {
         let [u, v] = edges[i];
         arr[u].push(v);
         arr[v].push(u);
      }
      return arr
    }
```

--------------------------------------------------------------------------------------------------------------------------------

### Connected Components in Graph

- There may be multiple connected components in a grapjh which are not inter connected. That also is a valid graph
- But We can not traverse all nodes of this kind of graph with any traversal techniques by starting from any node.
- For traversing this kind of graph we need to take a `visitedArr` data structure of Size Node +1 or V+ 1
- We need to run a loop in that visitedArr and check if `!visitedArr[node]` then `traverse(node)` 
- traverse method will have to mark visitedArr[node] as true for the connected nodes with the starting node.

--------------------------------------------------------------------------------------------------------------------------------

### BFS Traversal

- BFS (Breadth first search) is equivalent to level order traversal of a BT
- We need to make sure that the traversed nodes are sorted in the order of level. i.e. Level 1 nodes should be traversed first, then level 2 and so on.
- The order of the nodes traversed in a level does not matter
- To ensure this, we need to take a data structure which pops in the same way it is puhed inside. i.e the first thing which got inserted will be poipped first. So we will take a Queue data structure which operates as FIFO.

How?

- We will be given a starting node from where we will start the traversal
- We will initially take a visited array of V+1 length and fill it with 0 (all are non visited) 
- We will put the starting node in the queue and mark it as 1 in the visited array
- From this point on, we will dequeue from the queue one by one and get the adjacent nodes for the popeed node by the adjacency list notation
- We will put the neighbours in the queue (in any order, does not matter) and mark them as visited also, But only if they are not previously visited
- We will continue this until the queue is empty

```javascript
const bfsOfGraph= (V, adj) => {
  let final = [];
  let queue = new MyQueuee();
  let visitedArr = Array.from({length: V}, () => 0);
  queue.enqueue(0);
  visitedArr[0] = 1;
  while(!queue.empty()) {
      let popped = queue.dequeue();
      let neighbours = adj[popped] || []
      for(let i =0 ; i< neighbours.length; i++) {
          if(!visitedArr[neighbours[i]]) {
              queue.enqueue(neighbours[i]);
              visitedArr[neighbours[i]] = 1
          }
      }
      final.push(popped)
  }
  return final;
}
```
--------------------------------------------------------------------------------------------------------------------------------

### DFS Traversal

- DFS (Depth First Search) is equivalent to inorder or preorder or postorder traversal of trees
- We need to go deep in depth for a node and come back
- The approach which is suited best for this is recursion and backtracking
- So difference between DFS and BFS is DFS is stack based approach (recursion works on top of callstacks) and BFS is queue based approach

How?

- We will take a visitedArr of length V as we did in BFS
- We will be given a node to start with
- We will call the traversal with that node where we will do two things
    - We will mark the node as visited in visitedArr
    - We will push it in the final 
- Post this, we will check it's neighbours from adjacency list and iterate over them
- For those neighbours which are not yet "visited" we will call the same traversal function
- Since we are calling the function recursively, one node will complete traversal of it's child nodes recursively and come back

```javascript
dfsOfGraph(V, adj) {
    let visitedArr = Array.from({length: V}, () => 0);
    let final = [];
    const _traverse = (node) => {
        visitedArr[node] = 1;
        final.push(node);
        let neighbours = adj[node] || [];
        for(let i = 0; i<neighbours.length; i++) {
            if(!visitedArr[neighbours[i]]) {
                _traverse(neighbours[i]);
            }
        }
    }
    _traverse(0)
    return final;
}
```

--------------------------------------------------------------------------------------------------------------------------------