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