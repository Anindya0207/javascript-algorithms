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

DQueue.prototype.pushFront = function(newNode) {
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
    this.size++;
}


DQueue.prototype.dLinkNode = function(node)  {
    if(this.front == this.rear && this.front == node) {
        this.front = null;
        this.rear = null;
        this.size--;
        return
    }
    if(this.front == node) {
       node.next.prev = null;
       this.front = node.next;
       this.size--;
       return;
    }
    if(this.rear == node) {
        node.prev.next = null;
        this.rear = node.prev;
        this.size--;
        returnl
    }
    if(node.prev) {
        node.prev.next = node.next;
    }
    if(node.next) {
        node.next.prev = node.prev;
    }
    this.size--;
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

var LFUCache = function(capacity) {
    this.leastFreq = 1;
    this.capacity = capacity;
    this.currentCapacity = 0;
    this.map = {};
    this.freqMap = {};
};

LFUCache.prototype.insertToOne = function(key, value) {
    const newNode = new Node({key, value, frequency: 1});
    let oneFreqDq = this.freqMap[1];
    if(oneFreqDq) {
        oneFreqDq.pushFront(newNode);
    } else {
        oneFreqDq = new DQueue();
        oneFreqDq.pushFront(newNode);
    }
    this.freqMap[1] = oneFreqDq;
    this.map[key] = newNode;
    this.currentCapacity++;
    this.leastFreq = 1;
}

LFUCache.prototype.shiftToNextFreq = function(key, value) {
    const node = this.map[key];
    const existingFreq = node.value.frequency;
    const existingFreqDq = this.freqMap[existingFreq];
    existingFreqDq.dLinkNode(node);
    const newFreq = existingFreq + 1;
    node.value = { key, value, frequency: newFreq};
    let newFreqDq = this.freqMap[newFreq];
    if(newFreqDq) {
        newFreqDq.pushFront(node);
    } else {
        newFreqDq = new DQueue();
        newFreqDq.pushFront(node);
    }
    this.freqMap[newFreq] = newFreqDq;
    if(existingFreqDq.getSize() == 0) {
        this.leastFreq = newFreq;
    }
}

LFUCache.prototype.get = function(key) {
    if(!this.map[key]) {
        return -1;
    }
    const node = this.map[key];
    this.shiftToNextFreq(key, node.value.value);
    return node.value.value;
};


LFUCache.prototype.put = function(key, value) {
    if(!!this.map[key]) {
        this.shiftToNextFreq(key, value);
    } else {
        if(this.currentCapacity == this.capacity) {
            const leastFreqDq = this.freqMap[this.leastFreq];
            if(leastFreqDq) {
              const popped = leastFreqDq.popBack();
              this.currentCapacity--;
              delete this.map[popped.key]
            }
         }
         this.insertToOne(key, value);     
    }
};