var coinChange = function (coins, amount) {
  let n = coins.length;
  let dp = Array.from({ length: n }, () => Array.from({ length: amount + 1 }, () => Infinity))
  
  for (let _amt = 0; _amt <= amount; _amt++) {
      if (_amt % coins[0] == 0) {
          dp[0][_amt] =  _amt / coins[0];
      }
  }
  for(let i =0 ;i < n; i++) {
    dp[i][0] = 0
  }
  for (let index = 1; index < n; index++) {
      for (let _amt = 1; _amt <= amount; _amt++) {
          let notake = dp[index - 1][_amt];
          let take = Infinity
          if (coins[index] <= _amt) {
              take =  1+ dp[index][_amt - coins[index]]
          }
          dp[index][_amt] = Math.min(take, notake)
      }
  }
  return dp[n-1][amount] == Infinity ? -1: dp[n-1][amount];
};

console.log(coinChange([1,2], 2))