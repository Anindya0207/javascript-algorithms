var isBipartite = function(graph) {
  let visitedArr = {}
  let final = true;
  const _traverse = (node) => {
      if(!final) return;
      let neighbours = graph[node] || [];
      for(let i = 0; i<neighbours.length; i++) {
          if(visitedArr[neighbours[i]] && visitedArr[neighbours[i]] == visitedArr[node]) {
              final = false;
          }
          else if(!visitedArr[neighbours[i]]) {
            visitedArr[neighbours[i]] = visitedArr[node] == 'A' ? 'B' : 'A'
            _traverse(neighbours[i]);
          }
      }
  }
  for(let i = 0; i < graph.length; i++) {
    if(!visitedArr[i]) {
      _traverse(i);
    }
  }
  
  return final;
};

console.log(isBipartite([[],[2,4,6],[1,4,8,9],[7,8],[1,2,8,9],[6,9],[1,5,7,8,9],[3,6,9],[2,3,4,6,9],[2,4,5,6,7,8]]))