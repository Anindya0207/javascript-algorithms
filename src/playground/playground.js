var minCost = function(n, cuts) {
    let c = cuts.length;
    cuts.unshift(0);
    cuts.push(n);
    cuts.sort((a,b) => a-b);
    let dp = Array.from({length: c+2}, () => Array.from({length: c+2} , ()=> undefined))
    const _calc = (i, j) => {
        if (j < i) return 0; // no more cuts possible
        let mini = Infinity;
        if(dp[i][j] != undefined) return dp[i][j]
        for (let k = i; k <= j; k++) {
            let currCost = cuts[j+1] - cuts[i-1]; // stick segment size
            let leftCost = _calc(i, k-1); // cost for the left part
            let rightCost = _calc(k+1, j); // cost for the right part
            let totalCost = currCost + leftCost + rightCost;
            mini = Math.min(mini, totalCost); // choose the minimum
        }
        dp[i][j] = mini
        return mini;
    };

    return _calc(1, c);
};

console.log(minCost(9, [5,6,1,4,2]))