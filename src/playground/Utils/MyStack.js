var MyStack = function () {
  this.top = -1;
  this.arr = [];
};

MyStack.prototype.push = function (elem) {
  this.arr[++this.top] = elem;
};
MyStack.prototype.pop = function () {
  if (this.top == -1) return;
  return this.arr[this.top--];
};
MyStack.prototype.topp = function () {
  if (this.top == -1) return;
  return this.arr[this.top];
};
MyStack.prototype.empty = function () {
  return this.top == -1;
};
