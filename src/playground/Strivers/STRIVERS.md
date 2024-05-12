1. when in a loop we keep on dividing the number, like while (n > 0).... n = n / x; then the time complexity is O(logx N)
--------------------------------------------------------------------------------------------------------------------------------
2. Euclidean algorithm states that GCD(a,b) = GCD(a % b, b) where a > b
const findGCD = (num1, num2) => {
  if(num1 == 0) return num2;
  if(num1 > num2) return findGCD(num1 % num2, num2);
  return findGCD(num2 % num1, num1);
}
--------------------------------------------------------------------------------------------------------------------------------
3. A subsequence is a sub-sequenece which should follow the order of the actual sequence. it can be either contiguous or non contiguous
[3,1,2] => [3] [1] [2] [3,1] [3,2] [1,2] [3,1,2] these are all possible subsequence. 
[3,2] is a non contigious subsequnce
[1,2,3] is not a subsequence becuase it doesn't follow the order.
This can be achieved by Power set also which is mentioned in 6May.md
--------------------------------------------------------------------------------------------------------------------------------

4. To rotate a array by k we can simply do
arr1 = [...arr]
arr[i] = arr1[(i+k)%arr.length]
This is very powerful formula to rotate the array or to check if an array is rotated k times. 
To check if A and B are same array but after k rotation
A[i] = B[(i+k)%A.length]
--------------------------------------------------------------------------------------------------------------------------------

5. Length of longest subarray with K sum using Prefixmap/Hashing
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
  // same way we can deduce the count of subarray with sum k
  var lenOfLongSubarr = (arr, k) => {
    let map = {}, maxC = 0, sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum = sum + arr[i];
      if(sum == k) {
         maxC++
      }
      if(map[sum - k] != undefined) {
        maxC = maxC + map[sum - k]
      }
      if(map[sum] == undefined) map[sum] = i;
    }
    console.log(maxLen)
  }
--------------------------------------------------------------------------------------------------------------------------------  
  
6. Dutch National Flag algo
This algorithm contains 3 pointers i.e. low, mid, and high, and 3 main rules.  The rules are the following:

arr[0….low-1] contains 0. [Extreme left part]
arr[low….mid-1] contains 1.
arr[high+1….n-1] contains 2. [Extreme right part], n = size of the array
The middle part i.e. arr[mid….high] is the unsorted segment. 

There can be three different values of mid pointer i.e. arr[mid]
If arr[mid] == 0, => swap(arr[low], arr[mid]) low++; mid++
If arr[mid] == 1 => mid++
If arr[mid] == 2 => swap(arr[mid], arr[high]); high--
--------------------------------------------------------------------------------------------------------------------------------

7. Moores Voting Algo

Find the element which appears more than n/2
Initialize 2 variables:
Count –  for tracking the count of element
Element – for which element we are counting
Traverse through the given array.
If Count is 0 then store the current element of the array as Element.
If the current element and Element are the same increase the Count by 1.
If they are different decrease the Count by 1.
After the traversal, if count > 0 the Element can be the majority element.
Step 2: We also need to verify if it is the majority element by running through the array and count the occurance > n/2

var majorityElement = function(nums) {
    let el = null, count = 0
    for(var i  = 0; i <nums.length; i++) {
        if(!count) {
            el = nums[i]; count = 1;
        } else if(nums[i] == el) {
            count++;
        } else {
            count--;
        }
    }
    return el;
}

lets say we need to find all elements which appears more than n/3 or n/k or whatever
- We can say for sure that for more than n/k occurances there won't be more than k elements in the array. 
- Means there will be atmost 2 elements which can appear more than 2 times in the array. Chahe to check kar lo 8 length ki array lo. 3 times do hi element aa skta hai. kyu ki teen element 3 times aane se total size 9 ho jayega
- Toh instead of taking one count and one element variable in the above algo, we can take 2 counts and 2 element variables right?
- After getting the POSSIBLE majority elements don't forget to verify that. because both of them might not appear more than n/3 times

var majorityElement = function(nums) {
    let el1 = null, el2 = null, count1 = 0, count2 = 0
    for(var i = 0; i < nums.length; i++) {
        if(count1 == 0 && el2 != nums[i]) {
            count1 = 1; el1 = nums[i];
        }
        else if(count2 == 0 && el1 != nums[i]) {
            count2 = 1; el2 = nums[i];
        }
        else if(el1 == nums[i]) count1++;
        else if(el2 == nums[i]) count2++;
        else {
            count1--; count2--;
        }
    }
    let final = [];
    count1 = 0, count2 = 0;
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] == el1) count1++;
        if(nums[i] == el2) count2++;
    }
    if(count1 > Math.floor(nums.length / 3)) {
        final.push(el1)
    }
    if(count2 > Math.floor(nums.length / 3)) {
         final.push(el2)
    }
    return final
}
--------------------------------------------------------------------------------------------------------------------------------

8. Kadane's Algo

We will run a loop(say i) to iterate the given array.
Now, while iterating we will add the elements to the sum variable and consider the maximum one.
If at any point the sum becomes negative we will set the sum to 0 as we are not going to consider it as a part of our answer.

var maxSubArray = function(nums) {
    let max = -Infinity, currSum = 0;
    for(var i= 0; i <nums.length; i++) {
        currSum = currSum + nums[i];
        max = Math.max(max, currSum);
        if(currSum < 0) {
            currSum = 0;
        }
    }
    return max;
};
--------------------------------------------------------------------------------------------------------------------------------

9. Next Permutation

We need to find out the next permutaion of 2,1,5,4,3,0,0 lets say ans : 2,3,0,0,1,4,5
Step1: find out the break index from last to first where arr[i-1] < arr[i] ... here it will be 2 where 1 is sitting
Step2: again run a loop from last to first and for the first element > the element at brwakindex swap them . 
At this point it will be 2 3 5 4 1 0 0. Notice that after 2 3 rest array is sorted in descending order
Step3: from breakindex + 1 to last index reverse the array. take two pointer 

var nextPermutation = function(nums) {
   var breakIndex = -1;
   //Step 1
  for (var i = nums.length - 1; i >= 0; i--) {
    if( nums[i-1] < nums[i]) {
      breakIndex = i-1;
      break;
    }
  }
// Step2
  for (var i = nums.length - 1; i >= 0; i--) {
    if(nums[i] > nums[breakIndex]) {
      let temp = nums[i];
      nums[i] = nums[breakIndex];
      nums[breakIndex] = temp;
      break;
    }
  }
// Step 3
  let left = breakIndex + 1, right = nums.length - 1
  while(left <= right) {
    let temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
    left++;
    right--;
  }
  return nums;
};
--------------------------------------------------------------------------------------------------------------------------------

10. 2Sum 3Sum 4Sum

2Sum is pretty easy. So you need to sort the array first. 
take two pointers left and right; left = 0, right = n-1
if a[left] + a[right] == sum -> valid pair
if a[left] + a[right] < sum -> left++;
else right--

var twoSum = function(nums, target) {
    nums.sort((a, b) => a-b);
    let left = 0, right = nums.length -1;
    while(left < right) {
        var sum =nums[left]+nums[right];
        if(sum > target) {
            right--;
        }
        else if(sum < target) {
            left++;
        }
        if(sum == target) {
            return [left, right]
        }
    }
    return []
};

For 3Sum, the trick is to fix one pivot and then do same two pointer as we did in 2Sum for the remaining array
https://leetcode.com/problems/3sum/submissions/1255996853/

4Sum same way.. take two outer loop and Keep Left and right pivots
https://leetcode.com/problems/4sum/submissions/1256020557/

11. Merge intervals

We are given an interval [[1,3],[2,6],[8,10],[15,18]] 
We need to convert this to [[1, 6], [8, 10], [15, 18]]
For these problems we need to either sort it based on it's start times or end times
Here we sort it based on their start times and we do inplace merge. 
Whenever iTh index end time > j (i+1)th index start tiem we need to merge them
While merging we need to take the minimum start time b/w i and j but max end time b/w i and j
Whenever we have to merge 

var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let i =0;
    while(i < intervals.length) {
        let j = i + 1;
        if(intervals[j] && (intervals[i][1] >= intervals[j][0])) {
            intervals[i] = [Math.min(intervals[i][0], intervals[j][0]), Math.max(intervals[i][1], intervals[j][1])];
            intervals.splice(j, 1);
        } else {
            i++;
        }
    }
    return intervals;
};

12. Merge two sorted array without extra space

One way is set i = arr1.length-1 and j = 0 
make sure to swap arr1[i] and arr2[j] if arr1[i] > arr2[j] so that arr1 holds all lesser values than arr2 values.
now sort arr1 and arr2 individually and then merge

var merge = function (arr1, m , arr2, n ) {
    let i = m -1, j = 0;
    arr1.splice(m);
    while(i >= 0 || j < n -1) {
        if(arr1[i] > arr2[j]) {
            var temp = arr1[i];
            arr1[i] = arr2[j];
            arr2[j] = temp;
        }
        i--;
        j++;
    }
    arr1.sort((a,b) => a-b);
    arr2.sort((a,b) => a-b);
    for(var k = 0; k< arr2.length; k++) {
        arr1.push(arr2[k])
    }
    return arr1
}

Approach 2: Gap method which is derived from shell sort
- Calculate gap = Math.ceil(m + n / 2) and place two pointers L and R separated by gap
- keep increemnting L and R and swap if arr1[L] > arr2[R]
- keep decrementing gap = Math.ceil(gap/2) till gap reaches 1

