var findTheCity = function (n, edges, distanceThreshold) {
  let matrix = Array.from({ length: n }, () => Array.from({ length: n }, () => Infinity));
  for (let i = 0; i < edges.length; i++) {
      let [u, v, w] = edges[i];
      matrix[u][v] = w;
      matrix[v][u] = w;
  }
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          if (i == j) {
              matrix[i][j] = 0;
          }
      }
  }
  for (let via = 0; via < n; via++) {
      for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
              matrix[i][j] = Math.min(matrix[i][j], matrix[i][via] + matrix[via][j]);
          }
      }
  }
  
  let minCount = Infinity;
  let final = -1;
  for(let i = 0; i < n; i++) {
    let countCities = 0;
    for (let j = 0; j < n; j++) {
      if (i != j && matrix[i][j] <= distanceThreshold) {
        countCities++;
      }
    }
    if(minCount > countCities){
      minCount= countCities;
      final=i;
    }
  }
  return final
};

console.log(findTheCity(6,[[0,3,7],[2,4,1],[0,1,5],[2,3,10],[1,3,6],[1,2,1]], 417))