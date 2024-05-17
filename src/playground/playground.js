var findKthPositive = function(arr, k) {
  let _start = 0, _end = arr.length -1, missingIndex = -1
  const _find = (start, end) => {
      if(start > end) return;
      let mid = Math.floor((start + end) /2);
      let midMissing = arr[mid] - mid -1;
      if(midMissing >= k) {
         missingIndex = mid;
         _find(start, mid-1);
      } else {
          missingIndex = mid;
         _find(mid +1, end)
      }
  };
  _find(_start, _end);
  console.log(missingIndex)
  let missingCount = arr[missingIndex] - missingIndex- 1;
  if(missingCount != 0) return missingIndex + k;
  return missingIndex + k + 1;
};
findKthPositive([1,10,21,22,25]  , 12)