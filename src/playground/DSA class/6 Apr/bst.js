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
    constructor(_data, _left, _right, _height) {
      this.data = _data;
      this.left = _left;
      this.right = _right;
      this.height = _height;
      this.bf = _bf;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
      this.createNode = (data) => {
        const node = new Node(data, null, null, 1, 0);
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
        pivot.height = Math.max(pivot.left?.height || 0 , pivot.right?.height || 0) + 1;
        pivot.bf = (pivot.left?.right || 0) - (pivot.right?.right || 0)
        return pivot;
      }
      if(this.root == null) {
        this.root = node;
      } else {
        _insert(this.root);
      }
    }
    displayInorder = () => {
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
    displayInorderDesc = () => {
      const _display = (pivot) => {
        if(!pivot) {
          return;
        }
        _display(pivot.right);
        console.log(pivot.data);
        _display(pivot.left);
      }
      if(this.root == null) {
        console.log("Tree is empty bye bye");
        return;
      } else {
        _display(this.root);
      }
    }
    displayPreorder = () => {
      const _display = (pivot) => {
        if(!pivot) {
          return;
        }
        console.log(pivot.data);
        _display(pivot.left);
        _display(pivot.right);
      }
      if(this.root == null) {
        console.log("Tree is empty bye bye");
        return;
      } else {
        _display(this.root);
      }
    }
    displayPostOrder = () => {
      const _display = (pivot) => {
        if(!pivot) {
          return;
        }
        _display(pivot.left);
        _display(pivot.right);
        console.log(pivot.data);
      }
      if(this.root == null) {
        console.log("Tree is empty bye bye");
        return;
      } else {
        _display(this.root);
      }
    }
    search = (data) => {
      const _search = (pivot) => {
        if(!pivot) return null;
        if(pivot.data == data) {
          return pivot;
        }
        if(data > pivot.data) {
          return _search(pivot.right);
        } else if(data < pivot.data) {
          return _search(pivot.left);
        }
        return null;
      }
      if(this.root == null) {
        console.log("Tree is empty. bye bye")
      } else {
        console.log(_search(this.root));
      }
    }
    delete = (data) => {
      const _find = (pivot) => {
        if(!pivot.left) return pivot;
        return _find(pivot.left);
      }
      const _deleteDuplicate = (pivot, element) => {
        if(pivot.left == element) {
          pivot.left = element.right;
          return pivot;
        }
        return _deleteDuplicate(pivot.left, element);
      }
      const _delete = (pivot) => {
        if(!pivot) return null;
        if(pivot.data == data) {
          if(!pivot.right && !pivot.left) {
            return null;
          }
          if(pivot.right && !pivot.left) {
            return pivot.right;
          }
          if(pivot.left && !pivot.right) {
            return pivot.left;
          }
          if(pivot.left && pivot.right) {
            let _currentLeft = pivot.left;
            let _currentRight = pivot.right;
            let _leftMostChild = _find(pivot.right);
            if(_leftMostChild != _currentRight) {
              _currentRight = _deleteDuplicate(_currentRight, _leftMostChild);
              _leftMostChild.right = _currentRight;
            }
            _leftMostChild.left = _currentLeft;
            return _leftMostChild;
          }
        }
        if(data > pivot.data) {
          pivot.right = _delete(pivot.right);
        }
        else if(data < pivot.data) {
          pivot.left = _delete(pivot.left);
        }
        return pivot;
      };
      if(this.root == null) {
        console.log("Tree is empty. bye bye")
        return;
      }
      this.root = _delete(this.root);
      console.log(this.root);
    }
    findClosest = (data) => {
      const map = {}, minDiff = 9999999999;
      const _find = (pivot) => {
        if(!pivot) {
          return map[minDiff];
        }
        if(pivot.data == data) {
          return pivot;
        } else {
          diff = Math.abs(pivot.data - data);
          minDiff = Math.min(diff, minDiff);
          map[diff] = pivot;
          if(data > pivot.data) {
            return _find(pivot.right);
          } else if(data < pivot.data) {
            return _find(pivot.left);
          }
        }
      }
      if(this.root == null) {
        return null;
      } else {
        _find(this.root);
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
  bst.insert(70);
  bst.insert(71);
  
  console.log(bst);
  