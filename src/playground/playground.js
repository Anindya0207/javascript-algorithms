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

const playground = () => {
  const arr = [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,1],
    [0,1,0,1,0]
  ];
  console.log(arr);
 let map = {}, edge = 0;
  for(var i = 0; i < arr.length; i ++ ){ 
    for(j = 0; j < arr[i].length; j++) {
      if(arr[i][j] == 1 &&  !map[`${i}${j}`]) {
        edge++;
        map[`${i}${j}`] = true;
        map[`${j}${i}`] = true;
      }
    }
  }
  console.log(edge);
}

playground();
