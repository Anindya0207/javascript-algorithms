function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function generateUniqueRandomArray(length, min, max) {
    const uniqueNumbers = Array.from({ length }, (_, index) => index + min);
    shuffleArray(uniqueNumbers);
    return uniqueNumbers.slice(0, length);
  }
  
  const minNumber = 1;
  const maxNumber = 100;
  const arrayLength =20000;
  
  let randomArray = generateUniqueRandomArray(arrayLength, minNumber, maxNumber);
  
  
  const heapify = (arr, pivot, end) => {
    let leftChild = 2 * pivot + 1;
    let rightChild = 2 * pivot + 2;
    let maxPivot = pivot;
    if(arr[leftChild] && arr[leftChild] > arr[maxPivot] && leftChild <= end) {
      maxPivot = leftChild;
    }
    if(arr[rightChild] && arr[rightChild] > arr[maxPivot] && rightChild <= end) {
      maxPivot = rightChild;
    }
    if(maxPivot != pivot) {
      let temp = arr[pivot];
      arr[pivot] = arr[maxPivot];
      arr[maxPivot] = temp;
      heapify(arr, maxPivot, end);
    }
  };
  
  const heapSort = arr => {
    let start = 0, end = arr.length - 1;
    const mid = Math.floor((start + end)/ 2);
    for(var i = mid; i >=0 ; i--) {
      heapify(arr, i, arr.length - 1);
    }
    while(start < end){
      let temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      heapify(arr, start, --end);
    }
  }
  
  var playground = function() {
    let arr = [7,7, 0, 6,4, 3, 11, 14, 16, 23]; //[10,5,81,22,65,99,4,26,50,72]; // [7,7, 0, 6,4, 3, 11, 14, 16, 23];  [...randomArray];
    console.log("Before sorting", arr);
    let now = Date.now();
    heapSort(arr);
    console.log("After heap sorting", arr, Date.now() - now);// 729 for 20k elements
  };
  playground();
  