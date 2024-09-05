var minimumDifference = function(nums) { 
  let n  = nums.length;
  
  let total = nums.reduce((acc, curr) => acc+curr, 0); 
  let dp = Array.from({length: n}, () => Array.from({length: total+1}, () => false));
  const _calc = () => {
      for(let i = 0; i < n; i++) {
          dp[i][0] = true;
      }
      if(nums[0] <= total) dp[0][nums[0]] = true;
      for(let index = 1; index < n; index++) {
          for(let target = 1; target <= total; target++) {
              let notake = dp[index-1][target];
              let take = false;
              if(nums[index] <= target) {
                  take = dp[index-1][target - nums[index]]
              }
              dp[index][target] = take || notake;
          }
      }
      return dp[n-1].filter(Boolean).map(i =>)
  }
  let allPossibleSubsetSums = _calc();
  let min = Infinity;
  for(let i = 0; i < allPossibleSubsetSums.length; i++) {
      otherCounter = total - allPossibleSubsetSums[i];
      min = Math.min(min, Math.abs(otherCounter - allPossibleSubsetSums[i]))
  }
  return min
};
console.log(minimumDifference([3,9,7,3]))