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
