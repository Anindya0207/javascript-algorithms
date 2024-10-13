function binaryInsert(arr, value) {
  let left = 0;
  let right = arr.length;

  // Binary search to find the insertion index
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  arr.splice(left, 0, value);
}
