const solve = (n, m, grid) => {
  let dp = Array.from({length:n}, ()=> Array.from({length: m}, () =>  Array.from({length: m}, () => -1)));
  const _calc = (i, j1, j2) => {
      if(i < 0 || j1 >= m || j1 < 0 || j2 < 0 || j2 >= m) {
          return -Infinity
      } 
      if(i == n-1) {
          if(j1 == j2) {
             dp[i][j1][j2] =  grid[i][j1]; 
             return grid[i][j1];  
          } else {
            dp[i][j1][j2] = grid[i][j1] + grid[i][j2];
             return grid[i][j1] + grid[i][j2];
          }
      }
      if(dp[i][j1][j2] != -1) return dp[i][j1][j2];
      let max = -Infinity;
      // I will wait at i, j1, j2. Go down and find max and give me
      for(let dj1 = -1; dj1 <= 1; dj1++) {
          for(let dj2 = -1; dj2 <= 1; dj2++) {
              let currVal = 0;
              if(j1 == j2) {
                  currVal = grid[i][j1];
              } else {
                  currVal = grid[i][j1] + grid[i][j2];
              }
              // max Nikal ke do mujhe
              max = Math.max(max, currVal + _calc(i+1, j1+dj1, j2+dj2));
          }
      }
      dp[i][j1][j2] = max;
      return max;
  }
 const blabla = _calc(0, 0, m-1);
 console.log(blabla);
}

console.log(solve(4, 3,[[3,1,1],[2,5,1],[1,5,5],[2,1,1]]))