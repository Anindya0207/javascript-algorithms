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


var nextGreaterElementIndex = function(nums) {
    let nge = new Array(nums.length).fill(nums.length)
    let myStack = new MyStack();
    for(var i = nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() &&  nums[i] > nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            nge[i] = myStack.topp();
        }
        myStack.push(i)
    } 
    return nge
};

var previousGreaterElementIndex = function(nums) {
    let pge = new Array(nums.length).fill(-1)
    let myStack = new MyStack();
    for(var i = 0; i < nums.length ; i++) {
        while(!myStack.empty() &&  nums[i] >= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            pge[i] = myStack.topp();
        }
        myStack.push(i)
    } 
    return pge
};

var nextSmallerElementIndex = function(nums) {
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

var previousSmallerElementIndex = function(nums) {
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


var largestRectangleArea = function(heights) {
    const pse = previousSmallerElementIndex(heights);
    const nse = nextSmallerElementIndex(heights);
    let final = -Infinity
    for(var i  = 0; i <heights.length; i++) {
        const curr = heights[i];
        const leftWidthWhereImin = i - pse[i];
        const rightWidthWhereIMin = nse[i] - i;
        const totalWidthwhereImin = leftWidthWhereImin + rightWidthWhereIMin + 1;
        const totalAreaWhereIMin = totalWidthwhereImin * curr;
        final = Math.max(final, totalAreaWhereIMin);
    }
    return final;
};

var maximalRectangle = function(matrix) {
    const histo = new Array(matrix.length);
    histo[0] = matrix[0].map(n => Number(n));
    for(var i = 1; i < matrix.length; i++) {
        histo[i] = []
        for(var j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] == 1) {
                histo[i][j]= histo[i-1][j] + Number(matrix[i][j]);
            } else {
                histo[i][j]= 0
            }
        }
    }
    let final = -Infinity;
    for(var h = 0; h < histo.length; h++) {
        final = Math.max(final, largestRectangleArea(histo[h]))
    }
    return final;
};

console.log(maximalRectangle([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]))
