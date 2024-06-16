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
        while(!myStack.empty() &&  nums[i] >= nums[myStack.topp()]) {
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
    let nse = new Array(nums.length).fill(nums.length)
    let myStack = new MyStack();
    for(var i = nums.length - 1; i >=0 ; i--) {
        while(!myStack.empty() &&  nums[i] <= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            nse[i] = myStack.topp();
        }
        myStack.push(i)
    } 
    return nse
};

var previousSmallerElementIndex = function(nums) {
    let pse = new Array(nums.length).fill(-1)
    let myStack = new MyStack();
    for(var i = 0; i < nums.length ; i++) {
        while(!myStack.empty() &&  nums[i] <= nums[myStack.topp()]) {
            myStack.pop();
        }
        if(!myStack.empty()) {
            pse[i] = myStack.topp();
        }
        myStack.push(i)
    } 
    return pse
};

var sumSubarrayMins = function(arr) {
    const pse = previousSmallerElementIndex(arr);
    const nse = nextSmallerElementIndex(arr);
    console.log(pse, nse)
    let final = 0;
    for(var i  = 0; i<arr.length; i++) {
        const leftSubarrayCountWhereArrIisMinimum = i - pse[i];
        const rightSubarrayCountWhereArrIisMinimum = nse[i] - i;
        const totalSubArrayCombinationsPossibleWhereArrIisMinimum = leftSubarrayCountWhereArrIisMinimum * rightSubarrayCountWhereArrIisMinimum;
        const totalContributionOfArrIWhileBeingMinimum = arr[i] * totalSubArrayCombinationsPossibleWhereArrIisMinimum;
        final +=totalContributionOfArrIWhileBeingMinimum
    }
    return final
};

console.log(sumSubarrayMins([3,1,2,4]))

// console.log("NGE" , nextGreaterElementIndex([2,1,5,6,2,3,1]))
// console.log("PGE" , previousGreaterElementIndex([2,1,5,6,2,3,1]))
// console.log("NSE" , nextSmallerElementIndex([2,1,5,6,2,3,1]))
// console.log("PSE" , previousSmallerElementIndex([2,1,5,6,2,3,1]))
