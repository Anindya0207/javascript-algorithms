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

### 0/1 Knapsack problem: Coin Change

Problems like thief stealing stuff from houses with a knapsack of fixed weight can be solved with 0/1 Knapsack pattern. 
Unlike fractional knapsack (where we can break a particular element and consider only fraction of it) in 0/1 knapsack we either take it or not take it

- The approach is same as DP on subsequences where we have a pick and no pick condition
- But in DP of subsequence, our objective was to return whether a subset is possible (true/false) or number of subsets (count)
- That's why we were calling take and notake condition from top down and returning `take || notake` or `take + notake`
- Here we would be said to return maximum value of theft or minimum coins of denomination
- We can return `Math.min(take, notake)` or `Math.max(take, notake)`
- Hence `its important to return Infinity or -Infinity for invalid options. `
- It is also important that we add the current value for take scenario before calling the recursion with reduced value.

#### Recursion

- Base condition for recursion is like when we are at index = 0, if the denomination at 0th index is a divisor of the remaining amt, we can add that many coins to fulfil that amount right?
- Otherwise we return Infinity becuase it was not possible to fulfil the lat remaining amt

```javascript
var coinChange = function (coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n }, () => Array.from({ length: amount + 1 }, () => undefined))
    if (amount == 0) return 0
    const _calc = (index, _amt) => {
        if (index == 0) {
            if (_amt % coins[index] == 0) {
                dp[index][_amt] =  _amt / coins[index];
                return _amt / coins[index];
            }
            return Infinity
        }
        if (dp[index][_amt] != undefined) return dp[index][_amt]
        let notake = _calc(index - 1, _amt);
        // initially setting as Infinity. as It will be esay to compute Math.min between take and notake.
        let take = Infinity
        if (coins[index] <= _amt) {
            // adding a coin for the curent denomination and calling the recursion again 
            take = 1 + _calc(index, _amt - coins[index]);
        }
        dp[index][_amt] = Math.min(take, notake)
        return dp[index][_amt]
    }

    let ans = _calc(n - 1, amount)
    return ans == Infinity ? -1 : ans
};
```

#### Tabulation

- Base condition for tabulation is also same. We said that for any amount which is divisible by the 0-th denomination we can add that many coins. for the other amount where its not possible, it would be Inifinity.
- Similarly, an amount of 0 can be made at any index without taking that denomination hence `for index 0---n dp[index][0] = 0`

```javascript
var coinChange = function (coins, amount) {
    let n = coins.length;
    let dp = Array.from({ length: n }, () => Array.from({ length: amount + 1 }, () => Infinity))
    if (amount == 0) return 0
    for (let _amt = 0; _amt <= amount; _amt++) {
        if (_amt % coins[0] == 0) {
            dp[0][_amt] = _amt / coins[0];
        }
    }
    for (let i = 0; i < n; i++) {
        dp[i][0] = 0
    }
    for (let index = 1; index < n; index++) {
        for (let _amt = 1; _amt <= amount; _amt++) {
            let notake = dp[index - 1][_amt];
            let take = Infinity
            if (coins[index] <= _amt) {
                take = 1 + dp[index][_amt - coins[index]]
            }
            dp[index][_amt] = Math.min(take, notake)
        }
    }
    return dp[n - 1][amount] == Infinity ? -1 : dp[n - 1][amount];
};
```

```
Space optimisation #1

We can optimise the space by taking only a prev and a curr array which will have dp[index-1] and dp[index] rows. We dont need to store the entire 2D dp right?

Space optimisation #2

Now do we really need the prev and curr array also? Notice that we are only accessing the previous values of the prev rows `prev[_amt - coins[index]]` So if we iterate the amount from Right to left ie. `let _amt = amount; _amt >= amount; _amt--` then we can simply do 
`prev[_amt] = 1 + prev[_amt - coins[index]]` becuase for the current index, we are only accessing the amount which is lesser than _amt and since we are traversing from right to left it will not disturb the values to the right.. 

```

Similar problems: 
https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=knapsack-with-duplicate-items
https://leetcode.com/problems/coin-change/
https://leetcode.com/problems/coin-change-ii/description/
https://www.geeksforgeeks.org/problems/rod-cutting0840/1

--------------------------------------------------------------------------------------------------------------------------------

### DP on Strings

- In DP of string problems we generally have to find longest common subsequence etc..
- Try to express it in indexes, so we will take two indexes for two strings. 
- At each index we will have match / no match pattern
- If at index1 and index2 the characters of both strings match, then we can say that at least the common subseq length will be 1 + longest common subseq at index1 - 1 and index2 - 1 ie-`1+ _calc(index1 - 1, index2- 1)`
- If they dont match we will check wither by reducing index1 or index2 and take the maximum of them as we need to find maximum common subseq

#### Recursion

```javascript
 var longestCommonSubsequence = function(text1, text2) {
     let n = text1.length; 
     let m = text2.length;
     let dp = Array.from({length: n +1}, () => Array.from({length: m+1}, () => -1))

     const _calc = (index1, index2) => {
         if(index1 == 0 || index2 == 0) return 0; 
         if(dp[index1][index2] != -1) return dp[index1][index2]
         if(text1.charAt(index1 - 1) == text2.charAt(index2 - 1)) {
             dp[index1][index2] = 1 + _calc(index1 -1, index2 -1)
             return dp[index1][index2]
         }
         dp[index1][index2]= Math.max(_calc(index1 - 1, index2) , _calc(index1, index2 - 1))
         return dp[index1][index2]
      }
     return _calc(n, m)
 };

```

#### Tabulation

- If we see the base case for recursion, for  index1 == 0, at all index2 we are returing 0 and vice versa.

```javascript
var longestCommonSubsequence = function (text1, text2) {
    let n = text1.length;
    let m = text2.length;
    let dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0))
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0
    }
    for (let i = 0; i <= m; i++) {
        dp[0][i] = 0
    }
    for (let index1 = 1; index1 <= n; index1++) {
        for (let index2 = 1; index2 <= m; index2++) {
            if (text1.charAt(index1 - 1) == text2.charAt(index2 - 1)) {
                dp[index1][index2] = 1 + dp[index1 - 1][index2 - 1]
            } else {
                dp[index1][index2] = Math.max(dp[index1 - 1][index2], dp[index1][index2 - 1])
            }
        }
    }
    return dp[n][m]
}
```
--------------------------------------------------------------------------------------------------------------------------------

### DP on Stocks

In DP on stocks we generally have to find max profit by buying and selling stocks. 

- We just need to memoise the till-now-minimum. thats it
- at any index, if we have tillnow minimum, then we can calculate the profit at that index by doing `prices[index] - tillNowMin`
- then the maxProfit can be easily calc by `maxProfit = Math.max(maxProfit, profit)`

```javascript
var maxProfit = function (prices) {
    // let's assume the first index is the min
    let minimum = prices[0];
    let maxProfit = 0;
    for(let i = 1; i < prices.length; i++) {
        // calc the profit and maxProfit
        let profit = prices[i] - minimum;
        maxProfit = Math.max(maxProfit, profit);
        // memoise the till now minimum
        minimum = Math.min(minimum, prices[i]);
    }
    return maxProfit
}
```

- Now this was when we can do only one transaction
- if we can do unlimited transaction then we one way can be to carry the till now minimum and till now max
- But we will do it in recursion as it will extend to future problems
- In recursion, we will define the recurrence as on the current day whether we can `buy/sell`
- if we can buy, there can be two cases, `we buy or we don't buy`
- if we can't buy (bcz we already holding stock bought earlier), then also there can be two cases `we sell/ we don't sell`
- If we can buy, and we buy we lose money as `-prices[index]` but we are eligible to sell in the next index so we call recursion with `_calc(index+1, 0)`
- If we can buy but we don't then we dont lose any money, but we still call the recursion with `_calc(index+1, 1)` because we havent bought, we can still buy in next day
- Similar for sell as well

```javascript
var maxProfit = function (prices) {
    let dp = Array.from({length: prices.length}, () => Array.from({length: 2}, () => undefined))
    const _calc = (index, buy) => {
        if(index == prices.length) return 0;
        if(dp[index][buy] != undefined) return dp[index][buy];
        if(buy) {
            dp[index][buy]= Math.max(
                -prices[index] + _calc(index + 1, 0),
                0 + _calc(index +1, 1)
            )
        } else {
            dp[index][buy]= Math.max(
                prices[index] + _calc(index + 1, 1),
                0 + _calc(index +1, 0)
            )
        }
        return dp[index][buy]
    }
    return _calc(0, 1);
}
```
- In tabulation we need to take 1 based indexing as in base condition we are havivn to check for `index == n`

--------------------------------------------------------------------------------------------------------------------------------

### DP on LIS (Longest increasing subsequence)

Longest increasing subsequence demands to find the longest length or the print the LIS in an array where the subsequence is striclty increasing order

- So we need to follow the same pick/no pick technique which we followed in subsequenece problems
- Only caveat here is we need to carry the previousluy taken guy, and see if the current guy is more than the prev guy, then only we will take the current guy in the subsequence

```javascript
var lengthOfLIS = function(nums) {
     let dp = Array.from({length: nums.length}, () => Array.from({length: nums.length + 1}, () => undefined))
     const _calc = (index, prevIndex) => {
        if(index == nums.length) return 0;
        if(dp[index][prevIndex + 1] != undefined) return dp[index][prevIndex + 1];
        let notake = 0 + _calc(index + 1, prevIndex);
        let take = -Infinity;
        if(prevIndex == -1 || nums[index] > nums[prevIndex]) {
            take = 1 + _calc(index + 1, index);
        } 
        dp[index][prevIndex + 1] = Math.max(take, notake);
        return dp[index][prevIndex + 1];
    }
    return _calc(0, -1);
};
```

- If we want to do in tabulation, just notice one thing, that we are running till prevIndex = -1, but dp[something][-1] will not be there
- So do offset
- while writing the inner loop IMP to notice that `the prevIndex can atmost start from index -1 right? it cant be from n-1 bcz it's previous index`
- now in the currence statements wherever we are accessing something from the dp, IMP to notice that the second param is always `+1` ie offseted

```javascript
var lengthOfLIST = function(nums) {
    let n = nums.length;
    // index is goign till n, hence take sizeof n+1
    let dp = Array.from({length: n+ 1}, () => Array.from({length: n + 1}, () => 0))
    // base case not required as everything is already init as 0
    for(let index = n-1; index >= 0; index--) {
        // now the prevIndex can atmost start from index -1 right? it cant be from n-1 bcz it's previous index
        for(let prevIndex = index -1; prevIndex >= -1; prevIndex --) {
            let notake = 0 + dp[index + 1][prevIndex +1]
            let take = -Infinity;
            if(prevIndex == -1 || nums[index] > nums[prevIndex]) {
                take = 1 + dp[index + 1][index+1];
            } 
            dp[index][prevIndex + 1] = Math.max(take, notake);
        }
    }
    return dp[0][-1+1]
}
```

Now can we optimise this further? Yes, we can do in 1D DP O(N)

- `We need to define dp[i] as the length of the LIS till index i`
- So we iterate index from 1 to n and prevIndex from 0 to index -1
- Now for any prev, if we find that` arr[index] > arr[prev]` ei the current guy is actually more than that prev guy, we can add that guy in the subsequence right?
- Hence whatever the max length that prev guy had, the current guy can have 1 + that, right?
- We will maximise this over all prev guys which are before index

```javascript
var lengthOfLIST = function(nums) {
    let n = nums.length
    // all the indexes will have at least a subsequence with length 1 (the element itself, right?)
    let dp = Array.from({length: n}, () => 1);
    for(let index = 1; index < n; index++) {
        for(let prevIndex = 0; prevIndex < index; prevIndex++) {
            if(nums[index] > nums[prevIndex]) {
                dp[index] = Math.max(dp[index], 1 + dp[prevIndex]);
            }
        }
    }
    return Math.max(...dp)
}
```

--------------------------------------------------------------------------------------------------------------------------------