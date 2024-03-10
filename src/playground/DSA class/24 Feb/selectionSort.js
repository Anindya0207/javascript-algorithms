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
  
  const selectionSort = (arr, order) => {
    for(var i = 0; i < arr.length; i++) {
      let k = i;
      for(var j=i+1; j < arr.length; j++) {
        if(order == 'asc') {
          if(arr[k] > arr[j]) {
            k = j;
          }
        }
        else if(order == 'desc') {
          if(arr[k] < arr[j]) {
            k = j;
          }
        }
      }
      let temp = arr[k];
      arr[k] = arr[i];
      arr[i] = temp;
    }
  }
  
  const playground = () => {
    let arr = [...randomArray];
    console.log("Before sorting", arr);
    let now = Date.now();
    selectionSort(arr, 'asc');
    console.log("After selection sorting", arr, Date.now() - now); //600ms for 20k elements
  }
  
  
  
  