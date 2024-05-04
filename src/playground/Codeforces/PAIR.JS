
const playground = () => {
    const arr = [  5, 6, 4, 3, 10, 8, 7, 9, 15 ];
    const prefixDiff = arr.reduce((acc, curr, i) =>{
      if(i > 0) {
        return [...acc, arr[i] - arr[i-1]]
      }
      return acc;
    }, [0]);
    console.log(prefixDiff);// [0, 1, -2, -1, 7, -2, 7]
    let pair = 0;
    let sum = 0;
    let counter = 0;
    for(var i = 0; i < prefixDiff.length; i++) {
      let a = prefixDiff[i];
      if(a < 0) pair++;
      if(arr[i] > arr[i-1]) {
        sum = a;
        counter = 0;
      } else {
        sum = sum + a;
        counter++;
        if(sum < 0) pair = pair + counter;
      }
    }
    console.log(pair);
  };
  
  playground();