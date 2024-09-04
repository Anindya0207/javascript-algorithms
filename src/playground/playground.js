const perfectSum= (nums,sum) => {
  let maxSum = nums.reduce((acc, curr) => acc+curr, 0);
  let count = 0;
  let dp = Array.from({length: nums.length +1}, () => Array.from({length: maxSum+ 1},()=> -1));
  const _calc = (index, _sum) => {
      if(sum == _sum) {
          return 1
      }
      if(index >= nums.length ||  _sum > sum) return 0;
      if(dp[index][_sum] != -1) {
          return dp[index][_sum]
      }
      let take = _calc(index+1, _sum + nums[index]);
      let notake = _calc(index + 1, _sum);
      dp[index][_sum] = take + notake;
      return dp[index][_sum]
  }
  _calc(0, 0);
  return dp
}

console.log(perfectSum([5, 2, 3, 10, 6, 8], 10))