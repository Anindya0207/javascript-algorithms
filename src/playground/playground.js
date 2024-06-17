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

DQueue.prototype.getRear = function() {
    if(this.rear == null) return;
    return this.rear.value;
}

DQueue.prototype.getFront = function() {
    if(this.front == null) return;
    return this.front.value;
}

var maxSlidingWindow = function(nums, k) {
    let final = [];
    const dq = new DQueue();
    for(var i =0; i<nums.length; i++) {
        // Always check if there is any element in the front of dq which is out of boundary
        while(dq.getFront() < i - k + 1) {
            dq.popFront();
        }
        // pop back till nums[i] >= rear value. We need to always maintain a increasing order from rear to front (Monotonic Queue)
        while(nums[i] >= nums[dq.getRear()] ) {
            dq.popBack();
        }
        //Push back current index to queue
        dq.pushBack(i);
        // Get Max when i (0 index) crosses k window
        if(i >= k - 1) {
            const currMax = dq.getFront();
            if(currMax) {
                final.push(nums[currMax])
            } 
        }
    }
    return final
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))