const findPlatform = (arr, dep, n) => {
    arr.sort((a, b) => a-b);
    dep.sort((a, b) => a-b);
    let i = 0, j = 0, count = 0, maxC = -Infinity;
    while(i < arr.length) {
        if(arr[i] < dep[j]) {
            count++;
            i++;
        } else {
            count--;
            j++;
        }
        maxC = Math.max(maxC, count);
    }
    return maxC;
}

console.log(findPlatform([0900, 0940, 0950, 1100, 1500, 1800], [0910, 1200, 1120, 1130, 1900, 2000]))