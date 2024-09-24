/**
 * @param {string} s
 * @return {number}
 */

// var minCut = function(s) {
//     const checkPali = (str) => {
//         return  str == str.split('').reverse().join('')
//      } 
//     let dp = Array.from({length: s.length}, () => Array.from({length: s.length}, () => undefined))
//     let mini = Infinity
//     const _calc = (index, len) =>{
//         if(index >= s.length) {
//             mini  = Math.min(mini, len -1);
//             return;
//         }
//         if(dp[index][len] != undefined)  return dp[index][len];
        
//         for(let i = index; i < s.length; i++) {
//             let leftSbstr = s.substring(index, i+1);
//             if(checkPali(leftSbstr)) {
//                 dp[index][len] = true;
//                 _calc(i + 1, len + 1);
//             }
//         }
//     }
//     _calc(0, 0);
//     return mini
// };

// var minCut = function(s) {
//     const checkPali = (str) => {
//        return  str == str.split('').reverse().join('')
//     } 
//     let n = s.length;
    

//     const _calc = (i, j) => {
//         if(i == j) return 0;
//         let t = s.substring(i,j+1);
//         if(checkPali(t)) return 0;
//         let dp = Array.from({length: n}, () => Array.from({length: n}, () => undefined))
//         let mini = Infinity
//         if(dp[i][j] != undefined) return dp[i][j]
//         for(let k = i; k <= j-1; k++) {
//             let curr = 1;
//             let leftMini = _calc(i, k);
//             let rightMini = _calc(k+1, j);
//             mini  = Math.min(mini, curr + leftMini + rightMini)
//         }
//         dp[i][j] = mini;
//         return mini
//     }
//     return _calc(0, n-1)
// };

var minCut = function (s) {
    let n = s.length;
    let palindromeDp = Array.from({length: n}, () => Array.from({length: n}, () => false))
    for(let i = n-1; i >=0; i--) {
        for(let j = 0; j < n; j++) {
            if(s[i] == s[j] && ((j - i) <= 2 || palindromeDp[i+1][j-1])) {
                palindromeDp[i][j] = true
            }
        }
    }
    let dp = Array.from({ length: n }, () => undefined)
    const _calc = (index) => {
        if (index == n) return 0
        
        let mini = Infinity
        if (dp[index] != undefined) return dp[index]
        for (let i = index; i <= n-1; i++) {
            if (palindromeDp[index][i]) {
                mini = Math.min(mini, 1 + _calc(i + 1))
            }
        }
        dp[index] = mini;
        return mini
    }
    return _calc(0) - 1
};


console.log(minCut('aab'))