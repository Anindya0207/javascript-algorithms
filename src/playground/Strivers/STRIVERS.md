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
      map[sum] = (map[sum] || 0) + 1;
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
- The loop will run till mid <= high

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

- 2 ^ i = 1 << i
- to find setbit at i => num & (1 << i) == 1
- to set bit at i => num = num | (1 << i)
- XOR => n ^ 0 = n ; n ^ n =0
- For any number n = 2 ^ x => n & n-1 = 0
- to count set bits => do n = n & n-1 till n > 0 and simply count++;
- n * ( a1 ^ a2 ^ a3) = (n * a1) ^ (n * a2) ^ (n * a3)
- for Sum of XORs in a array sum = sum + (2 ^ i) * (setcount * unsetcount)
- (a1 & a3) ^ (a1 & a4) ^ (a2 & a3) ^ (a2 & a4 )= (a1 & (a3 ^ a4)) ^ (a2 & (a3 ^ a4))
- the formula to find xor of n natural numbers is - 
```javascript
findXorOfNNaturalNum(n) {
    switch(n%4) {
        case 0:
            return n;
        case 1:
            return 1;
        case 2:
            return n+1;
        case 3: 
            return 0;
    }
}
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
- increment i and j such that if arr1[i] > arr2[j] count = count + arr.length - i and j++ else i++
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

### 24. Kth element of two sorted array

- Same pattern as previous problem but instead of drawing the symetrymid at `(n1 + n2 + 1 )/2` we will have to draw at `k` isn't it?
- Also, when `l1 <= r2 && l2 <= r1` we will return `Math.max(l1, l2)` since that would be the max elem of the left part which is also the Kth element of the sorted merged array
- But the catch is here the lower bound and upper bound will not be `(0, n1)`
- Imagine n1 = 6 and k = 2, can we choose 6 elements from arr1 at max? no. we can choose k elements from arr1 at max. So upper bound is `Math.min(n1, k)`
- Now Imagine n2 (size of the right arr) = 5 and K = 8, we have chooe minimum 3 elem from arr1 right? so the lower boudn is `Math.max(0, k- n2)`\

```javascript
kthElement(A,B,n,m,k){ 
        
        if(B.length < A.length) {
            return this.kthElement(B, A, m, n,k);
        }
        let min = Math.max(0, k - m);
        let max = Math.min(k, n);
        const _find = (start, end) => {
            if(start > end) return 0;
            let mid1 = Math.floor((start + end) /2);
            let mid2 = k - mid1;
            let l1 = -Infinity, l2 = -Infinity;
            let r1 = Infinity, r2 = Infinity;
            if(mid1 < n) r1 = A[mid1];
            if(mid2 < m) r2 = B[mid2];
            if(mid1-1 >=0) l1 = A[mid1 - 1];
            if(mid2-1 >=0) l2 = B[mid2 - 1];
            
            if(l1 <= r2 && l2 <= r1) {
                return Math.max(l1, l2);
            }
            else if(l1 > r2) {
                return _find(start, mid1 - 1);
            } else {
                return _find(mid1 + 1, end);
            }
        }
       return _find(min, max);
    }
```
--------------------------------------------------------------------------------------------------------------------------------

### 24. Search in a 2D matrix where row are sorted in increasing order and column are also sorted in increasing order

```
const matrix = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
];
```

- One way to do is binary search, just traverse every row and do binary search on the columns since we can't traverse the entire range. O(N logM)
- Another way is start from matrix[n-1, 0] or matrix[0, m-1] and traverse the matrix.
- If the current element > target we know we want lesser value, so move row wise
- If the current elemtn < target we need bigger value to move column wise

```javascript
var searchMatrix = function(matrix, target) {
    const n = matrix.length;
    const m = matrix[0].length;
    let i = n-1, j = 0
    while(i >= 0 && j < m) {
        if(matrix[i][j] == target) return true;
        if(matrix[i][j] > target) i--;
        else j++;
    }
    return false;
}
```
--------------------------------------------------------------------------------------------------------------------------------
### 25. Find the median in a 2D matrix where rows are sorted

```
[
[1, 3, 5], 
[2, 6, 9], 
[3, 6, 9]
];
```
Step1: Find the min and max of the matrix

- Iterate the first column to find min, and last column to find max

Step2: Apply binary search between min and max

- Now that we know the search space apply BS betweem min and max
- Now for a element to be median there should be at least `(row * col) / 2` elements to the left of it?
- So our condition to go left or right in BS will be based on that
- If for a element the `number of elements lower or equal to that element` <= `(row * col) / 2` try more so go right. (mid + 1, end)
- else go left (start, mid - 1)
- `Finally when start > end start is my answer`

Step3: Determine how many elements before a certain element in the matrix

- Iterate each row and do BS on the given row for the element
- Say, mid of the row is > the element, we need to check lesser in that row because we want such element which would be <= the element
- So if matrix[row][mid] > element go left
- else go right and store the index
- finally the total number would be total += index + 1 because that many numbers are more than element

```javascript
const median = (matrix, R, C) => {
    let min = Infinity, max = -Infinity, midCount = Math.floor((R * C) / 2)
    for(var row =0; row< R; row++) {
        if(matrix[row][0] < min) {
            min = matrix[row][0];
        }
        if(matrix[row][C-1] > max) {
            max = matrix[row][C-1];
        }
    }
    const _start = min, _end = max;
    let ans = Infinity;
    const countElementsLowerThan = (element) => {
        let total = 0, currentIndex = -1
        const _findUpperBound = (row, start, end) => {
            if(start> end) return currentIndex;
            let mid = Math.floor((start + end) /2);
            if(matrix[row][mid] > element) {
                _findUpperBound(row, start, mid - 1);
            } else {
                currentIndex = mid;
                _findUpperBound(row, mid + 1, end);
            }
        };
        for(var i = 0; i < R; i++) {
            currentIndex = -1
            _findUpperBound(i, 0, C-1);
            total += currentIndex + 1;
        }
        return total;
    };
    const _findMedian = (start, end) => {
        if(start > end) {
            ans = start;
            return;
        }
        let mid = Math.floor((start + end) /2);
        const _sm = countElementsLowerThan(mid);
        if(_sm <= midCount) {
            _findMedian(mid + 1, end);
        } else {
            _findMedian(start, mid-1);
        }
    };
    _findMedian(_start, _end);
    console.log(ans);
}

```
--------------------------------------------------------------------------------------------------------------------------------

### 26. Reverse a LL (recursive)

We know how to reverse a LL in iterative approach

```
const next = pivot.next;
pivot.next = previous;
previous = pivot;
pivot = next;
```
To reverse it in recursive approach :
- we need to call the recursive function with pivot and pivot.next f(_prev, _pivot)
- keep calling it till _pivot becomes null. when _pivot is null set head at _prev and return _prev
- Whatever we return from the recursive function, we need to set the next of that node as current _prev
- But we need to make sure to make _prev.next = null to avoid cycle in list

```javascript
var reverseList = function(head) {
    const _reverse = (previous, pivot) => {
        if(!pivot) {
            head = previous;
            return previous;
        }
        const retNode = _reverse(pivot, pivot.next);
        if(previous) previous.next = null;
        retNode.next = previous;
        return retNode.next;
    }
    _reverse(null, head);
    return head;
}
```
--------------------------------------------------------------------------------------------------------------------------------

### 27. Detect begining of a LL cycle

- Idea is to start a slow and fast pointer
- When they meet, we will reset the slow pointer to head and now slow and fast pointer will move in same pace
- when they meet again is the begining of the cycle

```javascript
var detectCycle = function(head) {
    if(!head || !head.next) return null;
    let slow = head, fast = head;
    while(slow  && fast && slow.next && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow == fast) {
            break;
        }
    }
    if(slow != fast) return null;
    slow = head;
    while(slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}
```
--------------------------------------------------------------------------------------------------------------------------------

### 28. Find middle of LL (First middle and second middle)

- We will use slow and fast pointer
- When fast pointer reaches end, slow pointer will be on middle. In this case, we initialise slow = fast = head
- But, if LL length is even, slow will be mid + 1 th position
- To find the first middle we initialise slow = head, fast = head.next;

```javascript
const _findMid = (start) => {
    let slow = start, fast = start.next;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```
--------------------------------------------------------------------------------------------------------------------------------

### 29. Copy list with random pointer

We need to deep copy a LL with a next and a random pointer. challenge is while copying we can't link the random pointers because those nodes might be created as well

Approach1: Hashmap

- Traverse the original LL, keep creating the copy LL nodes and remember the oldnode to new node map in a hashmap
- After the new LL is created, iterate the original LL again and for randoms, just do map(oldnode.random) 

Approach2: O(1) Approach
- instead of hashmap store the new nodes in middle of the old nodes such that newNode = oldNode.next
- Iterate the old LL and assign the random pointers as in for any copyNode (pivot.next) copyNode.random will be pivot.random.next;
- Now link the new nodes to create the new LL by setting the next properly. 

```javascript
var copyRandomList = function(head) {
    let pivot = head; newList = new Node(-1), newNodeP = newList;
    while(pivot) {
        const newNode = new Node(pivot.val, null, null);
        let next = pivot.next;
        pivot.next = newNode;
        newNode.next = next;
        pivot = next;
    }
    pivot = head;
    while(pivot) {
       let _random = pivot.random;
       let copyNode = pivot.next;
       copyNode.random = _random?.next;
       pivot = pivot.next.next;
    }
    pivot = head;
    while(pivot) {
        newNodeP.next = pivot.next;
        pivot.next = pivot.next.next;
        pivot = pivot.next;
        newNodeP = newNodeP.next;
    }
    return newList.next;
}
```
--------------------------------------------------------------------------------------------------------------------------------
### 30. Pow(x, n)

- We can do with simple recursion like n * f(n - 1) but for a long n it will give max call stack exceeded
- So we will take a different approach
- If n is even we can say x ^ n  = (x * x) ^ n/2 right?
- similarly if n is odd can we say x ^ n = x * (x ^ n-1)?
- So if we apply that in recursion we will have to return 1 if n == 0
- if n is even return func(x * x, n/2) 
- If n is off return func(x * n -1);

```javascript
var myPow = function(x, n) {
    let n1 = n < 0 ? -1 * n : n;
    const _calc = (_x, _n) => {
        if(_n == 0) return 1;
        let temp = _calc(_x, Math.floor(_n/2));
        if(_n % 2 != 0) {
           return _x * temp * temp;
        } else {
           return temp * temp
        }
    }
    const jjj = _calc(x, n1);
    return n > 0 ? jjj : 1/jjj
};
```
--------------------------------------------------------------------------------------------------------------------------------
### 31. Count number of subsequence / unique subsequence

- We know how to calculate all the possible subsequence of an array or string using "take/ notake" technique. It takes O(2^n) TC
- but if we need to count the number of subseq do we need to calculate all the subseq? No, we don't

Calculate count of subsequences for an array or string
- We take a dp[] (1- indexed) and initialise `dp = [1]`
- Iterate array/string from 1 to LEN 
- For every element we do `dp[i] = 2 * dp[i-1]`
- finally the total number of subsequence will be `dp[LEN]` or `dp[i-1]` (i will exit from loop as LEN+1)

Now what if we need to find count of distinct subsequnce?
- In addition to the above dp calculation we need to store the index of every element in a map (1-index) like `map[el] = i`
- If we encounter the same element again in the sequence, then we subtract the `dp[i]` with `dp[map[el] -1]` -> `dp[i] -= dp[map[el] -1]`

```javascript
var betterString = function(str1, str2) {
    let map = {}, count1 = 0 , count2 = 0, dp = [1];
    for(var i = 1; i <= str1.length; i++)  {
        dp[i] = 2* dp[i-1];
        if(map[str1.charAt(i-1)]) {
            dp[i] -= dp[map[str1.charAt(i-1)] -1];
        }
        map[str1.charAt(i-1)] = i;
    }
    count1 = dp[i-1] // 7
    map = {}, dp =[1];
    for(var i = 1; i <= str2.length; i++)  {
        dp[i] = 2* dp[i-1];
        if(map[str2.charAt(i-1)]) {
            dp[i] -= dp[map[str2.charAt(i-1)] -1];
        }
        map[str2.charAt(i-1)] = i;
    } 
    count2 = dp[i-1] // 4
   if(count1 >= count2) return str1;
   return str2
};

betterString('gfg', 'ggg');
```
https://www.geeksforgeeks.org/problems/better-string/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=better-string

--------------------------------------------------------------------------------------------------------------------------------
### 32. Subset with Sum K (Finding existence, Count, Print all subset)

Approach 1: 
- We can use our plain take/notake technique for recursion to find all subset with sum K but it will give TLE bcz O(2^N)

Approach 2: DP


--------------------------------------------------------------------------------------------------------------------------------

### 33. Combination Sum I/ II OR Finding All Unique Subset 

Combination Sum I: to find all combinations (with infinity repeatation of one number) to make target
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]

- We will use our plain take/notake technique for recursion
- Only difference is, we will take an element but won't go to next element until the accumulated sum exceed target

```javascript
var combinationSum = function(candidates, target) {
    let final = [];
    const _calc = (index, arr, sum) => {
        if(index >= candidates.length) {
            if(sum == target) final.push(arr);
            return;
        }
        _calc(index + 1, arr, sum);
        if(sum + candidates[index] <= target) {
            // calling method with same index and appending same number
            _calc(index ,[...arr, candidates[index]], sum + candidates[index]);
        }
    };
    _calc(0,[], 0);
    return final
};
```

Combination Sum II: to find all "unique" combinations from a duplicate array
Input: [1,1,1,2,2] Output: [[1,1,2], [2,2]]

- We can do this using take no take method and a hashset to check uniqueness but that will take O(2^N * k * logN)
2^ N is for the recursions, k is for putting it in a datastucture (...arr, el) and extra logN because we will be taking a extra set to put the temp arr. This will give TLE for some cases.
- To optimise we need to think of completely different solution

Optimised approach 
- Sort the array
- We need to iterate over the array for any given index and call the recursive method for the non duplicate elements.
- e.g lets say we call the recursive method with index 0, so i will be like 0 to n and it will call the next recursive call for i = 0 and i = 3 
- for i= 0 the call will be with `i+1, [...arr, candidates[0]], sum + candidates[0]` and likewise
- so our for loop will be like if `i > index && candidates[i] != candidates[i-1]` we just `i++` else we call the function again and do `i++`

```javascript
var combinationSum2 = function(candidates, target) {
    let final = [];
    candidates.sort((a, b) => a-b);
    const _calc = (index, arr, sum) => {
        if(sum == target) {
            final.push(arr);
            return;
        }
        let i = index;
        while(i < candidates.length) {
            if(i != index && candidates[i] == candidates[i-1]) {
                i++;
            } else {
                if(sum + candidates[i] <= target) {
                    _calc(i+1, [...arr, candidates[i]], sum + candidates[i]);
                }
                i++;
            }
        }
    }
    _calc(0, [], 0);
    return final;
}
```
Similar problem https://leetcode.com/problems/subsets-ii/submissions/1269250768/
- When we iterate in the for loop it will make sure it doesn't call the recursive method with a duplicate element
- So, Push the arr everytime the recursive method is fired. It will give all unique subsets
--------------------------------------------------------------------------------------------------------------------------------

### 34. Palindrome Partitioning

TO output all valid palindrom paritions of a given str. E.g: for  "aab" -> [["a","a","b"],["aa","b"]]

- We need to iterate over the string and whenever we will encounter a palindrom, we will put a partition over there and interate over the next part of the array till we find another valid palindrome.
- Let's say we start with "a" which is a valid palindrome (*Remember), so put "a" in a temp array and call the recursion with "ab"
- iterate over "ab" and see where we can put a parition, we can put after "a" so put "a" in the temp array again and call for "b"
- once we reach index >= s.length put the temp array in final . so we got a combination "a", "a", "b"
- Now remember the first loop (refer *Remember), it will go to next index and find "aa" also a valid palidrome. so it will call the recursion with "b" putting "aa" in a temp array. 
- since "b" is also a valid palindrome and we reached end it will put "aa", "b" in the temp array
- So finally we got two arrays in our final array => [["a","a","b"],["aa","b"]]

```javascript
const checkPalindrom = (str) => {
    return str == str.split('').reverse().join('');
}
const partition = (str) => {
    let final = [];
    const _calc = (index, arr) => {
        if(index >= str.length) {
            final.push(arr);
            return;
        }
        for(var i = index; i < str.length; i++) {
            const left = str.substring(index, i + 1);
            if(checkPalindrom(left)) {
                _calc(i + 1, [...arr, left]);
            }
        }
    }
    _calc(0, [])
    return final;
}
```
--------------------------------------------------------------------------------------------------------------------------------
### 35. M coloring problem

To detect if M colors can be applied to color all verticer of a undirected graph such that no adjacent vertices have same color

- We can iterate over the colors and we need to check if for any rowIndex we can assign any color or not
- We initiate the recursion with row 0
- We recrisvely call for row 1 onwards and expect a true/false value if any color could be applied or not
- We have to assign a color before traversing to another row, if it's assigned return true, otherwise de-assign the color

```javascript
 graphColoring(graph, m, n) {
    let map = {};
    const canAssignColor = (rowIndex, color) => {
        for(var col = 0; col < n; col++) {
            const el=graph[rowIndex][col];
            if(el && map[col] == color){
                return false;
            }
        }
        return true;
    }
    const _calc = (index) => {
        if(index >= n) return true;
        for(var i = 1; i <= m; i++) {
            if(canAssignColor(index, i)) {
                map[index] = i;
                if(_calc(index+1)){
                    return true;
                }
                delete map[index];
            }
        }
        return false;
    }
    return _calc(0) ? 1: 0
}
```
similar pattern :https://leetcode.com/problems/sudoku-solver/description/

--------------------------------------------------------------------------------------------------------------------------------

### 36. Expression Add Operators

Given a string of numbers we need to find out all possible comb with +, - and * such that the expression evals to target
num = "123", target = 6, -> ["1*2*3","1+2+3"]
num = "105", target = 5 -> ["10+5", "1*0+5"]

- Since we need to find all possible combinations we can run a loop from 0 to end and for every substr of the actual string, we can do the + , -, * operations
- for every operation we can call the same recursive function like we were doing for combination sum 2 or palindrome partition
- We need to call the reursion with index, calculated string, currentEvalutaed value and prev, why?
- Because when we do + or - we can simply do so with the last evaluated value but not for *
- For * we need to do `evaluatedval - prev + (prev * curentVal)`. let's say we had 1+2 so far now we need to do *3
- so we need to actually do `1+2 -2 + (2*3)`
- lets say we had 1-2 so far now we need to do * 3 so actually we need to do `1 - 2 -(-2) + (-2 * 3)`
- to remove leading zero we need to do `if(i > index && num.charAt(index) == '0') break;`

```javascript
var addOperators = function(num, target) {
    let final = [];
    const _calc = (index, str, curr, prev) => {
       if(index >= num.length) {
        if(curr == target) {
            final.push(str);
            return;
        }
       }
       for(var i = index; i < num.length; i++) {
        if(i > index && num.charAt(index) == '0') break;
        const substr = num.substring(index, i+1);
        const currVal = Number(substr);
        if(index == 0) {
            _calc(i+1, substr, currVal, currVal);
        } else {
            _calc(i+1, `${str}+${substr}`, curr+currVal, currVal);
            _calc(i+1, `${str}-${substr}`, curr-currVal, -currVal);
            _calc(i+1, `${str}*${substr}`, curr-prev+(prev*currVal), (prev*currVal));
        }
       }
    }
    _calc(0, ``, 0, 0);
    console.log(final)
};
addOperators("105", 5); 
```
--------------------------------------------------------------------------------------------------------------------------------

### 37. Just for fun - Swap two numbers

```javascript
    // method 1
    b = a - b;
    a = a - b;
    b = a + b;
    return [a,b]

    // method 2
    return [b, a]

    // method 3
    b = a * b;
    a = b / a;
    b = b / a;
    return [a,b]
    
    // method 4
    b = a ^ b;
    a = a ^ b;
    b = a ^ b;
    return [a,b]
```
--------------------------------------------------------------------------------------------------------------------------------

### 38. Divide two integers without dividing them

- behat hi bekar ka problem hai. Agr interview me puche toh pehle do gaali dena man me
- thought process is we need to subtract `divisor * 2^i` from `dividend` where i should be as large as possible
- Means if we are dividing 22 by 3. we can subtract 3 * 2^2 at max from 22, let's do that. 22-12 = 10
- Now we can subtract 3*2^1 at max from 10. 10-6 = 4
- Now we can subtract 3*2^0 from 4. 4-3= 1
- We can't subtract any more. so ans = 2^2 + 2^1 + 2^0 = 7

```javascript
var divide = function(dividend, divisor) {
    if(dividend == divisor) return 1;
    let signed = false;
    if((dividend >0 && divisor < 0) || (dividend < 0 && divisor > 0)) signed = true;
    let a = Math.abs(dividend), b = Math.abs(divisor), ans = 0;
    while(a >= b) {
        let count = 0;
        // This is very important to start with count+1
        while(a >= (b << (count + 1))) {
            count++;
        }
        ans += 1 << count;
        a = a - (b << count); 
    }
    if(ans == 1<<31 && signed) return -(1<<31)
    if(ans == 1<<31 && !signed) return (1<<31) - 1;
    return signed ? -ans : ans
};
```

--------------------------------------------------------------------------------------------------------------------------------

### 39. Unique prime factors of a number

- There are 4 different approaches
- Noob approach is to iterate from 1 to N and see if any number is a divisor, check if it's prime. TC - O(N * sqrt(N))
- Better approach is to iterate from 1 to sqrt(N) and see if any number i is a divisor and is prime, push that number and also check if N / i is also a prime? then push that too. TC- O(sqrt(N) * 2 * sqrt(N))
- Senior approach is to iterate from 2 to N, divide N by 2 and push it and keep doing it until its no more divisable by 2. Thus it will be never divisable by 4, then do with 3. TC- O(N) worst case because for a large number which is prime, it will still run till N
- Pro approach is to iterate from 2 to sqrt(N), do whatever we are doing above and finally push N also in final (if N != 1). TC - O(sqrt(N) * log(N))

```javascript
const isPrime = (n) => {
    if(n == 1) return false;
    for(var i= 2; i <= Math.sqrt(n); i++){
        if(n % i == 0) return false;
    }
    return true;
}
// Noob developer O(N*sqrt(N))
const allPrimeFactors1 = (n) => {
    let final = []
    for(var i = 1; i <= n; i++) {
        if(n%i == 0 && isPrime(i)) {
            final.push(i);
        }
    }
    return final
}
// Junior developer O(sqrt(N) * 2 * sqrt(N))
const allPrimeFactors2 = (n) => {
    let final = []
    for(var i = 1; i <= Math.sqrt(n); i++) {
        if(n%i == 0) {
            if(isPrime(i)) final.push(i);
            if(isPrime(n/i) && n/i != i) {
                final.push(n/i);
            }
        }
    }
    return final
}
// senior developer O(N) because worst case for a large number which is prime, it will run till N
const allPrimeFactors3 = (n) => {
    let final = []
    for(var i = 2; i <= n; i++) {
        if(n%i == 0) {
            final.push(i);
            while(n %i == 0) {
                n = n / i;
            }
        }
    }
    return final
}
// Kickass developer O(sqrt(N) * logN)
const allPrimeFactors4 = (n) => {
    let final = []
    for(var i = 2; i <= Math.sqrt(n); i++) {
        if(n%i == 0) {
            final.push(i);
            while(n %i == 0) {
                n = n / i;
            }
        }
    }
    if(n != 1) final.push(n);
    return final
}
```
--------------------------------------------------------------------------------------------------------------------------------

### 40. Sieve of Eratosthenes

To find if a number N is prime in O(1)

- Idea is to create an array of N + 1 length and fill with 1
- Iterate from 2 to sqrt(N) 
- for each number iterate an inner loop of j which will run from i ^ 2 till N and mark all of the arr[j] as 0
- Finally we will only end up with an array with primes marked as 1.
- Now to get if a number is prime we can just do arr[num]

```javascript

// pre-computation
const primeArray = new Array(limit + 1).fill(true);
primeArray[0] = primaryArray[1] = false;
for(var i = 2; i <= Math.sqrt(limit); i++) {
    for(var j = i*i; j<= limit; j+=i) {
        primeArray[j] = false
    }
}

const isPrime = (num) => primeArray[num];
```
--------------------------------------------------------------------------------------------------------------------------------

### 41. Min stack

We need to implement a MinStack class where push(), pop(), top() and getMin() all should take TC - O(1)

Approach 1: TC- O(1) SC - O(2N)

- Instead of pushing a single value to the stach push [val_to_be_pushed, current_min]
- If again pushing, just check with the arr[top][1] value if val_to_be_pushed <  arr[top][1] then push [val_to_be_pushed, val_to_be_pushed] else push [val_to_be_pushed, arr[top][1]]. idea is the top most element of the stack should hold the minimum always
- at the time of pop just pop the top most element[0], no tension
- getMin also return top most element[1], no tension

```javascript
var MinStack = function() {
    this.head = -1;
    this.arr = [];
};

MinStack.prototype.push = function(val) {
    if(this.head == -1) {
        this.arr[++this.head] = [val, val];
    } else {
        let lastel = this.arr[this.head];
        this.arr[++this.head] = [val, Math.min(lastel[1], val)];
    }
};

MinStack.prototype.pop = function() {
    if(this.head == -1) return -1;
    const retVal = this.arr[this.head][0];
    this.head--;
    return retVal;
};

MinStack.prototype.top = function() {
     if(this.head == -1) return -1;
     return this.arr[this.head][0];
};
```

Approach 2: TC - O(1) SC - O(1)

- Store the minimum in a variable min
- if value_tobe_pushed > min no need to update min and push value_tobe_pushed
- if `value_tobe_pushed < min` then dont push value_tobe_pushed, `Rather push 2*value_tobe_pushed - min`. We are pushing a modified value to the stack
- For getMin just return min
- For top just check if arr[top] < min => this means we have pushed some modified value in the stack return min else return arr[top]
- For pop, if `arr[top] < min` => this means we have pushed a modified value, so `return min` and make `min = 2*min-arr[top]`

```javascript
var MinStack = function() {
    this.head = -1;
    this.arr = [];
    this.min = Infinity
};
MinStack.prototype.push = function(val) {
    if(this.head == -1) {
        this.arr[++this.head] = val;
        this.min = val;
        return;
    }
    if(val < this.min) {
        this.arr[++this.head] = 2 * val - this.min;
        this.min = val;
    } else {
        this.arr[++this.head] = val
    }
};
MinStack.prototype.pop = function() {
    if(this.head == -1) return -1;
    if(this.arr[this.head] < this.min) {
       const retVal  = this.min;
       this.min =  2 *  this.min - this.arr[this.head]
       this.head--
       return retVal;
    } else {
        const retVal = this.arr[this.head]
        this.head--;
        return retVal;
    }
   
};
MinStack.prototype.top = function() {
     if(this.head == -1) return -1;
     return this.arr[this.head] < this.min ? this.min : this.arr[this.head];
};
MinStack.prototype.getMin = function() {
    if(this.head == -1) return -1;
    return this.min;
};
```

--------------------------------------------------------------------------------------------------------------------------------

### 42. Infix/Prefix/Postfix -> Infix/Prefix/Postfix

Infix -> Postfix : A * ( B + C ) / D -> A B C + * D /

- If we get a operand (A,B, C etc) push in the string
- If we get a operator push in a stack
    - string =  "A" stack = [ * ]
- If we get ( push in stack string =  "AB" stack = [ *, ( ]
- If we get operand again and the stack top is ( push in stack string =  "ABC" stack = [ *, ( , +]
- If we get ) pop until we get ( and push the operands in string string =  "ABC+" stack = [ * ]
- If we get operand again and stack top is another operand whose precendece is lesser or equal to the current char, pop string =  "ABC+*" stack = [/]
- end of string, pop every thing from stack and append Hence final string is ABC+*D/

Infix -> Prefix : A * ( B + C ) / D -> * A / + B C D

- Reverse the string -> D / ( C + B ) * A. notice that we have considered '(' for ')' and ')' for '(' while reversing
- Convert to Postfix -> D C B + / A * How? check Infix -> Postfix conversion
- Reverse the output string -> * A / + B C D

Prefix -> Infix : * - A / B C - / A K L -> ( ( A - ( B / C ) ) * ( ( A / K ) - L ) )

- Prefix to any conversion traverse from last to first of the input string
- For Any operand (A,B,C etc) push in the stack
- Any operator, pop last two string from stack and apply the operator in between and enclose in bracket and push it back in the stack
- Note that here after each pop,if s1 pops before and s2 pops after we will apply the operator like s1 operator s2

Prefix -> Postfix : * - A / B C - / A K L -> A B C / - A K / L - *

- Prefix to any conversion traverse from last to first of the input string
- For Any operand (A,B,C etc) push in the stack
- Any operator, pop last two string from stack and apply the operator at last and push it back in the stack
- Note that here after each pop,if s1 pops before and s2 pops after we will apply the operator like s1 operator s2

Postfix -> Infix:  A B C / - A K / L - * ->  ( ( A - ( B / C ) ) * ( ( A / K ) - L ) )

- Postfix to any conversion traverse from first to last of the input string
- For Any operand (A,B,C etc) push in the stack
- Any operator, pop last two string from stack and apply the operator in middle enclosed by bracket and push it back in the stack
- Note that here after each pop,if s1 pops before and s2 pops after we will apply the operator like s2 operator s1


Postfix -> Prefix:  A B C / - A K / L - * -> * - A / B C - / A K L 

- Postfix to any conversion traverse from first to last of the input string
- For Any operand (A,B,C etc) push in the stack
- Any operator, pop last two string from stack and apply the operator in first and push it back in the stack
- Note that here after each pop,if s1 pops before and s2 pops after we will apply the operator like s2 operator s1

--------------------------------------------------------------------------------------------------------------------------------

### 43. NGE / PGE/ NSE / PSE

Very important concept: Monotonic stack
Stack can be either in decreasing order or in increasing order
For NGE and PGE Stack will be in increasing order top down
For NSe and PSE stack will be in decreasing order top down

NGE 

- take a stack and traverse from right to left in the array
- For any element, keep popping from stack till the current element is bigger than stack.topp()
- the NGE for the curent element is stack.topp() is the stack is not empty, otherwise NGe of the current element is -1
- If we need to store the index of the NGE then if the stack is not empty then the nge of current element if the topIndex - 1 otherwise arr.length - 1
- Push the current element in the stack
- For NGE we go from `n-1 to 0` and we pop if `curr >= top` Remember 

```javascript
var nextGreaterElement = function(nums) {
    let nge = {};
    let myStack = new MyStack();
    for(var i = nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() && myStack.topp() <= nums[i]) {
            myStack.pop();
        }
        if(myStack.empty()) {
            nge[nums[i]] = -1;
        }
        else {
            nge[nums[i]] = myStack.topp();
        }
        myStack.push(nums[i])
    }   
};
var nextGreaterElementIndex = function(nums) {
    let nge = new Array(nums.length).fill(nums.length - 1)
    let myStack = new MyStack();
    for(var i = nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() &&  nums[i] >= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            nge[i] = myStack.topp() - 1;
        }
        myStack.push(i)
    } 
    return nge
};
```

PGE

- For Previous greater element/ index we need to traverse from `0 to n-1` 
- And still we need to pop if `curr >= top`

```javascript
var previousGreaterElementIndex = function(nums) {
    let pge = new Array(nums.length).fill(0)
    let myStack = new MyStack();
    for(var i = 0; i < nums.length ; i++) {
        while(!myStack.empty() &&  nums[i] >= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            pge[i] = myStack.topp() + 1;
        }
        myStack.push(i)
    } 
    return pge
};
```

NSE

- For next smaller element / index we need to traverse from `n-1 to 0`
- And we need to pop if `curr <= top`

```javascript
var nextSmallerElementIndex = function(nums) {
    let nse = new Array(nums.length).fill(nums.length - 1)
    let myStack = new MyStack();
    for(var i = nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() &&  nums[i] <= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            nse[i] = myStack.topp() - 1;
        }
        myStack.push(i)
    } 
    return nse
};
```

PSE

- For next smaller element / index we need to traverse from `0 to n-1`
- And we need to pop if `curr <= top`

```javascript
var previousSmallerElementIndex = function(nums) {
    let pse = new Array(nums.length).fill(0)
    let myStack = new MyStack();
    for(var i = 0; i < nums.length ; i++) {
        while(!myStack.empty() &&  nums[i] <= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            pse[i] = myStack.topp() + 1;
        }
        myStack.push(i)
    } 
    return pse
};
```

NGE etc for circular array

- We can consider the circular array a repetition of the same array 2n tims
- So we will run from `2n - 1` to 0 and instead of i we will check with `i% n` element
- we will only push nge till i < n

```javascript
var nextGreaterElement = function(nums) {
    let nge = {};
    let myStack = new MyStack();
    for(var i = 2 * nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() && myStack.topp() <= nums[i % nums.length]) {
            myStack.pop();
        }
        if(i < nums.length) {
            if(myStack.empty()) {
                nge[nums[i]] = -1;
            }
            else {
                nge[nums[i]] = myStack.topp();
            }
        }
        myStack.push(nums[i % nums.length])
    }   
};
```
similar pattern: https://www.interviewbit.com/problems/nearest-smaller-element/

--------------------------------------------------------------------------------------------------------------------------------

### 44. Trapping Rain water

Approach 1: Prefix and Suffix Max - TC - O(3N) Sc - O(2N)

- We know that we need to calculate the rain water trapped at each index
- To calculate the rain water that can be trapped at each index we need the maxLeft and maxRight block heights from the current index i
- Then the rain water trapped at index i will be `Min(maxLeft, maxRight) - height[i]` right?
- To find maxLeft and maxRight we can use prefix and suffix max arrays

```javascript

var trap = function(height) {
    let prefixMax = [], final = 0;
    prefixMax[0] = height[0];
    for(var i = 1; i < height.length; i++) {
        prefixMax[i] = Math.max(prefixMax[i-1], height[i]);
    }
    let suffixMax = [];
    suffixMax[height.length - 1] = height[height.length - 1];
    for(var i = height.length - 2; i >= 0; i--) {
        suffixMax[i] = Math.max(suffixMax[i+1], height[i]);
    }
    for(var i = 0; i< height.length; i++) {
        final += Math.min(prefixMax[i], suffixMax[i]) - height[i];
    }
    return final
};

trap([0,1,0,2,1,0,1,3,2,1,2,1]) // 6
```

Approach 2: Two pointer - TC - O(N) SC - O(1)

- We will initiate two pointers left and right at 0 and n-1 respectively
- We will initiate two variable maxLeft and maxRight (bth initialised at 0)
- If `height[left] <= height[right]` we have to check two things - 
    - If `height[left] >= maxLeft` we can not pour any water. So we update maxLeft - `maxLeft = height[left]`
    - Else we calculate water and pour -> `maxLeft - height[left]` unit of water can be added to final 
- If `height[left] > height[right]` do similar operation on right -
    - If `height[right] >= maxRight` we can not pour any water. so we update maxRight - `maxRight = height[right]`
    - Else we pour water -> `maxRight - height[right]`

```javascript
var trap = function(height) {
    let left = 0, right = height.length-1, leftMax = rightMax = 0;
    let final = 0;
    while(left <= right) {
        if(height[left] <= height[right]) {
            //check left
            if(height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                final += leftMax - height[left];
            }
            left++;
        }
        else {
            //check right
            if(height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                final += rightMax - height[right];
            }
            right--;
        }
    }
    console.log(final)
};
```
--------------------------------------------------------------------------------------------------------------------------------

### 45. Sum of subarray minimum

- We need to find the "being minimum" contribution of each member of the array.
- For that we need to find that being minimum how many total number of subarray combinations any element is making, both to its left and right
- For any pattern where we need to find leftMax or rightMax or leftMin or rightMin we use NGE, PGE, PSE, NSE pattern using monotonic stack 
- Here we need to deduce the NSE and PSE becuase we want the controbution of any elemtn being minimum
- After getting NSE and PSE, for any element, "the number of Subarrays it is contributing being minimum to the left" = `i - pse[i]`
- And "the number of subarrays it is contributing being minimum to the right" = `nse[i] - i`
- Then total number of subarray combinations where arr[i] is minimum is `i-pse[i] * nse[i] -i`
- Then total contribution of arr[i] being minimum is `arr[i] * i-pse[i] * nse[i] -i`
- Note that: here the array may contain duplicates, For `NSE do not check for equal, only check for less`
- For PSE check for equal and lesser both.

```javascript
var sumSubarrayMins = function(arr) {
    const pse = previousSmallerElementIndex(arr);
    const nse = nextSmallerElementIndex(arr);
    console.log(pse, nse)
    let final = 0;
    for(var i  = 0; i<arr.length; i++) {
        const leftSubarrayCountWhereArrIisMinimum = i - pse[i];
        const rightSubarrayCountWhereArrIisMinimum = nse[i] - i;
        const totalSubArrayCombinationsPossibleWhereArrIisMinimum = leftSubarrayCountWhereArrIisMinimum * rightSubarrayCountWhereArrIisMinimum;
        const totalContributionOfArrIWhileBeingMinimum = arr[i] * totalSubArrayCombinationsPossibleWhereArrIisMinimum;
        final +=totalContributionOfArrIWhileBeingMinimum
    }
    return final
};
```

https://leetcode.com/problems/sum-of-subarray-minimums/description/

Similar patterns:
https://leetcode.com/problems/largest-rectangle-in-histogram/submissions/1291127448/
https://leetcode.com/problems/sum-of-subarray-ranges/description/

--------------------------------------------------------------------------------------------------------------------------------

### 46. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

- We just to need to find out the histogram arrays upto each row
- We already know to find the maximum rectangle of a histogram using PSE and NSE pattern
- We can feed the histogram array to the same method to find maximum rectangle area

```javascript

var largestRectangleArea = function(heights) {
    const pse = previousSmallerElementIndex(heights);
    const nse = nextSmallerElementIndex(heights);
    let final = -Infinity
    for(var i  = 0; i <heights.length; i++) {
        const curr = heights[i];
        const leftWidthWhereImin = i - pse[i];
        const rightWidthWhereIMin = nse[i] - i;
        const totalWidthwhereImin = leftWidthWhereImin + rightWidthWhereIMin + 1;
        const totalAreaWhereIMin = totalWidthwhereImin * curr;
        final = Math.max(final, totalAreaWhereIMin);
    }
    return final;
};

var maximalRectangle = function(matrix) {
    const histo = new Array(matrix.length);
    histo[0] = matrix[0].map(n => Number(n));
    for(var i = 1; i < matrix.length; i++) {
        histo[i] = []
        for(var j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] == 1) {
                histo[i][j]= histo[i-1][j] + Number(matrix[i][j]);
            } else {
                histo[i][j]= 0
            }
        }
    }
    let final = -Infinity;
    for(var h = 0; h < histo.length; h++) {
        final = Math.max(final, largestRectangleArea(histo[h]))
    }
    return final;
};

```

--------------------------------------------------------------------------------------------------------------------------------

### 47. Silding Window maximum

To find the max of all the sliding windows of a given array
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

- Extreme brute force can be where we run a loop i 0 - n-k+1
- Run a inner loop 0 - k and find max and keep pushing in a final array. Total TC - O ( n * k )
- To optimise, we need to use a Monotonic DQueue (using Doubly LL) where the queue should be always sorted increasing order from rear to front
- Main idea is to push indices of the array in the Queue from back and looking from front to get the max because the Queue is always increasing order sorted from rear to back
- There are some steps to this :
    - Step1: `Pop from front any index which is out of bound i.e. < i - k + 1`
    - Step2: `Pop from back until arr[i] >= arr[rear]` to make sure from rear there is no element which is smaller than arr[i]
    - Step3: `Push the current index from back`
    - Step4: `Once i crosses the k mark i.e. i > k-1 start checking from front for max`

```javascript
var maxSlidingWindow = function(nums, k) {
    let final = [];
    const dq = new DQueue();
    for(var i =0; i<nums.length; i++) {
        // Step1: Always check if there is any element in the front of dq which is out of boundary
        while(dq.getFront() < i - k + 1) {
            dq.popFront();
        }
        // Step2: pop back till nums[i] >= rear value. We need to always maintain a increasing order from rear to front (Monotonic Queue)
        while(nums[i] >= nums[dq.getRear()] ) {
            dq.popBack();
        }
        // Step3: Push back current index to queue
        dq.pushBack(i);
        // Step4: Get Max when i (0 index) crosses k window
        if(i >= k - 1) {
            const currMax = dq.getFront();
            if(currMax) {
                final.push(nums[currMax])
            } 
        }
    }
    return final
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)) 
```
--------------------------------------------------------------------------------------------------------------------------------