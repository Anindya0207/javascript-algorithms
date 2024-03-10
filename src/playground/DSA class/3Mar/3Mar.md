Heap Sort

Before heap sort we need to understand tree concept

- tree is a nonlinear data structure. 
- root, child and leaf nodes. 
- Binary tree means each node can have maximum two children, you can have one or zero children as well
- Heap is a tree DS which can have max two nodes. it is of two types - max heap and min heap


10 5 22 45 62 ->  heap

            10
        5       22
    45      62
- Max heap says root > children
- Min heap says root < children
- Above heap is neither max or min heap

- Max heap should start with mid of the given array and we need to start from the mid
- so we will start from 22 which is a max heap acc to the above diagram
- now i=1 5 is not a max heap.. so to make [5 45 62] 62 needs to come in root to make it a max heap. So swap 5 with 62

            10
        62       22
    45      5
- now i = 0 10 again we need to convert to max heap.. swap 10 and 62
           62
        10       22
    45      5
- but now the below trees might lose the max heap property, we need to redo for the [5 45 10] now 

            62
        45       22
    10      5
- now this tree's equivalent array is 62 45 22 10 5
- we will blindly swap the first and last since it is max heap - 5 45 22 10 62

            5
        45       22
    10      62
- now that the last index is sorted.
- do the same for first four elements

            5
        45       22
    10      
- 10 5 81 22 65 99 4 26 50 72

                                      10
                              5                81
                        22        65      99       4        
                    26     50  72

10 5 81 22 72 99 4 26 50 65
                                      10
                              5                81
                        22        72      99       4        
                    26     50  65

                                      10
                              5                81
                        50        72      99       4        
                    26     22  65

                                      10
                              5                99
                        50        72      81       4        
                    26     22  65

                                      10
                              72                99
                        50        5      81       4        
                    26     22  65

                                      10
                              72                99
                        50        65      81       4        
                    26     22  5

                                      99
                              72                10
                        50        65      81       4        
                    26     22  5

                                      99
                              72                81
                        50        65      10       4        
                    26     22  5

                                      5
                              72                81
                        50        65       10       4        
                    26     22  99


5 65 81 50 72 10 4 26 22 99 ---- PASS 1

This will be done once to build the max heap

then we can run the aray from start to end and for each index we can do normal heapify. no need to iterate the inner for loop from mid to 0

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


const heapify = (arr, pivot, end) => {
  let leftChild = 2 * pivot + 1;
  let rightChild = 2 * pivot + 2;
  let maxPivot = pivot;
  if(arr[leftChild] && arr[leftChild] > arr[maxPivot] && leftChild <= end) {
    maxPivot = leftChild;
  }
  if(arr[rightChild] && arr[rightChild] > arr[maxPivot] && rightChild <= end) {
    maxPivot = rightChild;
  }
  if(maxPivot != pivot) {
    let temp = arr[pivot];
    arr[pivot] = arr[maxPivot];
    arr[maxPivot] = temp;
    heapify(arr, maxPivot, end);
  }
};

const heapSort = arr => {
  let start = 0, end = arr.length - 1;
  const mid = Math.floor((start + end)/ 2);
  // buidling the max heap. run heapify for  mid-1 ... 0
  for(var i = mid; i >=0 ; i--) {
    heapify(arr, i, arr.length - 1);
  }
  // done building the max heap.. now we will run heapify for 0 ... length - 1 
  while(start < end){
    // but first swap the first and last  pos since heapify already run once from mid to 0
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    // heapify on remaining arry: that is decrement end and do heapify with the decremented value. hence it should be --end
    heapify(arr, start, --end);
  }
}
var playground = function() {
  let arr = [7,7, 0, 6,4, 3, 11, 14, 16, 23]; //[10,5,81,22,65,99,4,26,50,72];// [7,7, 0, 6,4, 3, 11, 14, 16, 23];  [...randomArray];
  console.log("Before sorting", arr);
  let now = Date.now();
  heapSort(arr);
  console.log("After heap sorting", arr, Date.now() - now);// 729 for 20k elements
};
playground();


