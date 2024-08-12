function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var bstFromPreorder = function (preorder) {
  let root = null;
  const _build = (arr) => {
    if (!arr.length) return;
    let left = [],
      right = [];
    let pivot = new TreeNode(arr[0]);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[0]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    pivot.left = _build(left);
    pivot.right = _build(right);
    return pivot;
  };
  root = _build(preorder);
  return root;
};

console.log(bstFromPreorder([8, 5, 1, 7, 10, 12]));
