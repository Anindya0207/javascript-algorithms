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
    let front = -1, rear = -1;
      Array.prototype.enqueue = function(elem) {
        if(front == -1) front = 0;  
        if(rear > 0 && rear == this.length - 1)  {
            console.log('no element');
            return;
          }
          this[++rear] = elem;
      }
      Array.prototype.dequeue = function() {
          if(front == -1  || front > rear) {
            console.log('no element');
            return;
          }
          return this[front++];
      }
      Array.prototype.mydisplay = function() {
          for(var i = front; i <= rear; i++) {
              console.log(this[i]);
          }
      }
  };
  playground();
  

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