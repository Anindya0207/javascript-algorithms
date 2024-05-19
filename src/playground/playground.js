var searchMatrix = function(matrix, target) {
  if(!matrix.length) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  let _start = 0, _end = (m * n )- 1;
  const _find = (start, end) => {
      if(start > end) return false;
      let mid = Math.floor((start + end) /2);
      const row = Math.floor(mid / n);
      const col = mid % n;
      if(matrix[row][col] == target) {
          return true;
      }
      if(matrix[row][col] > target) {
          return _find(start, mid - 1);
      } else {
          return _find(mid + 1, end);
      }
  }
  console.log( _find(_start, _end))
};
searchMatrix([[1,1]], 2)