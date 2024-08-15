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


var updateMatrix = function(mat) {
  let final = Array.from({length: mat.length}, () => Array.from({length: mat[0].length}, () => 0));
  let visitedMap = {};
  let queue = new MyQueuee();
  for(let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[i].length; j++) {
          if(mat[i][j] == 0) {
              queue.enqueue([i, j, 0]);
              visitedMap[`${i},${j}`] = true
          }
      }
  }
  while(!queue.empty()) {
      const [i, j, dist] = queue.dequeue();
      final[i][j] = dist;
      if(mat[i-1] && mat[i-1][j] == 1 && !visitedMap[`${i-1},${j}`]){
          queue.enqueue([i-1, j, dist+1]);
          visitedMap[`${i-1},${j}`] = true
      }
      if(mat[i+1] && mat[i+1][j] == 1 && !visitedMap[`${i+1},${j}`]){
          queue.enqueue([i+1, j, dist+1]);
          visitedMap[`${i+1},${j}`] = true
      }
      if(mat[i][j-1] == 1 && !visitedMap[`${i},${j-1}`]){
          queue.enqueue([i, j-1, dist+1]);
          visitedMap[`${i},${j-1}`] = true
      }
      if(mat[i][j+1] == 1 && !visitedMap[`${i},${j+1}`]){
          queue.enqueue([i, j+1, dist+1]);
          visitedMap[`${i},${j+1}`] = true
      }
  }
  return final
};
console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]))