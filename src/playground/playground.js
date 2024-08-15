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
MyQueuee.prototype.empty = function () {
  return this.front == -1 || this.rear == -1 || this.front > this.rear;
};
var solve = function (board) {
  if(!board.length) return;
  const ROW = board.length;
  const COL = board[0].length
  const _traverse = (i, j) => {
    if (!board[i] || (board[i] && board[i][j] == undefined)) return;
    if (board[i][j] == 'X') return;
    board[i][j] = 'TEMP';
    _traverse(i - 1, j);
    _traverse(i + 1, j);
    _traverse(i, j + 1);
    _traverse(i, j - 1);
  };
  let boundaryOs = [];

  for (let i = 0; i < ROW; i++) {
    if (board[i][0] == 'O') {
      boundaryOs.push([i, 0]);
    }
    if (board[i][COL - 1] == 'O') {
      boundaryOs.push([i, COL - 1]);
    }
  }
  for (let i = 1; i < COL - 1; i++) {
    if (board[0][i] == 'O') {
      boundaryOs.push([0, i]);
    }
    if (board[ROW- 1][i] == 'O') {
      boundaryOs.push([board.length - 1, i]);
    }
  }
  for (let b = 0; b < boundaryOs.length; b++) {
    _traverse(boundaryOs[b][0], boundaryOs[b][1]);
  }
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      if (board[i][j] == 'TEMP') {
        board[i][j] = 'O';
      } else if (board[i][j] == 'O') {
        board[i][j] = 'X';
      }
    }
  }
  return board;
};
console.log(
  solve([
    ['X', 'O', 'X', 'O', 'X', 'O'],
    ['O', 'X', 'O', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'O', 'X', 'O'],
    ['O', 'X', 'O', 'X', 'O', 'X'],
  ])
);
