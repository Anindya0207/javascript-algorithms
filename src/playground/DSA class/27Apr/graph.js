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



const createNewGraph = (vertex, connections) => {
    const getNewArr = () => new Array(vertex).fill(0)
    const graph = new Array(vertex);
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
  
  const vertex = 5;
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
  createNewGraph(vertex, connections);
  
  playground();