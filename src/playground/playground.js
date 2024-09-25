var countSquares = function(matrix) {
    let n = matrix.length;
    let m = matrix[0].length
    let dp = Array.from({length: n}, ()=> Array.from({length: m}, () => 0))
    // first row and first column is the same
    dp[0] = matrix[0];
    for(let i = 0; i < n; i++) {
        dp[i][0] = matrix[i][0]
    }
    for(let i = 1; i < n; i++) {
        for(j = 1; j< m; j++) {
            if(matrix[i][j] == 1) {
                dp[i][j] = 1 + Math.min(dp[i-1][j] , dp[i-1][j-1] , dp[i][j-1])
            } else {
                dp[i][j] = 0
            }
        }
    }
    let sum = 0;
    for(let i = 0; i < n; i++) {
        for(j = 0; j< m; j++) {
            sum += dp[i][j]
        }
    }
    return sum
};

console.log(countSquares([
    [0,1,1,1],
    [1,1,1,1],
    [0,1,1,1]
  ]))