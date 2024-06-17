function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function generateUniqueRandomArray(length, min, max) {
    const uniqueNumbers = Array.from({ length }, (_, index) => index + min);
    shuffleArray(uniqueNumbers);
    return uniqueNumbers.slice(0, length);
  }
  
  const minNumber = 1;
  const maxNumber = 100;
  const arrayLength =20000;
  
  let randomArray = generateUniqueRandomArray(arrayLength, minNumber, maxNumber);
  
  
  var playground = function() {
    let top = -1;
    let len = 10;
    Array.prototype.mypush = function(elem) {
        if(top == len-1) return;
        this[++top] = elem;
    }
    Array.prototype.mypop = function() {
        if(top == -1) return;
        return this[top--];
    }
    Array.prototype.mydisplay = function() {
        for(var i = top; i>=0; i--) {
            console.log(this[i]);
        }
    }
  };
  playground();
  

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