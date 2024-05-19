const kthElement = (A,B,n,m,k) => { 
  if(B.length < A.length) {
      return kthElement(B, A, m, n,k);
  }
  const _find = (start, end) => {
      if(start > end) return 0;
      let mid1 = Math.min(Math.floor((start + end) /2), k);
      let mid2 = k - mid1;
      let l1 = -Infinity, l2 = -Infinity;
      let r1 = Infinity, r2 = Infinity;
      if(mid1 < n) r1 = A[mid1];
      if(mid2 < m) r2 = B[mid2];
      if(mid1-1 >=0) l1 = A[mid1 - 1];
      if(mid2-1 >=0) l2 = B[mid2 - 1];
      
      if(l1 <= r2 && l2 <= r1) {
          return Math.max(l1, l2);
      }
      if(l1 > r2) {
          return _find(start, mid1 - 1);
      } else {
          return _find(mid1 + 1, end);
      }
  }
 console.log(_find(0, k))
}

kthElement([5,5,8,8,8,9,11,11,11,11,11], [4,4,4,4,6,8,9,9,9,11,13], 11, 11, 2)