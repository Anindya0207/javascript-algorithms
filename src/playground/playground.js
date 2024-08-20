/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */

const heapify = (arr, root, start, end) => {
  let left = 2 * root + 1 - start;
  let right = 2 * root + 2 - start;
  let maxPriorityIndex = root;
  if (arr[left] && arr[left].priority > arr[maxPriorityIndex].priority && left <= end) {
      maxPriorityIndex = left;
  }
  if (arr[right] && arr[right].priority > arr[maxPriorityIndex].priority && right <= end) {
      maxPriorityIndex = right;
  }
  if (maxPriorityIndex != root) {
      let temp = arr[root];
      arr[root] = arr[maxPriorityIndex];
      arr[maxPriorityIndex] = temp;
      heapify(arr, maxPriorityIndex, start, end);
  }

  else {
      let minPrecendence = root;
      if (arr[left] && arr[left].index < arr[minPrecendence].index && arr[left].priority == arr[minPrecendence].priority && left <= end) {
          minPrecendence = left;
      }
      if (arr[right] && arr[right].index < arr[minPrecendence].index && arr[right].priority == arr[minPrecendence].priority && right <= end) {
          minPrecendence = right;
      }
      if (minPrecendence != root) {
          let temp = arr[root];
          arr[root] = arr[minPrecendence];
          arr[minPrecendence] = temp;
          heapify(arr, minPrecendence, end);
      }
  }

}

const buildMaxHeap = (arr, start, end) => {
  const mid = Math.floor((start + end) / 2);
  for (let i = mid; i >= start; i--) {
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

var PriorityQueuee = function () {
  this.front = -1; this.rear = -1;
  this.arr = new Array(Math.pow(10, 5));
}

PriorityQueuee.prototype.enqueue = function (item) {
  if (item.value == undefined || item.priority == undefined) {
      return;
  }
  if (this.rear == this.arr.length - 1) {
      return;
  }
  if (this.front == -1) this.front = 0;
  const newItem = new Item(++this.rear, item.priority, item.value);
  this.arr[this.rear] = newItem;
}


PriorityQueuee.prototype.dequeue = function () {
  if (this.front == -1 || this.front == this.arr.length - 1 || this.front > this.rear) {
      return;
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front++];
}

PriorityQueuee.prototype.empty = function () {
  if (this.front == -1 || this.front == this.arr.length - 1 || this.front > this.rear) {
      return true;
  }
  return false;
}

PriorityQueuee.prototype.top = function () {
  if (this.front == -1 || this.front == this.arr.length - 1 || this.front > this.rear) {
      return
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front];
}
const minimumMultiplications = (arr, start, end) =>  {
  let distArr = Array.from({length: end +1}, () => Infinity);
  let queue= new PriorityQueuee();
  distArr[start] = 0;
  queue.enqueue({value: [start,0], priority: 0});
  let minDist = Infinity;
  while(!queue.empty()) {
      let pop= queue.dequeue();
      let [node, dist]= pop.value;
      if(node==end){
          minDist = Math.min(minDist, dist);
      }
      for(let k= 0; k < arr.length; k++){
          let newNode= (node * arr[k]) % 100000;
          let newDist = dist + 1;
          if(newNode <= end && distArr[newNode] > newDist){
              distArr[newNode] = newDist;
              queue.enqueue({value:[newNode, newDist], priority: newDist});
          }
      }
  }
  return minDist ==Infinity? -1: minDist
}

console.log(minimumMultiplications([3,4,65],7, 66175))

