var maxScore = function(cardPoints, k) {
    let total = cardPoints.reduce((acc, curr) => acc+ curr, 0);
    if(k == cardPoints.length) return total;
    let max = -Infinity;
    let prefixSum = new Array(cardPoints.length + 1);
    prefixSum[0] = 0;
    for(var i = 1; i<= cardPoints.length; i++) {
        prefixSum[i] = prefixSum[i-1] + cardPoints[i-1];
    }
    const subArrayLengthToRmove = cardPoints.length - k;
    let l = 0, r = l + subArrayLengthToRmove -1;
    while(l <= k) {
        r = l + subArrayLengthToRmove - 1;
        const sum = prefixSum[r + 1] - prefixSum[l];
        const diff = total - sum;
        max = Math.max(max, diff);
        l++;
    }
    return max
};
console.log(maxScore( [1,79,80,1,1,1,200,1], 3));