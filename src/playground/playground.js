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

var PriorityQueuee = function() {
  this.front = -1; this.rear = -1;
  this.arr = new Array(Math.pow(10, 5));
}

PriorityQueuee.prototype.enqueue = function(item) {
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


PriorityQueuee.prototype.dequeue = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return;
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front++];
}

PriorityQueuee.prototype.empty = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return true;
  }
  return false;
}

PriorityQueuee.prototype.top = function() {
  if(this.front == -1 || this.front == this.arr.length-1 || this.front > this.rear) {
    return
  }
  buildMaxHeap(this.arr, this.front, this.rear);
  return this.arr[this.front];
}



var findCheapestPrice = function(n, flights, src, dst, k) {
  let queue = new PriorityQueuee();
  let priceArr = Array.from({length: n}, () => Infinity);
  let minPrice = Infinity
  let adj = {};
  for(let i = 0; i < flights.length; i++) {
      let [u,v, price] = flights[i];
      if(!adj[u]) {
          adj[u] = [];
      }
      adj[u].push([v, price]);
  }
  priceArr[src] = 0;
  queue.enqueue({value: [src, -1, 0], priority: 0});
  while(!queue.empty()) {
      let pop = queue.dequeue();
      let {value} = pop;
      let [city, stops, currPrice] = value;
      let neighbours = adj[city] || [];
      if(city == dst && stops <= k) {
          return Math.min(minPrice,currPrice);
      }
      for(let i = 0; i < neighbours.length; i++) {
          let [destCity, price] = neighbours[i];
          let newPrice = currPrice + price;
          if(priceArr[destCity] > newPrice && stops + 1 <= k + 1) {
              priceArr[destCity] = newPrice;
              queue.enqueue({value: [destCity, stops + 1, newPrice], priority: stops + 1})
          }
      }
  }
  return -1;
};

console.log(findCheapestPrice(3, [[0,1,100],[1,2,100],[0,2,500]], 0,2, 1))