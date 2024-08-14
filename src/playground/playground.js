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


var orangesRotting = function (grid) {
  let visitedMap = {};
  let maxTime = 0
  let queue = new MyQueuee();
  let freshOranges = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 2) {
        queue.enqueue([i, j, 0]);
      }
      if (grid[i][j] == 1) {
        freshOranges++;
      }
    }
  }
  while (!queue.empty()) {   
    let pop = queue.dequeue();
    if (pop) {
      let [u, v, time] =  pop;
      visitedMap[`${u}${v}`] = true;
      if (grid[u + 1] && grid[u + 1][v] == 1 && !visitedMap[`${u + 1}${v}`]) {
        grid[u + 1][v] = 2;
        freshOranges--;
        queue.enqueue([u + 1, v, time+1]);
      }
      if (grid[u - 1]&& grid[u - 1][v] == 1 && !visitedMap[`${u - 1}${v}`]) {
        grid[u - 1][v] = 2;
        freshOranges--;
        queue.enqueue([u - 1, v, time+1]);
      }
      if (grid[u][v + 1] == 1 && !visitedMap[`${u}${v + 1}`]) {
        grid[u][v + 1] = 2;
        freshOranges--;
        queue.enqueue([u, v + 1, time+1]);
      }
      if (grid[u][v - 1] == 1 && !visitedMap[`${u}${v - 1}`]) {
        grid[u][v - 1] = 2;
        freshOranges--;
        queue.enqueue([u, v - 1, time+1]);
      }
      maxTime = Math.max(time, maxTime)
    }
   
  }
  if(freshOranges > 0) return -1
  return maxTime;
};

console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 1],
    [0, 1, 2],
  ])
);
