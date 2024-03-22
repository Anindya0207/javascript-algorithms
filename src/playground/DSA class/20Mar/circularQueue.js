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
      if((front == 0 && rear == this.length - 1) || (front > 0 && front == rear + 1))  {
          console.log('no space');
          return;
        }
        if(rear == this.length - 1 && front > 0) {
          rear = -1;
        }
        this[++rear] = elem;
        console.log(front, rear);
    }
    Array.prototype.dequeue = function() {
        if(front == -1 && rear == -1) {
          console.log('no element');
          return;
        }
        const retel = this[front];
        if(front == rear) {
          front = -1;
          rear = -1;
        }
        else if(front == this.length - 1){ 
          front = 0;
        } else {
          front++;
        }
        console.log(front, rear);
        return retel;
    }
    Array.prototype.mydisplay = function() {
        if(front == -1 && rear == -1) {
          console.log('no element');
          return;
        }
        if(front <= rear) {
          for(let i= front; i<=rear;i++) {
            console.log(this[i]);
          }
        } else {
          for(let i = rear + 1; i < this.length ; i++) {
            console.log(this[i]);
          }
          for( let j = 0; j<front; j++) {
            console.log(this[j]);
          }
        }
    }
};
playground();
