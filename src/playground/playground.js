const minimizeCost = (arr, k) => {
  let n = arr.length;
  let dp = Array.from({length: n}, () => -1);
  dp[0] = 0;
  dp[1] = Math.abs(arr[1] - arr[0]);
  for(let i = 2; i < n; i++) {
      let min = Infinity;
      for(let j = i-1; j >= Math.max(i - k, 0); j--) {
          min = Math.min(min, dp[j] + Math.abs(arr[j] - arr[i]));
      }
      dp[i] = min;
  }
  return dp[n-1]
}
  console.log(minimizeCost( [10, 30, 40, 50, 20], 3))