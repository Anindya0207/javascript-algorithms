const linearSearch = (arr, search) => {
    let isFound = false;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] === search) {
        console.log("Found at index", i);
        isFound = true;
        break;
      }
    }
     console.log(isFound ? "Found the element": "Could not find the element");
  }
  const binarySearch = (arr, search) => {
    const bSearch = () => {
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
      return -1;
    }
    const index = bSearch();
    if(index === -1) {
      console.log("Could not find the elemnt");
    } else {
      console.log("Found the element at index", index);
    }
  }