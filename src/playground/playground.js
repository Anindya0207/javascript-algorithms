const secondLargest = (arr) => {
  let largest = -Infinity, secondLargest = -Infinity;
  for(var i = 0; i<arr.length; i++) {
    if(arr[i] > largest) {
      if(largest > secondLargest) {
        secondLargest = largest;
      }
      largest = arr[i];
    }
  }
  console.log(secondLargest);
}

var removeDuplicates = function(nums) {
  let i = 0, j=1;
  while(j < nums.length) {
      if(nums[i] == nums[j]) {
        j++;
      }
      else {
        nums[++i] = nums[j++];
      }
  }
  console.log(i+1)
};

var rotate = function(nums, k) {
  var nums1 = [...nums];
  for(var i = 0; i< nums.length; i++) {
      nums[((i + k) %nums.length)] = nums1[i];
  }
};

  
var maxSubArray = function(nums) {
  let max = -Infinity, currMax = 0;
  for(var i =0; i< nums[i]; i++) {
      currMax += nums[i];
      max = Math.max(max, currMax);
      if(currMax < 0) {
          currMax = 0;
      }
  }
  console.log(max) ;
};
// maxSubArray([-2,1,-3,4,-1,2,1,-5,4])

// this approach is O(N) and space O(N) this is the optimal solution if the array has positive and negative numbers both
var lenOfLongSubarr = (arr, k) => {
  let map = {0: 0}, maxLen = 0, sum = 0;
  for (var i = 1; i <= arr.length; i++) {
    sum = sum + arr[i-1];
    if(map[sum] == undefined) map[sum] = i;
    if(map[sum - k] != undefined) {
      maxLen = Math.max(maxLen, i - map[sum - k]);
    }
  }
  console.log(maxLen)
}

// lenOfLongSubarr([10, 5, 2, 7, 1, 9], 15)
// lenOfLongSubarr([-13,0,6,15,16,2,15,-12,17,-16,0,-3,19,-3,2,-9,-6], 15)
// lenOfLongSubarr([-7,17,-12,2,11,-1,4,11,-18], 25)

var lenOfLongSubarrTwoPointer = (arr, k) => {
  var maxLen = 0, left = 0, right = 0, sum = 0;
  while(right < arr.length) {
    if(sum > k) {
      sum -= arr[left];
      left++;
    }
    if(sum == k) {
      maxLen = Math.max(maxLen , right - left);
    }
    sum += arr[right];
    right++;
  }
  console.log(maxLen)
}
lenOfLongSubarrTwoPointer([2,3,5], 5)
