
class Node {
    constructor(_data, _next) {
      this.data = _data;
      this.next = _next;
    }
  }
  
  class SLinkedList {
    constructor() {
      this.head = null;
      this.createNode = (data) => {
        const node = new Node(data, null);
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
      pivot.next = node;
    }
    insertAfterNode = (data, currentNode) => {
      let node = this.createNode(data);
      if(this.head == null) {
        this.head = node;
        return;
      }
      let pivot = this.head;
      while(pivot.next != null) {
        if(pivot.data == currentNode){
          const afterNode = pivot.next;
          node.next = afterNode;
          pivot.next = node;
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
      let previous = this.head;
      while(pivot.next != null) {
        previous = pivot;
        pivot = pivot.next;
      }
      console.log("Deleted", pivot.data);
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
    }
  }