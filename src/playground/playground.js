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

MyQueuee.prototype.empty = function () {
  return this.front == -1 || this.rear == -1;
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

var deserialize = function (levelArr) {
  console.log('here', levelArr);
  let i = 0;
  let queue = new MyQueuee();
  let root = new TreeNode(levelArr[0]);
  queue.enqueue(root);
  while (!queue.empty() && i < levelArr.length) {
    const node = queue.dequeue();
    i++;
    if (levelArr[i]&& levelArr[i] != '#') {
      let leftNode = new TreeNode(levelArr[i]);
      node.left = leftNode;
      queue.enqueue(leftNode);
    }
    i++;
    if (levelArr[i]&& levelArr[i] != '#') {
      let rightNode = new TreeNode(levelArr[i]);
      node.right = rightNode;
      queue.enqueue(rightNode);
    }
  }
  return root;
};

console.log(
  deserialize(['1', '2', '3', '#', '#', '4', '5', '#', '#', '#', '#'])
);
