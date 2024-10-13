var Node = function (val) {
  this.value = val;
  this.next = null;
  this.prev = null;
};

var DQueue = function () {
  this.front = null;
  this.rear = null;
};

DQueue.prototype.pushFront = function (el) {
  const newNode = new Node(el);
  if (this.rear == null) {
    this.rear = newNode;
  }
  if (this.front == null) {
    this.front = newNode;
  } else {
    newNode.next = this.front;
    this.front.prev = newNode;
    this.front = newNode;
  }
};

DQueue.prototype.pushBack = function (el) {
  const newNode = new Node(el);
  if (this.front == null) {
    this.front = newNode;
  }
  if (this.rear == null) {
    this.rear = newNode;
  } else {
    newNode.prev = this.rear;
    this.rear.next = newNode;
    this.rear = newNode;
  }
};

DQueue.prototype.popFront = function () {
  if (this.front == null) {
    return;
  }
  if (this.front == this.rear) {
    const ret = this.front;
    this.front = null;
    this.rear = null;
    return ret.value;
  }
  const ret = this.front;
  const next = this.front.next;
  next.prev = null;
  this.front = next;
  return ret.value;
};

DQueue.prototype.popBack = function () {
  if (this.rear == null) {
    return;
  }
  if (this.front == this.rear) {
    const ret = this.front;
    this.front = null;
    this.rear = null;
    return ret.value;
  }
  const ret = this.rear;
  const prev = this.rear.prev;
  prev.next = null;
  this.rear = prev;
  return ret.value;
};
