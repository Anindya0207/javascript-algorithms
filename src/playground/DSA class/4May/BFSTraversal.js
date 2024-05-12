const arr = [
    [0,1,0,1,0,0,0],
    [1,0,1,1,0,1,1],
    [0,1,0,1,1,1,0],
    [1,1,1,0,1,0,0],
    [0,0,1,1,0,0,1],
    [0,1,1,0,0,0,0],
    [0,1,0,0,1,0,0]
  ]
  const init = 0;
  let finalMap = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G'
  }
  let vertices = Object.keys(finalMap);
  let map = {};
  let front = -1, rear = -1;
  Array.prototype.enqueue = function(elem) {
    if(front == -1) front = 0;  
    if(rear > 0 && rear == this.length - 1)  {
        return;
      }
      this[++rear] = elem;
  }
  Array.prototype.dequeue = function() {
      if(front == -1  || front > rear) {
        return;
      }
      return this[front++];
  }
  Array.prototype.mydisplay = function() {
      for(var i = front; i <= rear; i++) {
          console.log(this[i]);
      }
  }
  Array.prototype.isEmpty = function() {
    if(front == -1  || front > rear) {
      return true;
    }
    return false;
  }
  const adjacencyMatrixGraphTraversal = (index) => {
    const newQ = new Array(vertices.length);
    newQ.enqueue(vertices[index]);
    map[vertices[index]] = true
    while(!newQ.isEmpty()) {
      const deque = newQ.dequeue();
      console.log(finalMap[deque]);
      for(var i = 0; i < arr[deque].length; i++) {
        const node = arr[deque][i];
        if(node == 1 && !map[i]) {
          newQ.enqueue(vertices[i]);
          map[vertices[i]] = true
        }
      }
    }
  };
  
  const playground = () => {
    console.log("Adj Matrix traversal");
    adjacencyMatrixGraphTraversal(init);
    map = {}
  }
  playground();