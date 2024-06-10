var MyStack  = function() {
    this.top = -1;
    this.arr = [];
}

const precedenceMap = {
    '^' : 2,
    "*" : 1,
    "/" : 1,
    "+" : 0,
    "-" : 0
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

const postFixtoInfix = (s)  => {
    let final = "";
    const myStack = new MyStack();
    for(var i = 0; i< s.length; i++) {
        const char = s.charAt(i);
        if(['+', '-', "*", "/", "^"].includes(char)) {
           const s1 = myStack.pop();
           const s2 = myStack.pop();
           myStack.push(`(${s2}${char}${s1})`);
        }
        else {
            myStack.push(char);
        }
    }
    final = myStack.pop();
    return final;
}

console.log(postFixtoInfix("ABC/-AK/L-*"))
