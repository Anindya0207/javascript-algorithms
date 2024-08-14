//Stack
var MyStack  = function() {
    this.top = -1;
    this.arr = [];
}

MyStack.prototype.push = function(elem) {
    this.arr[++this.top] = elem;
}
MyStack.prototype.pop = function() {
    if(this.top == -1) return;
    return this.arr[this.top--];
}
MyStack.prototype.topp = function() {
    if(this.top == -1) return;
    return this.arr[this.top];
}
MyStack.prototype.empty = function() {
    return this.top == -1;
}

// Queue

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


//DQueue

var Node = function(val) {
    this.value = val;
    this.next = null
    this.prev = null
}

var DQueue = function() {
    this.front = null;
    this.rear = null;
}

DQueue.prototype.pushFront = function(el) {
    const newNode = new Node(el);
    if(this.rear == null) {
        this.rear = newNode;
    }
    if(this.front == null) {
        this.front = newNode;
    } else {
        newNode.next = this.front;
        this.front.prev = newNode;
        this.front = newNode;
    }
}

DQueue.prototype.pushBack = function(el) {
    const newNode = new Node(el);
    if(this.front == null) {
        this.front = newNode;
    }
    if(this.rear == null) {
        this.rear = newNode;
    } else {
        newNode.prev = this.rear;
        this.rear.next = newNode;
        this.rear = newNode;
    }
}

DQueue.prototype.popFront = function() {
    if(this.front == null) {
        return;
    }
    if(this.front == this.rear) {
        const ret = this.front;
        this.front = null;
        this.rear = null;
        return ret.value
    }
    const ret = this.front;
    const next  = this.front.next;
    next.prev = null;
    this.front = next;
    return ret.value;
}


DQueue.prototype.popBack = function() {
    if(this.rear == null) {
        return;
    }
    if(this.front == this.rear) {
        const ret = this.front;
        this.front = null;
        this.rear = null;
        return ret.value
    }
    const ret = this.rear;
    const prev  = this.rear.prev;
    prev.next = null;
    this.rear = prev;
    return ret.value;
}



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
  