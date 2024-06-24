var numberOfSubstrings = function(s) {
    const arr = s.split('')
    let ac = -1, bc = -1, cc = -1, r = 0, maxC = 0
    while(r < arr.length) {
        if(arr[r] == 'a') {
            ac = r;
        }
        else  if(arr[r] == 'b') {
            bc = r;
        }
        else if(arr[r] == 'c') {
            cc = r;
        }
        if(ac > -1 && bc > -1 && cc > -1) {
            maxC += Math.min(ac, Math.min(bc, cc)) + 1

        }
        r++;
    }
    return maxC
};

console.log(numberOfSubstrings("abcabc"))