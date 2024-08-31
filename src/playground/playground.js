var uniquePaths = function(m, n) {
  let dp = Array.from({length: m}, () => Array.from({length: n}, () => 0));
  dp[0][0] = 0;
  dp[0][1] = 1;
  dp[1][0] = 1;
  for(let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
         if(i > 0) {
          dp[i][j] += dp[i-1][j]
         }
         if(j > 0) {
          dp[i][j] += dp[i][j-1]
         }
      }
  }
  return dp[m-1][n-1]
};

console.log(uniquePaths(3, 2))