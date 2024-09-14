var maxProfit = function (prices) {
    let n = prices.length;
    let dp = Array.from({ length: n + 1 }, () => Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => 0)))
    dp[n][0][2] = 0
    dp[n][1][2] = 0
    for (let index = n - 1; index >= 0; index--) {
        for (let buy = 1; buy >= 0; buy--) {
            for (let transactionCount = 1; transactionCount >= 0; transactionCount--) {
                if (buy) {
                    dp[index][buy][transactionCount] = Math.max(
                        -prices[index] + dp[index + 1][0][transactionCount],
                        0 + dp[index + 1][1][transactionCount],
                    )
                } else {
                    dp[index][buy][transactionCount] = Math.max(
                        prices[index] + dp[index + 1][1][transactionCount + 1],
                        0 + dp[index + 1][0][transactionCount],
                    )
                }
            }
        }
    }
    return dp[0][1][0]
}


console.log(maxProfit([3,3,5,0,0,3,1,4]))