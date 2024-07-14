var eraseOverlapIntervals = function(final) {
    final.sort((a, b) => a[1] - b[1]);
    let count = 1;
    let j = 1,
        k = j - 1;
    while (j < final.length) {
        if (final[j] && final[j][0] >= final[k][1]) {
            count++;
            k = j;
        }
        j++
    }
    return final.length - count;
};

console.log(eraseOverlapIntervals([[-52,31],[-73,-26],[82,97],[-65,-11],[-62,-49],[95,99],[58,95],[-31,49],[66,98],[-63,2],[30,47],[-40,-26]]))
