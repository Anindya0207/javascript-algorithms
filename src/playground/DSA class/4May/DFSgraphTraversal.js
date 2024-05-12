
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
  
  