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
  if(item.value == undefined || item.priority == undefined) {
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



var shortestPathBinaryMatrix = function(grid) {
  let queue = new PriorityQueue1(Math.pow(10,5));
  
  let distArr = Array.from({length: grid.length}, () => Array.from({length: grid.length}, () => Infinity));
  let directions = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1,1],[-1,1], [1,-1]];
  queue.enqueue({value: [0, 0, 1], priority: 1});
  distArr[0][0] = 1;
  while(!queue.empty()) {
      let pop = queue.dequeue();
      let {value} = pop;
      let [i, j, dist] = value;
      for(let k = 0;k < directions.length; k++) {
          let [dx, dy] = directions[k];
          let newI = i + dx;
          let newJ = j + dy;
          let newDist = dist + 1;
          if((distArr[newI] && distArr[newI][newJ] > newDist) && (grid[newI] && grid[newI][newJ] == 0)) {
              distArr[newI][newJ] = newDist;
              queue.enqueue({value: [newI, newJ, newDist], priority: newDist});
          }
      }
  }
  return distArr[grid.length-1][grid.length-1] == Infinity ? -1 : distArr[grid.length-1][grid.length-1]
};

console.log(shortestPathBinaryMatrix([[0,0,0],[1,0,0],[1,1,0]]))