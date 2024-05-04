
const arr = [
  [0,1,1,1,0,0],
  [1,0,0,0,1,0],
  [1,0,0,0,0,1],
  [1,0,0,0,0,0],
  [0,1,0,0,0,0],
  [0,1,1,0,0,0]
]
const init = 0;
let finalMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F'
}

const adjacencyMatrixGraphTraversal = (arr, index) => {
  const subArr = arr[index];
  map[index] = true;
  console.log(finalMap[index]);
  for(var i = subArr.length-1; i>0; i--) {
    if(subArr[i] == 1 && !map[i]) {
      adjacencyMatrixGraphTraversal(arr, i);
    }
  }
};

const adjacencyListGraphTraversal = (arr, val) => {
  let node = arr[val];
  map[val] = true;
  console.log(finalMap[val]);
  let pivot = node.next;
  while(pivot != null) {
    if(!map[pivot.data]) {
      adjacencyListGraphTraversal(arr, pivot.data);
    }
    pivot = pivot.next;
  }
};
let map = {}
const playground = () => {
  console.log("Adj Matrix traversal");
  adjacencyMatrixGraphTraversal(arr, init);
  map = {}
  console.log("Adj list traversal");
  const adjacencyList = representAdjacentList(vertices, connections);
  adjacencyListGraphTraversal(adjacencyList, init)  
}


class Node {
  constructor(_data, _next) {
    this.data = _data;
    this.next = _next;
  }
}

const representAdjacentList = (vertices, connections) => {
  const map = {};
  for(var c = 0; c < connections.length; c++) {
    const {to, from, isDirected} = connections[c];
    if(isDirected) {
      let currList = map[from];
      if(!currList) {
        let pivot = new Node(from, null);
        let pivot2 = new Node(to, null);
        pivot.next = pivot2;
        map[from] = pivot;
      } else {
        let pivot = currList;
        while(pivot.next != null) {
          pivot = pivot.next;
        }
        pivot.next = new Node(to, null);
      }
    } else {
      let currList1 = map[from];
      let currList2 = map[to];
      if(!currList1) {
        let pivot = new Node(from, null);
        let pivot2 = new Node(to, null);
        pivot.next = pivot2;
        map[from] = pivot;
      } else {
        let pivot = currList1;
        while(pivot.next != null) {
          pivot = pivot.next;
        }
        pivot.next = new Node(to, null);
      }
      if(!currList2) {
        let pivot = new Node(to, null);
        let pivot2 = new Node(from, null);
        pivot.next = pivot2;
        map[to] = pivot;
      } else {
        let pivot = currList2;
        while(pivot.next != null) {
          pivot = pivot.next;
        }
        pivot.next = new Node(from, null);
      }
    }
  }
  graph = vertices.map(v => map[v])
  return graph;
}


const vertices = [0,1,2,3,4,5];
const connections = [
  {
    from: 0,
    to: 1,
    isDirected: false,
  },
  {
    from: 0,
    to: 2,
    isDirected: false,
  },
  {
    from: 0,
    to: 3,
    isDirected: false,
  },
  {
    from: 2,
    to: 5,
    isDirected: false,
  },
  {
    from: 1,
    to: 5,
    isDirected: false,
  },
  {
    from: 1,
    to: 4,
    isDirected: false,
  },
  
]
playground();