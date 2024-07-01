const solve = (A, B, C) => {
  let Q1 = new PriorityQueue1(Math.pow(10, 5));
  let Q2 = new PriorityQueue1(Math.pow(10, 5))
  for(var i  = 0; i < A.length; i++) {
    Q1.enqueue({
      value: A[i],
      priority: A[i]
    })
  }
  for(var i  = 0; i < B.length; i++) {
    Q2.enqueue({
      value: B[i],
      priority: B[i]
    })
  }
  let SM = -Infinity, final = [];
  while(!Q1.empty() && !Q2.empty()) {
    let a1 = Q1.dequeue();
    let a2 = Q1.dequeue();
    let b1 = Q2.dequeue();
    let b2 = Q2.dequeue();
    if(a1 && b1) {
      final.push(a1?.value + b1?.value);
    }
    if(final.length == C) break;
    if((b2 && a1.value + b2.value <= SM) || (a2 && a2.value + b1.value <= SM)) {
      final.push(SM);
    }
    if(final.length == C) break;
    if(a1?.value + b2?.value >= a2?.value + b1?.value) {
      Q1.enqueue(a1);
      if(a2 && b1){ 
        SM = a2?.value + b1?.value;
      }
    } else {
      Q2.enqueue(b1);
      if(b2 && a1) {
        SM = a1?.value + b2?.value
      }
    }
    
    if(a2) Q1.enqueue(a2);
    if(b2) Q2.enqueue(b2);
  }
  return final;
};


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

var PriorityQueue1 = function(length) {
  this.front = -1; this.rear = -1;
  this.arr = new Array(length);
}

PriorityQueue1.prototype.enqueue = function(item) {
  if(!item.value || !item.priority) {
    return;
  }
  if(this.rear == this.arr.length - 1) {
    return;
  }
  if(this.front == -1) this.front = 0;
  const newItem = new Item(++this.rear, item.priority, item.value);
  this.arr[this.rear] = newItem;
}


PriorityQueue1.prototype.dequeue = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return;
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front++];
}

PriorityQueue1.prototype.empty = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return true;
  }
  return false;
}

PriorityQueue1.prototype.top = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front];
}

console.log(solve([3,2], [1,4], 2))