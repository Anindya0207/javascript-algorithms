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
    return arr;
  }
  
  const binarySearch = (arr, search) => {
    let start = 0;
      let end = arr.length-1;
      while(start <= end) {
        let mid = Math.floor((start + end) / 2);
        if(arr[mid] === search) {
          return mid;
        }
        else if(arr[mid] > search) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
      return start;
  }
  
  const playground = () => {
    let arr =[0,3,0,1,1,-1,-5,-5,3,-3,-3,0]
    console.log("Before sorting", arr);
    let now = Date.now();
    let final = [];
    let reoccuranceMap = {};
    let tripletMap = {};
    for(var n = 0; n < arr.length; n++) {
      if(reoccuranceMap[arr[n]]) {
        reoccuranceMap[arr[n]] = reoccuranceMap[arr[n]] + 1;
      } else {
        reoccuranceMap[arr[n]] = 1;
      }
    }
  
    selectionSort(arr, 'asc'); // -4 -1 -1 0 1 2
    console.log('after sorting', arr);
    const mid = binarySearch(arr, 0); // 3
    console.log(mid);
    console.log(reoccuranceMap);
    for (var k =0; k< arr.length; k++) { // 0....n
      for(i=mid-1; i >= 0; i--) { // mid-1.....0
        for(var j = mid; j<arr.length; j++) { //mid......n
          if(arr[i] + arr[j] + arr[k] == 0 ) {
            let shouldPush = true;
            if(arr[i] == arr[k]){
              if(reoccuranceMap[arr[i]] <= 1) {
                shouldPush = false;
              }
              reoccuranceMap[arr[i]] = reoccuranceMap[arr[i]] -1;
            }
            if(arr[j] == arr[k]){
              if(reoccuranceMap[arr[j]] <= 1) {
                shouldPush = false;
              }
              reoccuranceMap[arr[j]] = reoccuranceMap[arr[j]] -1;
            }
           
            const triplet = selectionSort([arr[i], arr[j], arr[k]], 'asc');
            console.log(reoccuranceMap, triplet, shouldPush);
            if(shouldPush && !tripletMap[triplet]) {
              tripletMap[triplet] = true;
              final.push(triplet);
            }
          }
        }
      }
    }
    console.log("After selection sorting", final, Date.now() - now);
  }
  
  var threeSum = function(nums) {
    nums.sort((a, b) => a - b); // Sorted Array
    let answer = [];
    
    if (nums.length < 3) {
        return answer;
    }
    
    if (nums[0] > 0) {
        return answer;
    }
    
    let hashMap = new Map();
    
    for (let i = 0; i < nums.length; ++i) {
        hashMap.set(nums[i], i);
    }
    
    for (let i = 0; i < nums.length - 2; ++i) {
        if (nums[i] > 0) {
            break;
        }
        
        for (let j = i + 1; j < nums.length - 1; ++j) {
            let required = -1 * (nums[i] + nums[j]);
            if (hashMap.has(required) && hashMap.get(required) > j) {
                answer.push([nums[i], nums[j], required]);
            }
            j = hashMap.get(nums[j]);
        }
        
        i = hashMap.get(nums[i]);
    }
    
  console.log(answer)
  };
  
  threeSum([0,3,0,1,1,-1,-5,-5,3,-3,-3,0]);
  
  