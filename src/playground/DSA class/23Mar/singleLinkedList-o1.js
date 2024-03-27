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
  
  
  class Node {
    constructor(_data, _next) {
      this.data = _data;
      this.next = _next;
    }
  }
  
  class SLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.createNode = (data) => {
        const node = new Node(data, null);
        return node;
      }
    }
    display = () => {
      if(this.head == null && this.tail == null) {
        console.log("List empty bye bye");
        return;
      }
      let pivot = this.head;
      while(pivot != null) {
        console.log(pivot.data);
        pivot = pivot.next;
      }
    }
    insertAtBeg = (data) => {
      const node = this.createNode(data);
      if(this.head == null && this.tail == null) {
        this.tail = node;
        this.head = node;
        return;
      }
      node.next = this.head;
      this.head = node;
    }
    insertAtEnd = (data) => {
      const node = this.createNode(data);
      if(this.head == null && this.tail == null) {
        this.tail = node;
        this.head = node;
        return;
      }
      this.tail.next = node;
      this.tail = node;
    }
    insertAfterNode = (data, currentNode) => {
      let node = this.createNode(data);
      if(this.head == null && this.tail == null) {
        this.tail = node;
        this.head = node;
        return;
      }
      if(this.tail.data == currentNode) {
        this.tail.next = node;
        this.tail = node;
        return;
      }
      let pivot = this.head;
      while(pivot != null) {
        if(pivot.data == currentNode){
          const afterNode = pivot.next;
          node.next = afterNode;
          pivot.next = node;
          break;
        }
        pivot= pivot.next;
      }
    }
    insertBeforeNode = (data, currentNode) => {
      let node = this.createNode(data);
      if(this.head == null && this.tail == null) {
        this.tail = node;
        this.head = node;
        return;
      }
      if(this.head.data == currentNode) {
        const currentHead = this.head;
        node.next = {...currentHead };
        this.head = node;
        return;
      }
      let pivot = this.head;
      let previous = this.head;
      while(pivot != null) {
        if(pivot.data == currentNode){
          node.next = pivot;
          previous.next = node;
          break;
        }
        previous = pivot;
        pivot= pivot.next;
      }
    }
    deleteFromBeg = () => {
      if(this.head == null && this.tail == null) {
        console.log("List is empty bye bye");
        return;
      }
      console.log("Deleted", this.head.data);
      this.head = this.head.next;
    }
    deleteFromEnd = () => {
      if(this.head == null && this.tail == null) {
        console.log("List is empty bye bye");
        return;
      }
      if(this.head.next == null && this.tail.next == null) {
        console.log("Deleted", this.head.data);
        this.head = null;
        this.tail = null;
        return;
      }
      let pivot = this.head;
      let previous = this.head;
      while(pivot.next != null) {
        previous = pivot;
        pivot = pivot.next;
      }
      console.log("Deleted", pivot.data);
      previous.next = null;
      this.tail = previous;
    }
    deleteNode = (data) => {
      if(this.head == null&& this.tail == null) {
        console.log("List is empty bye bye");
        return;
      }
      if(this.head.data == data) {
        console.log("Deleted", this.head.data);
        this.head = this.head.next;
        return;
      }
      let pivot = this.head;
      let previous = this.head;
      while(pivot != null) {
        if(pivot.data == data){
          console.log("Deleted", pivot.data);
          previous.next = pivot.next;
          break;
        }
        previous = pivot;
        pivot = pivot.next;
      }
      this.tail = previous;
    }
  }
  var playground = function() {
    
  };
  
  
  playground();
  