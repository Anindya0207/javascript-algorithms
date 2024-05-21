const median = (matrix, R, C) => {
    let min = Infinity, max = -Infinity, midCount = Math.floor((R * C) / 2)
    for(var row =0; row< R; row++) {
        if(matrix[row][0] < min) {
            min = matrix[row][0];
        }
        if(matrix[row][C-1] > max) {
            max = matrix[row][C-1];
        }
    }
    const _start = min, _end = max;
    let ans = Infinity;
    const countElementsLowerThan = (element) => {
        let total = 0, currentIndex = -1
        const _findUpperBound = (row, start, end) => {
            if(start> end) return currentIndex;
            let mid = Math.floor((start + end) /2);
            if(matrix[row][mid] > element) {
                _findUpperBound(row, start, mid - 1);
            } else {
                currentIndex = mid;
                _findUpperBound(row, mid + 1, end);
            }
        };
        for(var i = 0; i < R; i++) {
            currentIndex = -1
            _findUpperBound(i, 0, C-1);
            total += currentIndex + 1;
        }
        return total;
    };
    const _findMedian = (start, end) => {
        if(start > end) {
            ans = start;
            return;
        }
        let mid = Math.floor((start + end) /2);
        const _sm = countElementsLowerThan(mid);
        if(_sm <= midCount) {
            _findMedian(mid + 1, end);
        } else {
            _findMedian(start, mid-1);
        }
    };
    _findMedian(_start, _end);
    console.log(ans);
}

const matrix = [
[1, 3, 5], 
[2, 6, 9], 
[3, 6, 9]
];
const R = 3, C = 3
median(matrix, R, C)