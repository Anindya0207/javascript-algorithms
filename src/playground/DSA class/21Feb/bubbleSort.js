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

const randomArray = generateUniqueRandomArray(arrayLength, minNumber, maxNumber);

const bubbleSort = (arr, order) => { // took 5377ms to sort array of 30000 elements
  for(var i = 0 ; i < arr.length; i++) {
      for (j = 0; j < arr.length - 1; j++) {
          if(order === 'asc') {
              if(arr[j] > arr [j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
              }
          } else if(order === 'desc') {
              if(arr[j] < arr [j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
              }
          }
      }
  }
}
const bubbleSortThodaOptimised = (arr, order) => { // took 3297ms to sort array of 30000 elements
  for(var i = 0 ; i < arr.length; i++) {
      for (j = 0; j < arr.length - i - 1; j++) {
          if(order === 'asc') {
              if(arr[j] > arr [j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
              }
          } else if(order === 'desc') {
              if(arr[j] < arr [j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
              }
          }
      }
  }
}
const bubbleSortKaafiOptimised = (arr, order) => { // took 3450ms to sort array of 30000 elements
  for(var i = 0 ; i < arr.length; i++) {
      let sorted = true;
      for (j = 0; j < arr.length - i -1; j++) {
            if(order === 'asc') {
                if(arr[j] > arr [j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = temp;
                  sorted = false;
                }
            } else if(order === 'desc') {
                if(arr[j] < arr [j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j+1];
                  arr[j+1] = temp;
                  sorted = false;
                }
            }
          
      }
      if(sorted) break;
  }
}
const playground = () => {
   let arr = [...randomArray];
   console.log("Before sorting", arr);
   let now = Date.now();
   bubbleSort(arr, 'asc');
   console.log("After Normal sorting", arr, Date.now() - now);
   arr = [...randomArray];
   now = Date.now();
   console.log("Before sorting", arr);
   bubbleSortThodaOptimised(arr, 'asc');
   console.log("After i-1 sorting", arr, Date.now() - now);
   arr = [...randomArray];
   now = Date.now();
   console.log("Before sorting", arr);
   bubbleSortKaafiOptimised(arr, 'asc');
   console.log("After flag based sorting", arr, Date.now() - now);

}

