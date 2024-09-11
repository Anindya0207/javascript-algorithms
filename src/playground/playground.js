var minDistance = function(word1, word2) {
    let n = word2.length;
   let m = word2.length;
   let dp = Array.from({ length: n + 1 }, () => Array.from({ length: m + 1 }, () => 0))
   for (let i = 0; i <= n; i++) {
       dp[i][0] = 0
   }
   for (let i = 0; i <= m; i++) {
       dp[0][i] = 0
   }
   
   for (let index1 = 1; index1 <= n; index1++) {
       for (let index2 = 1; index2 <= m; index2++) {
           if (word1.charAt(index1 - 1) == word2.charAt(index2 - 1)) {
               dp[index1][index2] = 1 + dp[index1 - 1][index2 - 1];
           } else {
               dp[index1][index2] = Math.max(dp[index1 - 1][index2], dp[index1][index2 - 1]);
           }
       }
   }
   return n - dp[n][m] + m - dp[n][m] 
};

console.log(minDistance('a', 'ab'))