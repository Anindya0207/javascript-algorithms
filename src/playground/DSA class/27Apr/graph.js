const calculateEdges = () => {
  const arr = [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,1],
    [0,1,0,1,0]
  ];
  console.log(arr);
 let map = {}, edge = 0;
  for(var i = 0; i < arr.length; i ++ ){ 
    for(j = 0; j < arr[i].length; j++) {
      if(arr[i][j] == 1 &&  !map[`${i}${j}`]) {
        edge++;
        map[`${i}${j}`] = true;
        map[`${j}${i}`] = true;
      }
    }
  }
  console.log(edge);
}

const calculateDegree = () => {
  const map = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E'
  }
  const arr = [
    [0,1,0,0,0],
    [0,0,0,1,1],
    [1,1,0,1,0],
    [0,0,0,0,0],
    [0,0,0,1,0]
  ];
  console.log(arr);
  let indegree = {}, outdegree = {};
  for(var i = 0; i < arr.length; i ++ ){ 
      outdegree[map[i]] = arr[i].reduce((acc, curr) => acc + curr, 0)
  }
  for(var i = 0; i < arr.length; i ++ ){ 
    for(var j= 0; j<arr[i].length; j++) {
      indegree[map[j]] = (indegree[map[j]] || 0) + arr[i][j];
    }
  }
  console.log(indegree, outdegree)
}



const representAdjacentMatrix = (vertices, connections) => {
  const getNewArr = () => new Array(vertices.length).fill(0)
  const graph = new Array(vertices.length);
  for(var i = 0; i< graph.length; i++) {
    graph[i] = getNewArr()
  }
  for(var c = 0; c < connections.length; c++) {
    const {to, from, isDirected} = connections[c];
    if(isDirected) {
      graph[from][to] = 1;
    } else {
      graph[from][to] = 1;
      graph[to][from] = 1;
    }
  }
  console.log(graph)
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
  console.log(graph);
  let numofEdges = 0, indegree = {}, outdegree= {};
  for(var i =0; i < graph.length; i++) {
    let _pivot = graph[i];
    if(!outdegree[i]) outdegree[i] = 0;
    if(!indegree[i]) indegree[i] = 0;
    while(_pivot && _pivot.next != null) {
      numofEdges++;
      outdegree[i]++;
      _pivot = _pivot.next;
    }
    _pivot = graph[i];
    if(_pivot) _pivot = _pivot.next;
    while(_pivot != null) {
      if(!indegree[_pivot.data]) indegree[_pivot.data] = 0;
      indegree[_pivot.data]++;
      _pivot = _pivot.next;
    }
  }
  console.log(numofEdges);
  console.log(indegree, outdegree)
}


const vertices = [0,1,2,3,4];
const connections = [
  {
    from: 0,
    to: 1,
    isDirected: true,
  },
  {
    from: 1,
    to: 3,
    isDirected: true,
  },
  {
    from: 1,
    to: 4,
    isDirected: true,
  },
  {
    from: 2,
    to: 0,
    isDirected: true,
  },
  {
    from: 2,
    to: 1,
    isDirected: true,
  },
  {
    from: 2,
    to: 3,
    isDirected: true,
  },
  {
    from: 4,
    to: 3,
    isDirected: true,
  }

]

const playground = () => {
  representAdjacentList(vertices, connections)
};

playground();