
var isPalindrome = function(s) {
    let final = true;
    const _isPalindrome = (l, r) => {
        if(l >= r) return final;
        const lc = s.charCodeAt(l);
        const rc = s.charCodeAt(r);
        if(!(lc > 64 && lc < 91) && !(lc > 47 && lc < 58)) return _isPalindrome(l+1, r);
        if(!(rc > 64 && rc < 91) && !(rc > 47 && rc < 58)) return _isPalindrome(l, r-1);
        console.log(s.charAt(l), s.charAt(r))
        final = final && lc == rc && _isPalindrome(l+1, r-1)
        return final
    }
   s = s.toUpperCase();
   const len = s.length;
   console.log(_isPalindrome(0, len-1))
  };
  
  
  var fib = function(n) {
    const _fib = _n => {
         if(_n == 0 || _n == 1) return _n;
         return  _fib(_n-1) + _fib(_n-2)
    }
    console.log(_fib(3))
  };