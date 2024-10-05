
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


var getNSE = function(nums) {
    let nse = new Array(nums.length).fill(nums.length - 1)
    let myStack = new MyStack();
    for(var i = nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() &&  nums[i] <= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            nse[i] = myStack.topp() - 1;
        }
        myStack.push(i)
    } 
    return nse
};
var getPSE = function(nums) {
    let pse = new Array(nums.length).fill(0)
    let myStack = new MyStack();
    for(var i = 0; i < nums.length ; i++) {
        while(!myStack.empty() &&  nums[i] <= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            pse[i] = myStack.topp() + 1;
        }
        myStack.push(i)
    } 
    return pse
};
var maximalRectangle = function(matrix) {
    const getMaxFromHisto = (_arr) => {
        let pse = getPSE(_arr);
        let nse = getNSE(_arr);
        let final = -Infinity;
        for(let i  = 0; i < _arr.length; i++) {
            let leftWidth = i - pse[i];
            let rightWidth = nse[i]-i;
            let totalWidth = leftWidth + rightWidth + 1;
            area = totalWidth * _arr[i];
            final = Math.max(final, area);
        }
        return final
    }
    let n = matrix.length;
    let m = matrix[0].length;
    let histo = Array.from({length:n}, () => Array.from({length: m}, () => 0));
    histo[0] = matrix[0].map(r => Number(r));
    for(let i = 1; i < n; i++) {
        for(let j = 0; j < m; j++) {
            histo[i][j] = matrix[i][j] == 1 ? histo[i-1][j] + Number(matrix[i][j]) : 0;
        }
    }
    let ans = -Infinity;
    for(let i = 0; i < histo.length; i++) {
        const histoRow = histo[i];
        let blabla =  getMaxFromHisto(histoRow);
        ans = Math.max(ans, blabla);
    }
    return ans;
};


console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]))

const obsubmit = (e) => {
    const data = new FormData(e.target);
    e.preventDefault();
};