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
  constructor(_data, _left, _right) {
    this.data = _data;
    this.left = _left;
    this.right = _right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.createNode = (data) => {
      const node = new Node(data, null, null);
      return node;
    }
  }
  insertWithLoop = (data) => {
    const node = this.createNode(data);
    if(this.root == null) {
      this.root = node;
    } else {
      let pivot = this.root;
      while (pivot != null) {
        if(data > pivot.data) {
          if(!pivot.right) {
            pivot.right = node; break;
          } else {
            pivot = pivot.right;
          }
        } else {
          if(!pivot.left) {
            pivot.left = node; break;
          } else {
            pivot = pivot.left;
          }
        }
      }
     
    }
  }
  insert = (data) => {
    const node = this.createNode(data);
    const _insert = (pivot) => {
      if(!pivot) {
        return node;
      }
      if(data > pivot.data) {
        pivot.right = _insert(pivot.right);
      } else if(data < pivot.data) {
        pivot.left = _insert(pivot.left);
      }
      return pivot;
    }
    if(this.root == null) {
      this.root = node;
    } else {
      _insert(this.root);
    }
  }
  display = () => {
    const _display = (pivot) => {
      if(!pivot) {
        return;
      }
      _display(pivot.left);
      console.log(pivot.data);
      _display(pivot.right);
    }
    if(this.root == null) {
      console.log("Tree is empty bye bye");
      return;
    } else {
      _display(this.root);
    }
  }
} 

const bst = new BinarySearchTree();

bst.insert(20);
bst.insert(64);
bst.insert(58);
bst.insert(89);
bst.insert(8);
bst.insert(91);
bst.insert(11);
bst.insert(90);
console.log(bst);
