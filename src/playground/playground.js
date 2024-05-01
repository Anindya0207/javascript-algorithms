  
  var playground = function() {
    let front = -1, rear = -1;
      Array.prototype.enqueue = function(elem) {
        if(front - 1) front = 0;  
        if(rear == this.length - 1)  {
            console.log('no element');
            return;
          }
          this[++rear] = elem;
      }
      Array.prototype.dequeue = function() {
          if(front == -1 || front > rear) {
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
  