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

--------------------------------------------------------------------------------------------------------------------------------  