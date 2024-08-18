var MyQueuee = function () {
  this.array = [];
  this.front = -1;
  this.rear = -1;
};

MyQueuee.prototype.enqueue = function (el) {
  if (this.front == -1) this.front = 0;
  this.array[++this.rear] = el;
};

MyQueuee.prototype.dequeue = function () {
  if (this.front == -1 || this.rear == -1) return;
  return this.array[this.front++];
};

MyQueuee.prototype.frontt = function () {
  if (this.front == -1 || this.rear == -1) return -1;
  return this.array[this.front];
};
MyQueuee.prototype.empty = function() {
    return (this.front == -1 || this.rear == -1 || this.front > this.rear) 
}


const heapify = (arr, root, start, end) => {
  let left = 2 * root + 1 - start;
  let right = 2 * root + 2 - start;
  let maxPriorityIndex = root;
  if(arr[left] && arr[left].priority < arr[maxPriorityIndex].priority && left <= end) {
    maxPriorityIndex = left;
  }
  if(arr[right] && arr[right].priority < arr[maxPriorityIndex].priority && right <= end) {
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


PriorityQueue.prototype.dequeue = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return;
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front++];
}

PriorityQueue.prototype.empty = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return true;
  }
  return false;
}

PriorityQueue.prototype.top = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front];
}


const shortestPathDFS = (edges, N) => {
  let src = 0;
  let visitedMap = {}
  let final = Array.from({length: N}, () => Infinity);
  let adj = Array.from({length: N}, () => new Array());
  for(let i  = 0; i< edges.length; i++) {
    let [u, v, weight] = edges[i];
    adj[u].push({v, weight});
  }
  visitedMap[src] = true
  final[src] = 0;
  const _traverse = (_src, _dest, dist) => {
    if(_src == _dest) return dist
    let minDist = Infinity;
    let neighbours = adj[_src];
    for(let i= 0; i<neighbours.length; i++) {
      let {v, weight} = neighbours[i];
      if(!visitedMap[v]) {
        visitedMap[v] = true;
        minDist = Math.min(minDist, _traverse(v, _dest, dist + weight));
        visitedMap[v] = false;
      }
    }
    return minDist;
  }
  for(let i =0 ; i< N; i++) {
    visitedMap[src] = true
    let shortestDist = _traverse(src, i, 0);
    final[i] = shortestDist == Infinity ? -1: shortestDist
  }
  return final.map(f => f == Infinity ? -1: f);
}

const shortestPathBFS = (edges, N) => {
  let src = 0;
  let final = Array.from({length: N}, () => Infinity);
  let adj = Array.from({length: N}, () => new Array());
  for(let i  = 0; i< edges.length; i++) {
    let [u, v, weight] = edges[i];
    adj[u].push({v, weight});
  }
  final[src] = 0;
  let queue = new MyQueuee();
  queue.enqueue([0, 0]);
  while(!queue.empty()) {
    let [node, dist] = queue.dequeue();
    let neighbours = adj[node];
    for(let i =0; i<neighbours.length; i++) {
      let {v, weight} = neighbours[i];
      let newDis = dist + weight;
      if(final[v] > newDis) {
        final[v] = newDis;
        queue.enqueue([v, newDis]);
      }
    }
  }
  return final.map(f => f == Infinity ? -1: f);
}



const shortestPathDjikstra = (Adj, V, S) => {
  let final = Array.from({length: V}, () => Infinity);
       let queue = new PriorityQueue(Math.pow(10, 5));
       final[S] = 0;
       queue.enqueue({value: [S, 0], priority:0});
       while(!queue.empty()) {
           let {value } = queue.dequeue();
           let [node, dist] = value;
           let neighbours = Adj[node];
           for(let i = 0; i < neighbours.length;i++) {
               let [dest, weight] = neighbours[i];
               let newDist = dist + weight;
               if(newDist < final[dest]) {
                   final[dest] = newDist;
                   queue.enqueue({value: [dest, newDist], priority: newDist});
               }
           }
       }
       return final.map(f => f == Infinity ? -1: f);
}


console.log(shortestPathDFS( [[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]], 6))
console.log(shortestPathBFS( [[0,1,2],[0,4,1],[4,5,4],[4,2,2],[1,2,3],[2,3,6],[5,3,1]], 6))
console.log(shortestPathDjikstra([[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]], 3, 2))
