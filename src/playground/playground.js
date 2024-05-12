var threeSum = function(nums) {
  let final = [];
  debugger;
  nums.sort((a,b) => a-b);
  for(var i = 0; i< nums.length; i++) {
      let pivot = nums[i];
      let targetSum = 0 - pivot;
      let left = i+1, right = nums.length-1;
      while(left < right) {
          if(nums[left] + nums[right] == targetSum) {
              final.push([pivot, nums[left], nums[right]]);
              left++; right--
          }
          else if((nums[left] + nums[right]) > targetSum) {
              right--;
          }
          else {
              left++;
          }
      }
  }
  console.log(final)
};
threeSum([-1,0,1,2,-1,-4])