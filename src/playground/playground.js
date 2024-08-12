const isBSTTraversal = arr => {
  let isSorted = true;
  for(var i =1; i<arr.length; i++) {
    if(arr[i] < arr[i-1]) {
      isSorted = false; break
    }
  }
  return isSorted;
}