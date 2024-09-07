const countPartitions = (n, d, nums) => {
  let total = nums.reduce((acc, curr) => acc + curr, 0);
  let dp = Array.from({ length: n }, () => Array.from({ length: total + 1 }, () => 0));
  for(let i =0 ;i<n; i++) {
      dp[i][0] = 1;
  }
  if(nums[0] <= total) {
    dp[0][nums[0]] = 1;
  }
  
  for(let index = 1; index < n; index++) {
      for(let target = 1; target <= total; target++) {
          let notake = dp[index -1][target];
          let take = false;
          if(nums[index] <= target) {
              take=dp[index -1][target - nums[index]]
          }
          dp[index][target] = take + notake;
      }
  }
  let allPossibleSubSetSumCounts = dp[n-1];
  let final = 0
  for(let i = 0; i < allPossibleSubSetSumCounts.length; i++) {
    let currSum = i;
    let other = total - i;
    if(currSum - other == d && currSum >= other) {
      final += allPossibleSubSetSumCounts[i];
    }
  }
  return final
}

console.log(countPartitions(4, 3, [5,2,6,4]))
