var Node = function(val) {
    this.value = val;
    this.next = null
    this.prev = null
}

var DQueue = function() {
    this.front = null;
    this.rear = null;
    this.size = 0;
}

DQueue.prototype.createNode = function(el) {
    const newNode = new Node(el);
    return newNode;
}
DQueue.prototype.pushFront = function(newNode, dontIncrementSize) {
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
    if(!dontIncrementSize) this.size++;
}

DQueue.prototype.shiftToFront = function(node)  {
    if (node === this.front) return;  // Node is already at the front
    if(node.prev) {
        node.prev.next = node.next;
        if(node.next) {
            node.next.prev = node.prev;
        } else {
            this.rear = node.prev;
            let _front = this.front;
            node.next = _front;
            node.prev = null;
            _front.prev = node;
            this.front = node;
        }
    }
}

DQueue.prototype.pushBack = function(newNode) {
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
    this.size++;
}

DQueue.prototype.popFront = function() {
    if(this.front == null) {
        return;
    }
    this.size--;
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
    this.size--;
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

DQueue.prototype.getSize = function() {
    return this.size;
}

var LRUCache = function(capacity) {
    this.dq = new DQueue();
    this.map= {};
    this.capacity = capacity;
};

LRUCache.prototype.get = function(key) {
    if(!this.map[key]) {
        return -1;
    }
    let node = this.map[key];
    const retVal = node.value.value;
    this.dq.shiftToFront(node);
    return retVal;
};

LRUCache.prototype.put = function(key, value) {
    if(!!this.map[key]) {
        let node = this.map[key];
        node.value = { key, value};
        this.dq.shiftToFront(node);
        return;
    }
    if(this.dq.getSize() == this.capacity) {
        const leastUsed = this.dq.popBack();
        delete this.map[leastUsed.key];
    }
    const newNode = this.dq.createNode({key, value});
    this.map[key] = newNode;
    this.dq.pushFront(newNode);
};

const lRUCache = new LRUCache(2);
lRUCache.put(2, 1); // cache is {1=1}
lRUCache.put(1, 1); // cache is {1=1, 2=2}
lRUCache.put(2, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.put(4, 1); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
console.log(lRUCache.get(1));    // return -1 (not found)
console.log(lRUCache.get(2));    // return 3
