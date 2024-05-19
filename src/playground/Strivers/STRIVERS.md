# DSA key notes

### 1. How time complexity works specially with logn
```
when in a loop we keep on dividing the number, like while (n > 0).... n = n / x; then the time complexity is O(logx N)
```
---
###  2. Euclidean algorithm states that GCD(a,b) = GCD(a % b, b) where a > b

```javascript
const findGCD = (num1, num2) => {
  if(num1 == 0) return num2;
  if(num1 > num2) return findGCD(num1 % num2, num2);
  return findGCD(num2 % num1, num1);
}
```

--------------------------------------------------------------------------------------------------------------------------------
### 3. A subsequence is a sub-sequenece which should follow the order of the actual sequence. 

- It can be either contiguous or non contiguous
- This can be achieved by Power set also which is mentioned in 6May.md

```
[3,1,2] => [3] [1] [2] [3,1] [3,2] [1,2] [3,1,2] these are all possible subsequence. 
[3,2] is a non contigious subsequnce
[1,2,3] is not a subsequence becuase it doesn't follow the order.

```
--------------------------------------------------------------------------------------------------------------------------------

### 4. To rotate a array by k we can simply do arr[i] = arr1[(i+k)%arr.length]

```
arr1 = [...arr]
arr[i] = arr1[(i+k)%arr.length]
This is very powerful formula to rotate the array or to check if an array is rotated k times. 
To check if A and B are same array but after k rotation
A[i] = B[(i+k)%A.length]
```
--------------------------------------------------------------------------------------------------------------------------------

### 5. Length of longest subarray with K sum using Prefixmap/Hashing

```javascript
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
```
--------------------------------------------------------------------------------------------------------------------------------  
  
### 6. Dutch National Flag algo

- This algorithm contains 3 pointers i.e. low, mid, and high, and 3 main rules.  The rules are the following:
- arr[0….low-1] contains 0. [Extreme left part]
- arr[low….mid-1] contains 1.
- arr[high+1….n-1] contains 2. [Extreme right part], n = size of the array
- The middle part i.e. arr[mid….high] is the unsorted segment. 

```
There can be three different values of mid pointer i.e. arr[mid]
If arr[mid] == 0, => swap(arr[low], arr[mid]) low++; mid++
If arr[mid] == 1 => mid++
If arr[mid] == 2 => swap(arr[mid], arr[high]); high--
```

--------------------------------------------------------------------------------------------------------------------------------

### 7. Moores Voting Algo - Find the element which appears more than n/2 or n/3

Step 1: 

- Initialize 2 variables:
- Count –  for tracking the count of element
- Element – for which element we are counting
- Traverse through the given array.
- If Count is 0 then store the current element of the array as Element.
- If the current element and Element are the same increase the Count by 1.
- If they are different decrease the Count by 1.
- After the traversal, if count > 0 the Element can be the majority element.

Step 2: 
- We also need to verify if it is the majority element by running through the array and count the occurance > n/2

```javascript
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
```

Lets say we need to find all elements which appears more than n/3 or n/k or whatever - 

- We can say for sure that for more than n/k occurances there won't be more than k elements in the array. 
- Means there will be atmost 2 elements which can appear more than 2 times in the array. Chahe to check kar lo 8 length ki array lo. 3 times do hi element aa skta hai. kyu ki teen element 3 times aane se total size 9 ho jayega
- Toh instead of taking one count and one element variable in the above algo, we can take 2 counts and 2 element variables right?
- After getting the POSSIBLE majority elements don't forget to verify that. because both of them might not appear more than n/3 times

```javascript
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
```
--------------------------------------------------------------------------------------------------------------------------------

### 8. Kadane's Algo

- We will run a loop(say i) to iterate the given array.
- Now, while iterating we will add the elements to the sum variable and consider the maximum one.
- If at any point the sum becomes negative we will set the sum to 0 as we are not going to consider it as a part of our answer.

```javascript
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
```
--------------------------------------------------------------------------------------------------------------------------------

### 9. Next Permutation

We need to find out the next permutaion of 2,1,5,4,3,0,0 lets say ans : 2,3,0,0,1,4,5

- Step1: find out the break index from last to first where arr[i-1] < arr[i] ... here it will be 2 where 1 is sitting
- Step2: again run a loop from last to first and for the first element > the element at brwakindex swap them . 
At this point it will be 2 3 5 4 1 0 0. Notice that after 2 3 rest array is sorted in descending order
- Step3: from breakindex + 1 to last index reverse the array. take two pointer 

```javascript
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
```
--------------------------------------------------------------------------------------------------------------------------------

### 10. 2Sum 3Sum 4Sum

- 2Sum is pretty easy. So you need to sort the array first. 
- take two pointers left and right; left = 0, right = n-1
- if a[left] + a[right] == sum -> valid pair
- if a[left] + a[right] < sum -> left++;
- else right--

```javascript
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
```

- For 3Sum, the trick is to fix one pivot and then do same two pointer as we did in 2Sum for the remaining array
https://leetcode.com/problems/3sum/submissions/1255996853/

- 4Sum same way.. take two outer loop and Keep Left and right pivots
https://leetcode.com/problems/4sum/submissions/1256020557/

--------------------------------------------------------------------------------------------------------------------------------
### 11. Merge intervals

We are given an interval [[1,3],[2,6],[8,10],[15,18]] We need to convert this to [[1, 6], [8, 10], [15, 18]]
- For these problems we need to either sort it based on it's start times or end times
- Here we sort it based on their start times and we do inplace merge. 
- Whenever iTh index end time > j (i+1)th index start tiem we need to merge them
- While merging we need to take the minimum start time b/w i and j but max end time b/w i and j
- Whenever we have to merge 

```javascript
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
```
--------------------------------------------------------------------------------------------------------------------------------
### 12. Merge two sorted array without extra space

- One way is set i = arr1.length-1 and j = 0 
- make sure to swap arr1[i] and arr2[j] if arr1[i] > arr2[j] so that arr1 holds all lesser values than arr2 values.
- now sort arr1 and arr2 individually and then merge

```javascript
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
```

Approach 2: Gap method which is derived from shell sort

- Calculate gap = Math.ceil(m + n / 2) and place two pointers L and R separated by gap
- keep increemnting L and R and swap if arr1[L] > arr2[R]
- keep decrementing gap = Math.ceil(gap/2) till gap reaches 1

--------------------------------------------------------------------------------------------------------------------------------
### 13. Bit Manipulation Main formulas

```
- 2 ^ i = 1 << i
- to find setbit at i => num & (1 << i) == 1
- to set bit at i => num = num | (1 << i)
- XOR => n ^ 0 = n ; n ^ n =0
- For any number n = 2 ^ x => n & n-1 = 0
- to count set bits => do n = n & n-1 till n > 0 and simply count++;
- n * ( a1 ^ a2 ^ a3) = (n * a1) ^ (n * a2) ^ (n * a3)
- for Sum of XORs in a array sum = sum + (2 ^ i) * (setcount * unsetcount)
- (a1 & a3) ^ (a1 & a4) ^ (a2 & a3) ^ (a2 & a4 )= (a1 & (a3 ^ a4)) ^ (a2 & (a3 ^ a4))
```
--------------------------------------------------------------------------------------------------------------------------------
### 14. Missing and repeating numbers

- One easy way is to calculate Sum(arr) and Sum(natural 1 to n) and subtract them . We will get x - y where x =repeating number and y=missing
- Then again calculate Sum(Square of all elem of arr) and Sum(Square of natural 1-n) and subtract them, we will get x^2 - y^2
- then we can easily get x+y

```javascript
const findTwoElement= ( arr, n) => 
{
  var xminusy = [], xplusy = [], sum1 = 0, sum2 = 0, squareSum1 = 0, squareSum2 = 0;
  for(var i =1; i <= arr.length ; i++) {
    sum1 = sum1 + arr[i-1];
    sum2 = sum2 + i;
    squareSum1 = squareSum1 + Math.pow(arr[i-1], 2);
    squareSum2 = squareSum2 + Math.pow(i, 2);
  }
  xminusy = sum1 - sum2;
  xplusy = (squareSum1 - squareSum2)/ xminusy;
  var x = (xminusy + xplusy)/2;
  var  y = xplusy - x;
  console.log(x, y)
}
```

XOR method: 
- Step 1: WE need to XOR all elements of the array with all the natural numbers from 1 to NThis way we will get the Xor of repeating and missing number x ^ y
- Step 2: Now we need to find out the first setbit of the Xor element from right. We can do that using 1<<i and incrementing i from 0 to 32
- Step 3: Divide the array elements + natural numbers (1-N) in two buckets left and right. Left bucket should consist all numbers which doesn't have setbit at the index we found at Step 2. And Right bucket should consist all numbers which has setbit at the index we found at Step 2
- Step 4: Xor Left and Right bucket elements separately. We will get the missing and repeating numbers for sure. But we don't know which one is missing and which one is duplicate
- Step 5: Iterate over the array to find out which one is missing and which one is duplicate

--------------------------------------------------------------------------------------------------------------------------------
### 15. Inversion count

Need to find the inversion count of an unsorted array. Inversion count is the array is how far from getting sorted. 
for 2, 4, 1, 3, 5 -> it is 3. [4,1] [2,1] [4,3]

- One way to do is insertion sort but it will be O(n^2)

Other way to do is using merge sort - 
- Do Normal merge sort and while merging two arrays arr1 and arr2 take two pointers i and j  = 0 
- increment i and j such that if arr1[i] > arr2[j] count = count + arr.length - arr1[i] and j++ else i++
- Means if for a ith elemnt in arr1 if it's more than jth elemtn of arr2 that arr2[j] can be formed a pair with all the elements after i in arr1
- so count of pairs will increase by arr.length - i
- again check for j++ element till any ith element in arr1 beomes less than arr2[j]
- if that happens, increment i++
https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=inversion-of-array

Same pattern for another problem reverse pairs: https://leetcode.com/problems/reverse-pairs/submissions/1256915172/

--------------------------------------------------------------------------------------------------------------------------------
### 16. Binary search lower and upper bound

Lower bound means to find a numbers arr[i] >= x
- initiate ans = arr.length
- keep changing ans = mid whenever arr[mid] >= x

Upper bound means to find a numbers arr[i] > x
- initiate ans = -1
- keep changing ans = mid whenever arr[mid] <= x

Floor of an sorted array > We need to find maximum arr[i] <= x
- Can we say if the x smaller than the first element  my ans will be -1
- if I get any number a[mid] > x I will just make end = mid - 1 to check smaller number
- But if I get a[mid] <= x I will say probably ans = mid and I will try to find a larger number than arr[mid] by start=mid+ 1
```javascript
findFloor(arr, n, x)
    {
       let start = 0, end = n-1, ans = -1
       while(start <= end) {
           let mid = Math.floor((start + end) /2);
           if(arr[mid] > x) {
               end = mid-1;
           } else {
               ans = mid;
               start = mid+ 1;
           }
       }
       
       return ans;
    }
```
--------------------------------------------------------------------------------------------------------------------------------
### 17. How to search in a rotated sorted array

- find mid and see if left part sorted or right part sorted If arr[start] <= arr[mid] then obv left part sorted and right part is not
- if arr[start] > arr[mid] then obv right part sorted and left part is not
- see if the target is lying in the sorted part or not. if lying elminate the other part

```javascript
var search = function(nums, target) {
  let _start = 0, _end = nums.length -1, final = -1
  const _find = (start, end) => {
      if(start > end) return;
      let mid = Math.floor((start + end)/2);
      if(nums[mid] == target) {
          final = mid;
          return;
      }
      if(nums[mid] >= nums[start]) { // this means left part sorted
        if(nums[start] <= target && target <= nums[mid]) { // see if target is lying within start and mid then elimiate right part
            _find(start, mid-1)
        } else { // else elimiate the left part
            _find(mid+1, end);
        }
      } else { // this means right part sorted
        if(nums[mid] <= target && target <= nums[end]) { // see if target lying in the mid to right part, if yes, elimiate the left part
            _find(mid+1, end);
        } else { // else the right part
           _find(start, mid-1)
        }
      }
      
  }
  _find(_start, _end);
  return final;
};
```

If we need to find out the same in a rotated sorted array with duplicates though, we can't just apply the rule 
- that if arr[mid] == arr[start] the left side is sorted because it may be possible they are duplicated
- ex: 10111 -> 101 is not sorted though arr[start] = arr[mid] = 1
- To handle this, we need to add a condition - to basically shrink the search space from both end
```javascript
if(arr[start] == arr[mid] && arr[mid] == arr[end]) {
  _find(start+1, end-1);
}
```

https://leetcode.com/problems/search-in-rotated-sorted-array-ii/submissions/1257880783/ 

--------------------------------------------------------------------------------------------------------------------------------
### 18. How to find minimum in a rotated sorted array

- If we see arr[start] <= arr[mid] means left part is sorted, arr[start] is minimum, no need to check more in left part. check in right part _find(mid+1, end)
- else right part is sorted, so arr[mid] is the minimum, no need to further check in right part. check in left part _find(start, mid -1);
```javascript
var findMin = function(nums) {
    let _start = 0, _end = nums.length -1, min = Infinity
  const _find = (start, end) => {
      if(start > end) return;
      let mid = Math.floor((start + end)/2);
      if(nums[start] <= nums[mid]) { 
        min = Math.min(min, nums[start])
        _find(mid+1, end);
      } else { 
         min = Math.min(min, nums[mid])
        _find(start, mid-1)
      }
  }
  _find(_start, _end);
  return min;
};
```

- Find number of array rotation same pattern 
https://www.geeksforgeeks.org/problems/rotation4723/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=rotation

--------------------------------------------------------------------------------------------------------------------------------
### 19. Koko eating banana/ bouquet problem / find the smallest divisor and similar problem

- Consider finding out a sorted searchspace where we need find a element based on a condition
- Next step is find the condition to go left or right. 

https://leetcode.com/problems/koko-eating-bananas/
https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/submissions/1258626955/
https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/submissions/1258607211/

--------------------------------------------------------------------------------------------------------------------------------
### 20. Kth Missing number

- To do it in log(n) we do a binary search 
- condition to switch left right would be the mid missing => the missing numbers before mid will be arr[mid] - mid - 1
- if midmissing >= k we check left because if missing numbers are more at mid it is obvious that the missing numbers will be lesser in left side
- else we check right
- we let it run till start > end and start crosses over end and end becomes less than start
- at this point the element at high index + "some more" will give us the Kth missing number
- this some more is nothing but k - missing number at high index
- so our ans is arr[high] + (k - missing number at high)  = arr[high] + k - (arr[high] - high -1) = k + high + 1
- or since low is high+1 at this moment ans = k + low is also true

```javascript
var findKthPositive = function(arr, k) {
    let _start = 0, _end = arr.length -1, missingIndex = -1;
    const _find = (start, end) => {
        missingIndex = start;
        if(start > end) return;
        let mid = Math.floor((start + end) /2);
        let midMissing = arr[mid] - mid -1
        if(midMissing >= k) {
           _find(start, mid-1);
        } else {
           _find(mid +1, end)
        }
    };
    _find(_start, _end);    
    return missingIndex + k
};
```
--------------------------------------------------------------------------------------------------------------------------------
### 21. Aggressive cow

To find "maximum" of "minimum distances b/w cows"

Step 1: Define the search space - "minimum distances b/w cows"
- very important thing about these problems is to decie the search space. Here we need to find the maximum of minimum distances b/w cows
- so our searchspace should hold all the minimum distances between cows?
- So to find the minimum distances basic idea is the consecutive stalls differences should be the minimum always?
- so the start we can take as 1, end can be maximum stall position - minimum stall position because any two consecutive stall position diff will always be less than the diff b/w last and first stall right?
- so, sort the array
- i = 1 to max(array) - min(array)  this denotes the distance b/w cows

Step2: To decide when to move left and when to move right 
- If mid is probable ans, find "maximum" bcz we need maximum ans
- if for any mid value, we can place all the cows we will try to maximise it because we need maximum answer, so mid + 1, end
- else try to reduce -> start, mid- 1
- at last wherever high is, that is the maximum distance the cows can be placed.

Step3: Decide if mid is a probable answer?
- To decide if for a mid value all cows can be placed or not?
- Place at least one cow in the stalls[0] (last) and set count = 1
- Iterate the stalls array and increment count if we get a stall more than or equal to "mid" distance from the last stall where we placed the cow (stalls[0])
- If we get another stall >= mid distance, this becomes my new "last" stall and place another cow.
- At any point if cowCount == totalCows return true
- else return false

```javascript
aggresivecows(n, k, stalls) {
       stalls.sort((a,b) => a-b);
       let min = stalls[0], max = stalls[stalls.length - 1];
       let _start = 1, _end = max - min;
       // Time complexity is O(n)
       const canBeplaced = (dist) => {
           let prev = stalls[0], count = 1;
           for(var i  = 1; i < stalls.length; i++) {
               if(stalls[i] - prev >= dist) {
                   prev = stalls[i];
                   count++;
               }
               if(count == k) {
                   return true;
               }
           }
           return false;
       }
       // time complexity is O(logN)
       const _find = (start, end) => {
           if(start > end) return end;
           let mid  = Math.floor((start + end)/2);
           if(canBeplaced(mid, k)) {
               return _find(mid + 1, end);
           } 
           else {
               return _find(start, mid - 1);
           }
       }
       const minDis = _find(_start, _end);
       return minDis;
    }
```
--------------------------------------------------------------------------------------------------------------------------------
### 22. Book Allocation Problem

To find "minimum" of "maximum pages a student can be given"

Step 1: Define the search space - "maximum pages a student can be given"
- we need to define the searchspace as all possible ans of  "maximum pages a student can be given"
- what is the lower bound of this searchspace? it is max(arr) isn't it? 
- If our constraint is anything less than max(arr), how would the maximum page wala book be given to any student?
- REMEMBER: we can't violate the constraint. And constraint says the value should be the max pages a student can be given.
- So lower bound is max(arr) and upper bound is summation of all elements in array. why? because even if we give all the books to one student, they won't be given more than sum(all_elements_of_array) pages ever.

Step2: When to go right when to go left
- We need to minimise our ans so if we find a probable mid answer we go left (start, mid - 1)
- else we go right (mid + 1, right)

Step3: Logic to find our if mid is a probable ans
- To decide if for a mid value (contraint of max page which can be given to a student) we can give all students all the books or not?
- Give the first book to the first student, count = 1, sum = arr[0]
- Now if we give the next book also to the same student is our constraint breaching? means sum + arr[0] > mid ?
- If not, give it to same student, don't increment count
- If it's breaching, set sum = arr[i] and count++ 
- In the end whatever count we got, if it's less than or equal to total student available, return true; else false

```javascript
const findPages = (arr, m) => {
  if(m > arr.length) return -1
  let maxInArr = -Infinity;
  for(var i = 0; i< arr.length; i++) {
    if(arr[i] > maxInArr) {
      maxInArr = arr[i]
    }
  }
  let min = maxInArr, max = arr.reduce((acc, curr) => acc + curr, 0);
  let _start = min, _end = max, ans = Infinity, final = []
  const canBeGivenToAllStudents = (_pages) => {
      let sum = arr[0], count = 1;
      for(var i  = 1; i < arr.length; i++) {
        sum = sum + arr[i];
        if(sum > _pages) {
          sum = arr[i]
          count++;
        }
      }
      if(count <= m) return true;
      return false;
  }
  const _find = (start, end) => {
      if(start > end) return;
      let pages  = Math.floor((start + end)/2);
      if(canBeGivenToAllStudents(pages)) {
        ans = Math.min(ans, pages);
        _find(start, pages - 1);
      }
      else {
        _find(pages + 1, end);
      }
  }
   _find(_start, _end);
  console.log(ans);
}
```
Similar problems: 
https://leetcode.com/problems/split-array-largest-sum/
https://www.naukri.com/code360/problems/painter-s-partition-problem_1089557?utm_source=striver&utm_medium=website&utm_campaign=a_zcoursetuf&leftPanelTabValue=SUBMISSION

Always remember the three steps for any BS problem

--------------------------------------------------------------------------------------------------------------------------------

### 23. Median of two sorted array

- We can do it using linear search O(n1 + n2) also but optimal way is binary search
- Let's say `arr1: [ 1 3 4 7 10 12] arr2: [2 3 6 15]`

Step1: To draw a symetry between two arrays we need the num. of elements that would be there in the left part 

- if there are total even elements in both arrays, we can surely say that n/2 elements will be in left part and right part both
- if there are odd num of elements let's take n/2 + 1 part in left and n/2 elements on right. e.g. total 5 elements, we can say 3 will be on left and 2 on right?
- If we notice then the symtery line is being drawn at `(arr1.length + arr2.length + 1) /2` position

```
symteryMid = (arr1.length + arr2.length + 1) /2
```

Step2: Figure out the searchspace of binary search

- We will have to figure what are the elements that should be there in the left part of the symtetry line. 
- This left part will consist of elements from both arr1 and arr2, right?
- So we need to figure out how many elements will be there from arr1 and how many from arr2
- So there can be minimum `0` elements from arr1 and maximum `arr1.length` num of elements from arr1
- So can we say our search space is from `0 to arr1.length`?
- `IMP: arr1 should have least number of elements. if not, swap arr1 and arr2`

Step3: Figure out the l1, l2 r1, r2

- Now that we are running a loop from `0 to arr1.length`, for any start1 and end1 we will get a mid1
- mid1 is the number of elements we are picking from arr1
- so `mid2  = (arr1.length + arr2.length + 1) /2  - mid1` where `mid2` is the number of elements we are picking from arr2
- then what is the last index of the arr1 that is present in left part of the symtery line? its obvly `arr[mid1 - 1]` we call this `l1`
- what is the last element of arr2 that is present in left part? it would be `arr[mid2 - 1]` we call this `l2`
- what is first element of arr1 present in right side of the symtery line? it would be `arr[mid1]` bcz we have picked mid1 elemns from arr1 for the left side right? we call it `r1`
- and the first elem from arr2 present in right side is `arr[mid2]` we call it `l2`

```
mid1 = (start1 + end1) / 2
mid2 = symteryMid - mid1;

if(mid1 - 1 >=0) l1 = arr1[mid1 -1];
if(mid2- 1 >=0)  l2 = arr2[mid2 -1];
if(mid1 < arr1.length)  r1 = arr1[mid1];
if(mid2 < arr2.length)  r2 = arr2[mid2];
```

Step3: When to go left and when to go right and when to exit

- In typpical binary search we say `if arr[mid] == element` exit `if arr[mid] > element` shift end to mid else shift start to mid, right?
- here `l1 <= l2` and `r1 <= r2` is always guranteed bcz they are part of same array and sorted, right?
- So just have to check l1 ith r2 and l2 with r1
- So if `l1 <= r2 && l2 <= r1` we exit and we calculate median
- If `l1 > r2` we need to find a smaller number for l1 so we go left in arr1 `find(start1, mid1 - 1);`
- Else we go right - `find(mid1 + 1, end1);`

```
if(l1 <= r2 && l2 <= r1) {
  //calculate median
}
else if(l1 > r2) {
  _find(start1, mid1 -1)
} else {
  _find(mid1 + 1, end1)
}
```

Step4: Finding the median

- Final step is to determne the median if `l1 <= r2 && l2 <= r1`
- if it is a even case there will be l1, l2 and r1, r2 in both sides, right? so median should be `(min(l1, l2) + max(r1, r2))/2`
- if it's a odd case, then  median will be `max(l1, l2)`

```
if ((arr1.length + arr2.length) % 2 === 1) return Math.max(l1, l2);
else return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
```

```javascript
var findMedianSortedArrays = function(nums1, nums2) {
    if(nums2.length < nums1.length) {
       return findMedianSortedArrays(nums2, nums1);
    }
    const n1 = nums1.length;
    const n2 = nums2.length;
    const totalLength = n1 + n2;
    const symetryMid = Math.floor((n1 + n2 + 1)/ 2);
    const _find = (start, end) => {
        if(start > end) return 0;
        let mid1 = Math.floor((start + end)/ 2);
        let mid2 = symetryMid - mid1;
        let l1 = -Infinity, l2 = -Infinity;
        let r1 = Infinity, r2 = Infinity;

        if(mid1 < n1) r1 = nums1[mid1];
        if(mid2 < n2) r2 = nums2[mid2];
        if(mid1 - 1 >= 0) l1 = nums1[mid1 - 1];
        if(mid2 - 1>= 0) l2 = nums2[mid2 - 1];

        if(l1 <= r2 && l2 <= r1) {
            if(totalLength % 2 == 0) {
                return ((Math.max(l1, l2) + Math.min(r1, r2)) / 2);
            }
            else {
                return Math.max(l1, l2);
            }
        }
        else if(l1 > r2) {
            return _find(start, mid1 -1);
        }
        else {
            return _find(mid1+1, end);
        }
    };
    return _find(0, n1);
};
```
--------------------------------------------------------------------------------------------------------------------------------