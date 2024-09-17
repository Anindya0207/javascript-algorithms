/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function(nums) {
    let n = nums.length;
    let dp = Array.from({length: n}, () => 1);
    let count = Array.from({length: n}, () => 1);
    // Calculate LIS length
    for(let index = 1; index < n; index++) {
        for(let prevIndex = 0; prevIndex < index; prevIndex++) {
            if(nums[index] > nums[prevIndex]) {
                if(dp[prevIndex] + 1 > dp[index]) {
                    dp[index] =  1 + dp[prevIndex];
                    count[index] = count[prevIndex];
                } else if (dp[prevIndex] + 1 == dp[index]) {
                    count[index] += count[prevIndex];
                }
            }
        }
    }
    let maxLength = Math.max(...dp)
    let result = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === maxLength) {
            result += count[i];
        }
    }
    return result
};

console.log(findNumberOfLIS([1,2,4,3,5,4,7,2]))