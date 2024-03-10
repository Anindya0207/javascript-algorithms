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
  
  
  const insertionSort = (arr, order) => {
    for(var i = 1; i < arr.length; i++) {
        let j = i -1;
        const curr = arr[i];
        if(order === 'asc') {
          while(j >=0 && arr[j] > curr) {
            arr[j+1] = arr[j];
            j--;
          }
        } else if(order === 'desc') {
          while(j >=0 && arr[j] < curr) {
            arr[j+1] = arr[j];
            j--;
          }
        }
        arr[j+1] = curr;
    }
  }
  var playground = function() {
    let arr = [...randomArray];
    console.log("Before sorting", arr);
    let now = Date.now();
    insertionSort(arr, 'asc');
    console.log("After insertion sorting", arr, Date.now() - now); // 258ms for 20k elements
  };
  
  