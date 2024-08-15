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



const isCycle = (V, adj) => {
  let visitedArr = Array.from({length: V}, () => 0);
  let nextLevelneighbours = {};
  let queue = new MyQueuee();
  queue.enqueue(0);
  visitedArr[0] = 1;
  while(!queue.empty()) {
      let pop = queue.dequeue();
      visitedArr[pop] = 1;
      if(pop != undefined) {
          let neighbours = adj[pop];
          for(let i  =0; i< neighbours.length; i++) {
              if(nextLevelneighbours[neighbours[i]] != pop) {
                  return true;
              }
              if(!visitedArr[i]) {
                  queue.enqueue(neighbours[i]);
                  nextLevelneighbours[neighbours[i]] = pop;
              }
          }
      }
  }
  return false
}

console.log(isCycle(5, [[1], [0, 2, 4], [1, 3], [2, 4], [1, 3]] ))