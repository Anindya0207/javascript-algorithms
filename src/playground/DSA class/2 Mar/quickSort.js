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
  const arrayLength = 20000;
  
  let randomArray = generateUniqueRandomArray(arrayLength, minNumber, maxNumber);
  
  const quickSort = (arr, start, end) => {
    if(start < end) {
      let pivot = start, left = start + 1, right = end;
      while(right >= left) {
        if(arr[left] > arr[pivot] && arr[right] < arr[pivot]  ){
          let temp = arr[left];
          arr[left] = arr[right];
          arr[right] = temp;
          left++;
          right--;
        } else {
          if(arr[left] <= arr[pivot]) {
            left++;
          }
          if(arr[right] >= arr[pivot]) {
            right--;
          }
        }
      }
      let temp = arr[right];
      arr[right] = arr[pivot];
      arr[pivot] = temp;
      pivot = right;
      quickSort(arr, start, pivot - 1);
      quickSort(arr, pivot + 1, end);
    }
  }
  
  const qSort = (arr) => {
    quickSort(arr, 0, arr.length-1);
  }
  var playground = function() {
    let arr = [...randomArray];
    console.log("Before sorting", arr);
    let now = Date.now();
    qSort(arr);
    console.log("After quick sorting", arr, Date.now() - now);// 48s for 20k elements
  };
  