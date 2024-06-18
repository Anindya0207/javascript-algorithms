// const celebrity = (M, n) => {
//   let map = {};
//   for (var i = 0; i < n; i++) {
//     for (var j = 0; j < n; j++) {
//       if (i == j) continue;
//       if (M[i][j] == 1 && M[j][i] != 1 ) {
//         if(map[j] == undefined) {
//             map[j] = true;
//         }
//       } else {
//         map[j] = false
//       }
//       if (map[j] == true && M[i][j] != 1) {
//         map[j] = false;
//       }
//     }
//   }
//   for(var i in map) {
//     if(map[i] == true) return i;
//   }
//   return -1
// };


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
MyStack.prototype.size = function() {
    return this.top + 1;
}
const celebrity = (M, n) => {
    if(n == 1 && M[0][0] == 0) return 0;
    const stack = new MyStack();
    for(var i = 0; i < n; i++) {
        stack.push(i);
    }
    while(stack.size() > 1) {
        const a = stack.topp();
        stack.pop();
        const b = stack.topp()
        stack.pop();
        if(M[a][b] == 1) {
            stack.push(b);
        } else {
            stack.push(a);
        }
    }
    if(stack.empty()) return -1;
    const possibleCelebrity = stack.topp();
    for(var i = 0; i < n; i++) {
        if(M[possibleCelebrity][i] != 0) {
            return -1;
        }
        if(i != possibleCelebrity &&  M[i][possibleCelebrity] != 1) {
            return -1;
        }
    }
    return possibleCelebrity
}

// const M = [[0,1,0],
// [0,0,0], 
// [0,1,0]]

// const M = [[0,1],
// [1,0]]

const M = [[0]]
console.log(celebrity(M,1))