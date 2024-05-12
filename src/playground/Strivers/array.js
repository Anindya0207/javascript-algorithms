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
  
  //Kadane's algo
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
    let map = {}, maxLen = 0, sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum = sum + arr[i];
      if(map[sum] == undefined) map[sum] = i;
      if(sum == k) {
        maxLen = Math.max(maxLen, i+1);
      }
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
//   lenOfLongSubarrTwoPointer([2,3,5], 5)

// to calculate the sum of all subarray suming to K we will follow same prefix map approach but since
// we don't need to calculate the length of the subarray, we will kep maintaining the count of all previous sums
// If for any sum there's a duplicate map[sum] we were not storing earlier because we wanted the max length of the subarray
// But here we will just increment the counter of that sum in the map
// this means that for map[sum] = n we have n subarrays already available in left of the array whose cumulative sum are same.
// If we get a Sum at any point such that sum - k is already there in map, we will increment final count with the count corresponding to map[sum-k] which we stored earlier

/**
 * Let us take an example -
 * 1 2 3 -3 1 1 1 4 2 -3
 * prefix map would be
 * 1 3 6 3 4 5 6 10 12 9
 * see, 3 is coming twice that means, 1,2 subarray also adds up to 3
 * and 1 2 3 -3 also adds up to 3
 * so if at the last 1's position i.e. prefixsum 6 we would get sum - k = 6-3 
 * so we would have to consider 1,2 | 1,2,3,-3 and 1,1,1 so count = count + map[3] which is 2 
 */
var subarraySum = function(arr, k) {
    let map = {}, count = 0, sum = 0;
    for(var i = 0; i <= arr.length; i++) {
      sum = sum + arr[i];
      if(sum === k) count++
      if(map[sum - k] != undefined) {
          count += map[sum - k];
      }
      map[sum] = (map[sum] || 0) + 1;
    }
    return count;
  };

