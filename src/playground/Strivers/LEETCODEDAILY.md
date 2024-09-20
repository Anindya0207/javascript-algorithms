# 1, Different ways of adding parenthesis

- We need to find multiple answer by putting parenthesis in an expression like `2*3-4*5`
- Was trying it earlier with `2* f()` and `2*3-f()` 
- But problem in that is return. We need to return multiple answers not a single. So we need to think of some way where we can return an array of options always.
- If we stand at any index where there is an operator, we can say that we will have a series of options by computing the left expression and the right expression right? There we go, there is our overlappingsub problem
- We will stand at an index where there is an operator, we will call the recursion with the left substring and right substring
- And from left we will get a series of options and from right we will get a series of options
- Now we need to cacluate the different answers we might get by applying `the operator at index where we are standing ` between `all the left and right options`
- so `for all left options` apply `oerator[index]` to `all right options`

```javascript
var diffWaysToCompute = function (expression) {
    const n = expression.length;
    let dp = Array.from({ length: n * n }, () => undefined)
    const _calc = (str) => {
        if (!str.includes('+') && !str.includes('-') && !str.includes('*')) {
            return [Number(str)]
        }
        let res = [];
        if (dp[str] != undefined) return dp[str]
        for (let i = 0; i < str.length; i++) {
            if (['+', '-', '*'].includes(str.charAt(i))) {
                let left = _calc(str.substring(0, i));
                let right = _calc(str.substring(i + 1));

                for (let l = 0; l < left.length; l++) {
                    for (let r = 0; r < right.length; r++) {
                        if (str.charAt(i) == '+') {
                            res.push(left[l] + right[r])
                        }
                        if (str.charAt(i) == '-') {
                            res.push(left[l] - right[r])
                        }
                        if (str.charAt(i) == '*') {
                            res.push(left[l] * right[r])
                        }
                    }
                }
            }
        }
        dp[str] = res;
        return res
    }
    return _calc(expression)
};
```

--------------------------------------------------------------------------------------------------------------------------------