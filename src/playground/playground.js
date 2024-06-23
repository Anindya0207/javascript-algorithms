var characterReplacement = function(s, k) {
    let l = 0, r = 0, maxD = -Infinity, maxFreq = -Infinity, freqArr = new Array(26);
    while(r < s.length) {
        // let's first check the index in which I need to update the current character ka frequency in the freq arr
        const curr = s.charCodeAt(r) - 65;
        // update it
        freqArr[curr] = (freqArr[curr] || 0)+1;
        // check max Freq so far
        maxFreq = Math.max(maxFreq, freqArr[curr]);
        // can we say that the rest of the characters in the window apart from the maxFreq need to be converted?
        // if conversionNeededUntilNow exceeds k we need to shrink the window by shifting l
        while((r - l + 1) - maxFreq > k) {
            //shift l and reduce the frequency of the l character 
            const currL = s.charCodeAt(l) - 65;
            freqArr[currL]--;
            l++
        }
        if((r - l + 1) - maxFreq <= k) {
            maxD = Math.max(maxD, r - l +1);
        }
        r++;
    }
    return maxD
};

console.log(characterReplacement('AABABBA' , 1))