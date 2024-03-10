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
  
  const mergeTwoArrays = (arr1, arr2) => {
    let i = 0, j = 0, final = [];
    while(i < arr1.length && j < arr2.length) { 
      if(arr1[i] <= arr2[j]) {
        final.push(arr1[i]);
        i++;
      } else {
        final.push(arr2[j]);
        j++;
      }
    }
    while (i < arr1.length) {
      final.push(arr1[i]);
      i++;
    }
  
    // Append remaining elements from arr2
    while (j < arr2.length) {
      final.push(arr2[j]);
      j++;
    }
    return final;
  }
  
  const mergeSort = (arr, start, end) => {
    if(start >= end) return [arr[start]];
    const mid = Math.floor((start + end) / 2);
    const arr1 = mergeSort(arr, start, mid);
    const arr2 = mergeSort(arr, mid + 1, end);
    return mergeTwoArrays(arr1, arr2);
  }
  const mSort = (arr) => {
     return mergeSort(arr, 0, arr.length - 1);
  }
  var playground = function() {
    let arr = [...randomArray];
    console.log("Before sorting", arr);
    let now = Date.now();
    console.log("After merge sorting", mSort(arr), Date.now() - now); //7ms for 20k elements
    // console.log(mergeTwoArrays([38], [2]));
  };
  
  
  