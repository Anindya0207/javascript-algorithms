var isMatch = function(s, p) {
    if(p == '*') return true;
    let n = s.length;
    let m = p.length;
    const _calc = (index1, index2) => {
        if(index2 < 0) return index1 < 0
        if(index1 < 0) return index2 < 0 || p.charAt(index2) == '*'
        if(p.charAt(index2) == '*') {
            if(p.charAt(index2 - 1) != s.charAt(index1)) {
                if(index1 == 0) return false
                return true && _calc(index1 - 1, index2 );
            } else {
                return true && _calc(index1, index2 - 1 );
            }
        }
        if(s.charAt(index1) == p.charAt(index2) || p.charAt(index2) == '?') {
            return true && _calc(index1 - 1, index2 - 1);
        } else {
            return false;
        }
    }

    return _calc(n - 1, m - 1);
};

console.log(isMatch('aab', 'c*a*b'))