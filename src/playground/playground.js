//Stack
var MyStack  = function() {
  this.top = -1;
  this.arr = [];
}

MyStack.prototype.push = function(elem) {
  this.arr[++this.top] = elem;
}
MyStack.prototype.pop = function() {
  if(this.top == -1) return;
  return this.arr[this.top--];
}
MyStack.prototype.topp = function() {
  if(this.top == -1) return;
  return this.arr[this.top];
}
MyStack.prototype.empty = function() {
  return this.top == -1;
}

var checkValidString = function(s) {
  const parenthesisStack = new MyStack();
  const starStack = new MyStack();
  for(var i = 0; i < s.length; i++) {
    const curr = s.charAt(i);
    if(curr == '(') {
      parenthesisStack.push(i);
    } else if(curr == ')') {
      if(!parenthesisStack.empty()) {
        parenthesisStack.pop();
      } else if(!starStack.empty()) {
        starStack.pop();
      }
      else {
        return false
      }
    } else {
      starStack.push(i);
    }
  }
  while(!parenthesisStack.empty()) {
    if(starStack.empty()) return false;
    if(starStack.topp() < parenthesisStack.topp()) return false;
    starStack.pop();
    parenthesisStack.pop();
  }
  return true;
};

console.log(checkValidString('(((((()*)(*)*))())())(()())())))((**)))))(()())()'))