var leastInterval = function(tasks, n) {
    let map = {};
    for(var i = 0; i < tasks.length; i++) {
        map[tasks[i]] = (map[tasks[i]] || 0) + 1
    }
    let pq = new PriorityQueue1(27);
    for(var m in map) {
        pq.enqueue({
            value: m,
            priority: map[m]
        });
    }
    let final = 0
    while(!pq.empty()) {
        let temp = [];
        // pop n+1 items from pq
        for(var i  = 0; i <= n; i++) {
            if(!pq.empty()) {
                let top = pq.dequeue();
                top.priority--;
                temp.push(top);
            }
        }
        // wapas daal do pq me wo saare tasks jiska priority reduce hote hote 0 na ho gya
        for(var j = 0; j < temp.length; j++) {
            if(temp[j].priority > 0) {
                pq.enqueue(temp[j]);
            }
        }
        if(!pq.empty()) {
            // this means there is still task to do. and we have done some tasks or we have waited in idle state. So increase the unit of time by n+1
            final+= n+1
        } else {
            // this means there is no tasks to do anymore. whatever is pending in temp is only tasks we will perform.
            final += temp.length;
        }
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
  