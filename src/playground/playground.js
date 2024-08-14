
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


const bfsOfGraph= (V, adj) => {
  let final = [];
  let queue = new MyQueuee();
  let visitedArr = Array.from({length: V}, () => 0);
  queue.enqueue(0);
  visitedArr[0] = 1;
  while(!queue.empty()) {
      let popped = queue.dequeue();
      let neighbours = adj[popped] || []
      for(let i =0 ; i< neighbours.length; i++) {
          if(!visitedArr[neighbours[i]]) {
              queue.enqueue(neighbours[i]);
              visitedArr[neighbours[i]] = 1
          }
      }
      final.push(popped)
  }
  return final;
}

console.log(bfsOfGraph(5, [[1,2,3],[],[4],[],[]]))