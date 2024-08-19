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

var countPaths = function (n, times) {
  let MAX = Math.pow(10, 9) + 7
  let distArr = Array.from({ length: n  }, () => Infinity);
  let countArr = Array.from({ length: n  }, () => Infinity);
  let adj = Array.from({ length: n  }, () => new Array());
  let queue = new PriorityQueuee();
  for (let i = 0; i < times.length; i++) {
      let [u, v, w] = times[i];
      adj[u].push({ dest: v, w });
      adj[v].push({ dest: u, w });
  }
  distArr[0] = 0;
  countArr[0] = 1;
  queue.enqueue({value: [0, 0], priority: 0});

  while(!queue.empty()) {
      let pop = queue.dequeue();
      let {value} = pop;
      let [node, time] = value;
      let neighbours = adj[node] || [];
      for(let i = 0;  i< neighbours.length; i++) {
          let {dest, w} = neighbours[i];
          let newTime = time + w;
          if(distArr[dest] > newTime) {
              distArr[dest] = newTime;
              countArr[dest] = countArr[node];
              queue.enqueue({value: [dest, newTime], priority: newTime});
          }
          else if (newTime === distArr[dest]) {
            countArr[dest] = (countArr[dest] + countArr[node]) % MAX;
        }
      }
  }
  return countArr[n - 1]
};

console.log(countPaths(7, [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]))