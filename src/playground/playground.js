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



const heapify = (arr, root, start, end) => {
  
  let left = 2 * root + 1 - start;
  let right = 2 * root + 2 - start;
  let maxPriorityIndex = root;
  if(arr[left] && arr[left].priority > arr[maxPriorityIndex].priority && left <= end) {
    maxPriorityIndex = left;
  }
  if(arr[right] && arr[right].priority > arr[maxPriorityIndex].priority && right <= end) {
    maxPriorityIndex = right;
  }
  if(maxPriorityIndex != root) {
    let temp = arr[root];
    arr[root] = arr[maxPriorityIndex];
    arr[maxPriorityIndex] = temp;
    heapify(arr, maxPriorityIndex, start, end);
  } 
 
  else {
    let minPrecendence = root;
    if(arr[left] && arr[left].index < arr[minPrecendence].index && arr[left].priority ==  arr[minPrecendence].priority && left <= end) {
      minPrecendence = left;
    }
    if(arr[right] && arr[right].index < arr[minPrecendence].index && arr[right].priority == arr[minPrecendence].priority && right <= end) {
      minPrecendence = right;
    }
    if(minPrecendence != root) {
      let temp = arr[root];
      arr[root] = arr[minPrecendence];
      arr[minPrecendence] = temp;
      heapify(arr, minPrecendence, end);
    }
  }
 
}

const buildMaxHeap = (arr, start, end) => {
  const mid = Math.floor((start + end) /2);
  for(let i = mid ; i >= start ; i--) {
    heapify(arr, i, start, end);
  }
}
class Item {
  index;
  priority;
  value;
  constructor(_index, _priority, _value) {
    this.index = _index;
    this.priority = _priority;
    this.value = _value;
  }
}

var PriorityQueue = function(length) {
  this.front = -1; this.rear = -1;
  this.arr = new Array(length);
}

PriorityQueue.prototype.enqueue = function(item) {
  if(!item.value || !item.priority) {
    console.error("The Item should have a value and priority {value: 1, priority: 1}");
    return;
  }
  if(this.rear == this.arr.length - 1) {
    console.log("Queue is full, sorry!");
    return;
  }
  if(this.front == -1) this.front = 0;
  const newItem = new Item(++this.rear, item.priority, item.value);
  this.arr[this.rear] = newItem;
}


PriorityQueue.prototype.dequeue = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    console.log('No element in the queue');
    return;
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front++];
}


const pq = new PriorityQueue(10);
pq.enqueue({value: 1, priority: 1});
pq.enqueue({value: 7, priority: 2});
pq.enqueue({value: 2, priority: 1});
pq.enqueue({value: 3, priority: 1});
pq.enqueue({value: 4, priority: 2});
pq.enqueue({value: 8, priority: 3});
pq.enqueue({value: 5, priority: 2});
pq.enqueue({value: 6, priority: 3});
pq.enqueue({value: 9, priority: 4});

var playground = function() {
  
};


playground();
