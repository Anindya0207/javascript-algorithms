var t = parseInt(readline());

// [10, 11, 12, 13, 15, 22]
for (var i = 0; i< t; i++) {
    var pp = readline().split(' ').map(x => parseInt(x));
    var k = pp[1];
    var array = readline().split(' ').map(x => parseInt(x));
    array.sort((a, b) => a - b);
    var prefix = array.reduce((acc, curr, index) => {
        return [...acc, acc[index] + curr]
    }, [0]);
    //  [0, 10, 21, 33, 46, 61, 83]
    var ans = 0;
    // there are k+1 choices
    for(var ch = 0; ch <= k; ch++) {
        /**
         * Min can be deleted 2*ch units
         * Max can be deleted arr.length -1 -k + ch unit
         * since our prefix is 1 indexed. we take prefix[arr.legth - 1 - k + ch + 1] and prefix [2*ch+1]
         * now to find sum from start and end in array we know the formula is prefix[end] - prefix[start-1]
         * so our sum in each iteration is prefix[arr.legth - 1 - k + ch + 1] - prefix[2*ch + 1 -1] => prefix[arr.length - k + ch] - prefix[2*ch]
         */
        ans = Math.max(ans, prefix[array.length - k + ch] - prefix[2*ch]);
    }
    print(ans);
}