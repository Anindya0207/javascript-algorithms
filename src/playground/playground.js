const wrap = (num, n) => {
  if(num ==undefined) return n;
  return num;
}
const bSearch = (arr, el) => {
  let _start = 0, _end = arr.length - 1;
  const _find = (start, end) => {
      if(start > end) return end;
      let mid = Math.floor((start + end)/ 2);
      if(arr[mid] == el) {
          return mid;
      }
      if(arr[mid] > el) {
          return _find(start, mid-1);
      }else {
          return _find(mid + 1, end);
      }
  }
  return _find(_start, _end);
}
var findMedianSortedArrays = function(nums1, nums2) {
  if(!nums1.length && !nums2.length) return null;
  
  let min = Math.min(wrap(nums1[0], Infinity), wrap(nums2[0], Infinity));
  let max = Math.max(wrap(nums1[nums1.length -1], -Infinity), wrap(nums2[nums2.length - 1], -Infinity));
  let actualvg = (min + max) /2;
  let l = bSearch(nums1, actualvg); 
  let r = bSearch(nums2, actualvg);
  if(l == -1) l =0;
  if(r == -1) r =0;

  const avg = (nums1[l] + nums2[r]) / 2;
  if((nums1.length + nums2.length) %2 ==0)
 return(avg)
 else    return(nums2[r])


};

findMedianSortedArrays([2], [])