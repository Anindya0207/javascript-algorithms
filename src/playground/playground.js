const printGraph = (V, edges) => {
  let arr = Array.from({length: V}, () => Array.from({length: V}).fill(0));
      for(let i =0; i<edges.length; i++) {
         let [u, v] = edges[i];
         arr[u][v] = 1;
         arr[v][u] = 1;
      }
      return arr
}

console.log(printGraph(5,[[0,1],[0,4],[4,1],[4,3],[1,3],[1,2],[3,2]]))