var countBits = function(n) {
  let dp = new Array(n+1).fill(-1);
  dp[0] = 0;
  dp[1] = 1;
  for(let i = 2; i <= n; i++){
    if((i & i-1) == 0) {
      dp[i] = 1;
    } else {
      dp[i] = dp[i-1] + 1
    }
  } 
  console.log(dp)
  
};

countBits(6)