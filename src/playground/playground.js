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


const findOrder = (dict,N,K) => {
  let l = 0, r = 1;
  let adj = {};
  let uniqueW = {}
  let indegree = {};
  let queue = new MyQueuee();
  let final = []
  while(r < dict.length) {
      let leftWord = dict[l];
      let rightWord = dict[r];
      let i = 0, j = 0;
      while(i < leftWord.length && j < rightWord.length) {
        if(leftWord.charAt(i) == rightWord.charAt(j)) {
            i++; j++
        } else {
            if(!adj[leftWord.charAt(i)]) {
              adj[leftWord.charAt(i)] = [];
            }
            adj[leftWord.charAt(i)].push(rightWord.charAt(j))
            uniqueW[rightWord.charAt(j)] = true;
            uniqueW[leftWord.charAt(i)] = true
            break;
        }
      }
      l++; r++;
  }
  return adj;
  let alphabets = Object.keys(uniqueW);
  for(let i = 0; i<alphabets.length; i++) {
    let neighbours = adj[alphabets[i]] || [];
    for(let j = 0; j<neighbours.length; j++) {
        if(indegree[neighbours[j]] == undefined) indegree[neighbours[j]] = 0 
        indegree[neighbours[j]]++;
    }
  }
  for(let i =0; i< alphabets.length;i++) {
    if(!indegree[alphabets[i]]) {
        queue.enqueue(alphabets[i]);
    }
  }
  while(!queue.empty()) {
    let pop = queue.dequeue();
    final.push(pop);
    let neighbours = adj[pop] || [];
    for(let i = 0; i <neighbours.length;i++) {
        indegree[neighbours[i]]--;
        if(indegree[neighbours[i]] == 0) {
            queue.enqueue(neighbours[i]);
        }
    }
  }
  return final
}


console.log(findOrder(["baa","abcd","abca","cab","cad"],5,4))