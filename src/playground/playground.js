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


const shortestPath = (edges, n, m, src) => {
  let final = Array.from({length: n}, () => Infinity);
  let adj = Array.from({length: n}, () => new Array())
  let queue = new MyQueuee();
  for(let i = 0; i < edges.length; i++) {
    let [u, v] = edges[i];
    adj[u].push(v);
    adj[v].push(u)
  }
  queue.enqueue([src, 0]);
  final[0] = 0;
  while(!queue.empty()) {
    let [node, dist] = queue.dequeue();
    let neighbours = adj[node];
    for(let i =0; i<neighbours.length; i++) {
      if(dist + 1 < final[neighbours[i]]) {
        final[neighbours[i]] = dist + 1;
        queue.enqueue([neighbours[i], dist + 1]);
      }
    }
  }
  return final
}

console.log(shortestPath([[0,1],[0,3],[3,4],[4,5],[5,6],[1,2],[2,6],[6,7],[7,8],[6,8]], 9, 10, 0))