var shortestPalindrome = function (s) {
    let revs = s.split('').reverse().join('');
    let n = s.length;
    let maxLen = -Infinity;
    let final = '';
    const _calc = (index1, index2, str) => {
       if(index1 == 0 || index2 == 0) {
            if(str.length > maxLen) {
                maxLen = str.length;
                final = str
            }
            return;
       }
       if(s.charAt(index1 - 1) == revs.charAt(index2 - 1)) {
            _calc(index1 - 1, index2 - 1, `${s.charAt(index1 - 1)}${str}`)
       } else {
            _calc(index1 - 1, index2, str);
            _calc(index1, index2 - 1, str);
       }
    }
    _calc(n, n, '');
    let i = 0, j = 0, revStr = ''
    while(i < n) {
        if(s.charAt(i) == final.charAt(j)) {
            i++;
            j++;
        } else {
            break;
        }
    }
    if(i == 0) {
        return `${final}${s}`
    }
    while(i < n) {
      revStr = `${s.charAt(i)}${revStr}`
      i++
    }
    return `${revStr}${s}`
};

console.log(shortestPalindrome("aabba"))