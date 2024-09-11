var shortestCommonSupersequence = function(word1, word2) {
    let n = word1.length;
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
    const _traverse = (row, col, str) => {
        if(row == 0 || col == 0) {
            return str
        }
        if(word1.charAt(row -1) == word2.charAt(col-1)) {
            return  _traverse(row - 1, col-1, `${word1.charAt(row -1)}${str}`);
        }
        if(dp[row-1][col] > dp[row][col-1]) {
            return _traverse(row-1, col, str);
        }
        return _traverse(row, col - 1, str);
    }
    const longedStr = _traverse(n, m, '');
    let i = 0, j = 0, k = 0, final = ''
    while(i < word1.length && j < word2.length) {
        if(word1.charAt(i) == longedStr.charAt(k) && word2.charAt(j) == longedStr.charAt(k)) {
            final = final + longedStr.charAt(k);
            i++; j++; k++
        } 
        else if(word1.charAt(i) != longedStr.charAt(k) && word2.charAt(j) == longedStr.charAt(k)) {
            final = final + word1.charAt(i)
            i++
        }
        else if(word1.charAt(i) == longedStr.charAt(k) && word2.charAt(j) != longedStr.charAt(k)) {
            final = final +  word2.charAt(j)
            j++;
        }
        else if(word1.charAt(i) != longedStr.charAt(k) && word2.charAt(j) != longedStr.charAt(k)) {
            final = final + word1.charAt(i) + word2.charAt(j)
            i++; j++
        }
    }
    while(i < word1.length) {
        final = final + word1.charAt(i)
        i++
    }
    while(j < word2.length) {
        final = final +  word2.charAt(j)
            j++;
    }
    return final
};

console.log(shortestCommonSupersequence('abac', 'cab'))