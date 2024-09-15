const longestSubsequence = (n, a) => {
    const _bSearch = (subarr ,element) => {
        let start = 0, end = subarr.length - 1, ans = -1
        while(start <= end) {
            let mid = Math.floor((start + end)/2)
            if(subarr[mid] == element) {
                return mid
            }
            if(subarr[mid] > element) {
                end = mid-1
            } else {
                start = mid + 1
            }
        }
        return start;
    }
    let arr = [a[0]];
    for(let i = 1; i < n; i++) {
        let curr = a[i];
        let subarr =arr;
        let correctIndex = _bSearch(subarr, curr);
        if(correctIndex < arr.length) {
            arr[correctIndex] = curr;
        }
        else {
            arr.push(curr)
        }
    }
    return arr.length
}
console.log(longestSubsequence(8, [1,7,8,4,5,6,-1,9]))