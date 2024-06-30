var Twitter = function() {
    this.followMap = {};
    this.pq = new PriorityQueue1(Math.pow(10, 5))
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    if(this.pq) {
        this.pq.enqueue({
            value: {userId, tweetId}
        })
    }
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    const followees = this.followMap[userId];
    let count = 0, final = [], temp = [];
    while(count <= 10 && !this.pq.empty()) {
        let popped = this.pq.dequeue();
        if(popped.value.userId == userId || followees.indexOf(popped.value.userId) > -1) {
            count++;
            final.push(popped.value.tweetId);
            temp.push(popped);
        }
    }
    for(var i  =0; i <temp.length; i++) {
        this.pq.enqueue(temp[i])
    }
    return final;
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    this.followMap[followerId] = [
        ...(this.followMap[followerId] || []), followeeId
    ]
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if(this.followMap[followerId] && this.followMap[followerId].length > 0 ) {
        for(var i = 0; i< this.followMap[followerId]; i++) {
            if(this.followMap[followerId][i] == followeeId) {
                this.followMap[followerId].splice(i, 1)
            }
        }
    }
};


const heapify = (arr, root, start, end) => {
    let left = 2 * root + 1 - start;
    let right = 2 * root + 2 - start;
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
    if(item.value == undefined) {
      return;
    }
    if(this.rear == this.arr.length - 1) {
      return;
    }
    if(this.front == -1) this.front = 0;
    if(item.index != undefined) {
        this.arr[this.rear] = item;
    } else {
    const newItem = new Item(++this.rear, item.priority, item.value);
    this.arr[this.rear] = newItem;
    }
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
  
