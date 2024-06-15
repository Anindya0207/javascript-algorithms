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
MyStack.prototype.stackrank = function () {
    return this.top
  };
  
var nextGreaterElement = function (nums1, nums2) {
  let nge = {};
  let myStack = new MyStack();
  for (var i = nums2.length - 1; i >= 0; i--) {
    while (!myStack.empty() && myStack.topp() <= nums2[i]) {
      myStack.pop();
    }
    if (myStack.empty()) {
      nge[nums2[i]] = -1;
    } else {
      nge[nums2[i]] = myStack.topp();
    }
    myStack.push(nums2[i]);
  }
};

var nextGreaterElements = function (nums2) {
  let nge = [];
  let myStack = new MyStack();
  for (var k = 0; k < nums2.length - 1; k++) {
    myStack.push(nums2[k]);
  }
  for (var i = nums2.length - 1; i >= 0; i--) {
    while (!myStack.empty() && myStack.topp() <= nums2[i]) {
      myStack.pop();
    }
    if (myStack.empty()) {
      myStack.push(nums2[i]);
      nge[i] = -1;
    } else {
      nge[i] = myStack.topp();
      myStack.push(nums2[i]);
    }
  }
  return nge;
};

const count_NGEs = (arr, indices) => {
  let nge = [];
  let poppedEl = [];
  let final= [];
  let myStack = new MyStack();
  for (var i = arr.length - 1; i >= 0; i--) {
    while (!myStack.empty() && arr[i] >= myStack.topp()) {
      poppedEl.push(myStack.pop());
    }
    if (myStack.empty()) {
      nge[i] = 0;
    } else {
      nge[i] = myStack.stackrank() + 1;
    }
    myStack.push(arr[i]);
  }

  for(var k = 0; k < indices.length; k++) {
    let count = nge[indices[k]];
    count += poppedEl.filter(p => p > arr[indices[k]]).length;
    final.push(count)
  }
};


var trap = function(height) {
    let left = 0, right = height.length-1, leftMax = rightMax = 0;
    let final = 0;
    while(left <= right) {
        if(height[left] <= height[right]) {
            //check left
            if(height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                final += leftMax - height[left];
            }
            left++;
        }
        else {
            //check right
            if(height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                final += rightMax - height[right];
            }
            right--;
        }
    }
    console.log(final)
};

trap([0,1,0,2,1,0,1,3,2,1,2,1]) // 6