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
  constructor(_data, _prev, _next) {
    this.data = _data;
    this.prev = _prev;
    this.next = _next;
  }
}

class DLinkedList {
  constructor() {
    this.head = null;
    this.createNode = (data) => {
      const node = new Node(data, null, null);
      return node;
    }
  }
  display = () => {
    if(this.head == null) {
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
    if(this.head == null) {
      this.head = node;
    } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }
  }
  insertAtEnd = (data) => {
    const node = this.createNode(data);
    if(this.head == null) {
      this.head = node;
      return;
    }
    let pivot = this.head;
    while(pivot.next != null) {
      pivot = pivot.next;
    }
    node.prev = pivot;
    pivot.next = node;
  }
  insertAfterNode = (data, currentNode) => {
    let node = this.createNode(data);
    if(this.head == null) {
      this.head = node;
      return;
    }
    let pivot = this.head;
    while(pivot != null) {
      if(pivot.data == currentNode){
        const afterNode = pivot.next;
        if(afterNode) afterNode.prev = node;
        node.next = afterNode;
        node.prev = pivot;
        pivot.next = node;
        break;
      }
      pivot= pivot.next;
    }
  }
  insertBeforeNode = (data, currentNode) => {
    let node = this.createNode(data);
    if(this.head == null) {
      this.head = node;
      return;
    }
    if(this.head.data == currentNode) {
      const currentHead = this.head;
      node.next = {...currentHead, prev: node};
      this.head = node;
      return;
    }
    let pivot = this.head;
    while(pivot != null) {
      if(pivot.data == currentNode){
        const beforeNode = pivot.prev;
        node.prev= beforeNode;
        node.next = pivot;
        if(beforeNode) beforeNode.next = node;
        pivot.prev = node;
        break;
      }
      pivot= pivot.next;
    }
  }
  deleteFromBeg = () => {
    if(this.head == null) {
      console.log("List is empty bye bye");
      return;
    }
    console.log("Deleted", this.head.data);
    this.head = this.head.next;
    this.head.prev = null;
  }
  deleteFromEnd = () => {
    if(this.head == null) {
      console.log("List is empty bye bye");
      return;
    }
    if(this.head.next == null) {
      console.log("Deleted", this.head.data);
      this.head = null;
      return;
    }
    let pivot = this.head;
    while(pivot.next != null) {
      pivot = pivot.next;
    }
    console.log("Deleted", pivot.data);
    let previous = pivot.prev; 
    previous.next = null;
  }
  deleteNode = (data) => {
    if(this.head == null) {
      console.log("List is empty bye bye");
      return;
    }
    if(this.head.data == data) {
      console.log("Deleted", this.head.data);
      this.head = this.head.next;
      return;
    }
    let pivot = this.head;
    while(pivot != null) {
      let previous = pivot.prev;
      let next = pivot.next;
      if(pivot.data == data){
        console.log("Deleted", pivot.data);
        previous.next = pivot.next;
        if(next) next.prev = previous;
        break;
      }
      pivot = pivot.next;
    }
  }
  reverse = () => {
    if(this.head == null) {
      console.log("List is empty bye bye");
      return;
    }
    let pivot = this.head;
    let previous = null
    while(pivot != null) {
      let next = pivot.next;
      previous = pivot.prev;
      pivot.next = previous;
      pivot.prev = next;
      pivot = next;
    }
    this.head = previous.prev;
  }
}
var playground = function() {
  
};


playground();
