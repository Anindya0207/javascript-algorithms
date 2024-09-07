### DP: Intro

- DP works on `overlapping sub pronblems` where we memoise / pre compute a sub problem for future and return that result if that occurs in future
- DP Can be done in `recursion (memoization) (top down)` or `Tabulation (bottom up)` approach

Phibonacci series: Recursion approach- TC: O(N) SC:O(2N)

- In this approach we try to delcare a dp array (1d or 2d based on our space requirements)
- we memoise the result in each recursion call
- But before performing further recursion we check if the result was already pre computed for the current element, if it's then we simply return that
- SC is O(2N). N for the dp array and N for recursion call stack

```javascript
 memoisationDp(n) {
    let dp = new Array(n + 1).fill(-1);
    const _traverse = (_n) => {
        if(_n <= 1) {
            dp[_n] = _n;
            return _n;
        }
        if(dp[_n] != -1) return dp[_n] 
        dp[_n] = (_traverse(_n-1) + _traverse(_n-2) ) % max
        return dp[_n] 
    }
    _traverse(n);
    return dp[n]
}
```

Phibonacci series: Tabulation approch: TC: O(N) SC: O(N)

- In this approach, we are incrementally computing the next value basis our previously computed value
- No recursion call stack required. hence SC is only O(N)

```javascript
tabulationDp(n) {
    let dp = new Array(n + 1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[i];
}
```
- If we do not need the entire array, we can just do it with two variable which is called space optimisation SC: O(1)

```javascript
bottomUp(n) {
    let prev2= 0, prev = 1;
    for (let i = 2; i<= n; i++) {
        let curr= (prev + prev2)  % max
        prev2= prev;
        prev= curr;
    }
    return prev;
}
```
--------------------------------------------------------------------------------------------------------------------------------

### Tricks to solve DP problems

- Step1: See what is asked in the problem.  it can be finding min or max or count. Whatever is asked for dp[i] should hold exactly that. 
ie. for example we want to find the minimum cost to reaach n then dp[i] = mimn cost to reach i
- Step2: figure out the recurring statement, most of the time it will be like ith step can be accessed from i-1 or i-2 or i-k. So from i-k to i whatever constraint it's given plus dp[i-k] will give us dp[i]
- Step3: Set the initial values like dp[0] and dp[1] 

e.g: You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

- It's said to return the max profit, so we will keep dp[i] = max robbed profit till ith index. 
- Now, we couldn't have robbed i-1 when we are robbing i, right? So we might have got some profit at i-1 which is dp[i-1] but we can't add the ith profit with that. But we can add the ith profit with i-2th profit, right? why? because I can rob houses which are not adjacent.
- So can i say? dp[i] is maximum of 
    - whatever max profit I got till i-1 and
    - whatever max profit I got till i-2 + profit at ith house
- Hence `dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);`
- Now for initialisation what profit I will get at 0th house? it's nums[0], right?
- And whats the max profit at 1st house? it's either 0th house ka profit or 1st house ka. we can;t add them up as they are adjacent. So dp[1] = Math,max(nums[0], nums[1]);

```javascript
 var rob = function(nums) {
    let dp = Array.from({length: nums.length}, () => -1);
    dp[0]= nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    for(let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    return dp[nums.length -1];
};
```

- For DP on Subsequences always try to do the recursiom starting from n-1 instead of 0. That way we will get the base case to be index ==0
- The same base case can then be aplied in the tabulation approach and solve the probelm easily

For e.g: we can solve  a subset sum problem typically like this - like we have seen in recursion series

```javascript
 isSubsetSum(arr,n,sum){
    let dp = Array.from({length: arr.length}, () => Array.from({length: sum}, () => undefined))
    const _calc = (index, _sum) => {
        if(_sum == sum) return true;
        if(index == n-1) {
            return _sum == sum - arr[n-1]
        }
        if(dp[index][_sum] != undefined) return dp[index][_sum]
        let notakeRes = _calc(index+1, _sum);
        let takeRes = false;
        if( arr[index] + _sum <= sum )
        takeRes = _calc(index+1, _sum + arr[index]);
        dp[index][_sum] = notakeRes || takeRes;
        return dp[index][_sum];
    }
    return _calc(0, 0);
}
```

But instead we will solve it like this - where we will keep decrementing arr[index] from the actual sum given and see if _sum == 0 

```javascript
isSubsetSum(arr,n,sum){
    let dp = Array.from({length: arr.length}, () => Array.from({length: sum}, () => undefined))
    const _calc = (index, _sum) => {
        if(_sum == 0) return true;
        if(index == 0) {
            return _sum == arr[0]
        }
        if(dp[index][_sum] != undefined) return dp[index][_sum]
        let notakeRes = _calc(index-1, _sum);
        let takeRes = false;
        if( arr[index] <= _sum )
        takeRes = _calc(index-1, _sum - arr[index]);
        dp[index][_sum] = notakeRes || takeRes;
        return dp[index][_sum];
    }
    return _calc(n-1, sum);
}
```

Now the base case can be easily applied in tabulation - 
- Always think of the base condition as in the first row and first column of the tabulation
- Think ,` for any index can I make a sum of 0? yes we can, we wont take the element, it will be sum  = 0 hence dp[i][0] = true`
- Think again, `At 0th index, what sum can I make? I can make 0 and I can make a sum of arr[0] right? dp[0][0] = true already by prev step. We will mark dp[0][arr[0]] = true`
- We will always run two loops in tabulation for two variables (index and _sum)
- now, the main logic is just a copy paste of the recursiomn logic. Just replace the recursion calls with dp

```javascript
isSubsetSum(arr,n,sum){
    let dp = Array.from({length: arr.length}, () => Array.from({length: sum+1}, () => false))
    for(let i = 0 ;i <n;i++) {
        dp[i][0] = true;
    }
    dp[0][arr[0]] = true;
    for(let index = 1;index<n; index++) {
        for(let _sum = 1; _sum <= sum; _sum++) {
            let notakeRes = dp[index-1][_sum];
            let takeRes = false;
            if( arr[index] <= _sum )
            takeRes = dp[index-1][_sum - arr[index]];
            dp[index][_sum] = notakeRes || takeRes;
        }
    }
    return dp[n-1][sum]
}
```
--------------------------------------------------------------------------------------------------------------------------------  

### DP On subsequence : Subset sum problems

- We might be given problems like subset sum = K / Target is possible or not. or number of subsets with Sum = K/Target etc.
- VVIMP: This kind of problem depends on contraint. The base case will change if the array elemtns contain 0 or -ve numbers

If arr[i] can not have 0 or -ve numbers:

Recursive / Memoisation way

- We will start the recursion call with n-1 and the target because it's a top down approach.
- Base case is if we encounter `_sum == 0 we return true or 1` based on if we need to find out possibility or number of subsets. always remember that at any index we can always make a sum of 0 by simply not taking that element. hence we can blindly return 1. 
- Now `at index == 0 we can always make a sum of arr[0] if arr[0] is less than or equal to target`
- Apart from these, we will consider the notake and take scenario by either considering the arr[i] or not. So typically the code might be like -

```javascript
var subSetSumExists = (arr, target) => {
    let n = arr.length;
    let dp = Array.from({length: n}, () => Array.from({length: target + }, () => undefined))
    const _calc = (index, _sum) => {
        if(_sum == 0) return true; // we can return  1 if we need to count number of subsets
        if(index == 0) return arr[0] == _sum;
        if ( dp[index][_sum] != undefined) return  dp[index][_sum]
        let notake = _calc(index -1, _sum);
        let take = false;
         if(_sum >= arr[index]) {
            take = _calc(index -1, _sum - arr[index]);
        }
        dp[index][_sum] = take || notake; // We can return take + notake if we need to find count of subsets
        return  dp[index][_sum]
    }
    return _calc(n-1, target);
}
```

Tabulation way

- Intuition is the same of tabulation also. But it's a bottoms up approach so we will initialise the dp array with base values to start with.

```javascript
var subSetSumExists = (arr, target) => {
    let n = arr.length;
    let dp = Array.from({length: n}, () => Array.from({length: target + }, () => false))
    for(let i  = 0 ;i < n; i++) {
        dp[i][0] = true; // we can set as 1 if we need to count number of subsets. 
    }
    if(arr[0] <= target) {
        dp[0][arr[0]] = true;
    }
    for(let index = 1; index <n ; indes ++) {
        for(let _sum = 1; _sum <= target ; _sum++) {
            let notake = dp[index-1][_sum];
            let take = false;
            if(arr[index] <= _sum) {
                take = dp[index-1][_sum - arr[index]];
            }
            dp[index][_sum] = take || notake; // We can return take + notake if we need to find count of subsets
        }
    }
    return dp[n-1][target];
}
```

- Now let's say there is 0 in the array.
- We can't blindly return 1 from any index if _sum == 0 because arr[index] might be 0
- We know one thing for sure, that at index == 0, `if we encounter arr[index] = 0, then there can be two subsets to make a sum 0. [] and [0] which adds up to 0`
- But keep in mind that `we can not say this for any index > 0 for which arr[index] = 0`
- at `index = 0 if arr[index] != 0 then we can definitely make a sum of arr[index]` like we were doing.
- We can also say that `if index = 0 and arr[index] != 0 we can make a sum 0 by not taking it`

```javascript
var subSetSumExists = (arr, target) => {
    let n = arr.length;
    let dp = Array.from({length: n}, () => Array.from({length: target + 1}, () => -1))
    const _calc = (index, _sum) => {
        if(index == 0) {
            if(_sum == 0 && (arr[index] == 0)) return 2;
            if(_sum == 0) return 1;
            if(arr[index] == _sum) return 1;
            return 0;
        }
        if ( dp[index][_sum] != -1) return  dp[index][_sum]
        let notake = _calc(index -1, _sum);
        let take = 0;
        if(_sum >= arr[index]) {
            take = _calc(index -1, _sum - arr[index]);
        }
        dp[index][_sum] =( take + notake) % (Math.pow(10, 9) + 7)
        return  dp[index][_sum]
    }
    return _calc(n-1, target);
}
```

Tabulation
- Intuition is same. `We can only make dp[0][0] as 2 if arr[0] is 0.`
- Else We can make only one sum of 0 at index 0 dp[0][0] = 1
- And ofcourse `we can make a sum of arr[0] if arr[0] <= target`

```javascript
var subSetSumExists = (arr, target) => {
   let n = arr.length;
    let dp = Array.from({length: n}, () => Array.from({length: target + 1}, () => 0))
        if(arr[0] == 0) {
            dp[0][0] = 2
        } else {
            dp[0][0] = 1;
            if(arr[0] <= target) {
                dp[0][arr[0]] = 1
            }
        }
        for(let index = 1; index < n; index++){
            for(let _sum = 0; _sum <= target; _sum++) {
                let notake = dp[index-1][_sum];
                let take = 0;
                if(_sum >= arr[index]) {
                    take = dp[index -1][_sum - arr[index]];
                }
                dp[index][_sum] = (take + notake) % (Math.pow(10, 9) + 7)
            }
        }
        return dp[n-1][target];
}
```

--------------------------------------------------------------------------------------------------------------------------------