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
  
  
  const countSort = (arr) => {
    let max = arr[0], min = arr[0], final = [];
    for(let i = 1; i < arr.length; i++) {
      if(max < arr[i]) {
        max = arr[i];
      }
      if(min > arr[i]) {
        min = arr[i];
      }
    }
    let frequencyArray = new Array(max-min+1).fill(0);
    for(let i = 0; i < arr.length; i++) {
      frequencyArray[arr[i] - min]++;
    }
    for(let i =0; i< frequencyArray.length; i++) {
      while(frequencyArray[i] > 0) {
        final.push(i + min);
        frequencyArray[i]--;
      }
    }
    return final;
  };
  
  var playground = function(arr) {
    let arr = [...randomArray];
    console.log("Before sorting", arr);
    let now = Date.now();
    console.log("After merge sorting", countSort(arr), Date.now() - now); //7ms for 20k elements
  };
  playground();
  