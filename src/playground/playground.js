// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val, left, right) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.left = (left===undefined ? null : left)
//  *     this.right = (right===undefined ? null : right)
//  * }
//  */
// /**
//  * @param {number[]} preorder
//  * @param {number[]} inorder
//  * @return {TreeNode}
//  */
// function TreeNode(val, left, right) {
//          this.val = (val===undefined ? 0 : val)
//          this.left = (left===undefined ? null : left)
//          this.right = (right===undefined ? null : right)
// }
// var buildTree = function(preorder, inorder) {
//     debugger
//     const _build = (_preorder, _inorder) => {
//         if(!_preorder.length && !_inorder.length) return null;
//         let pivot = new TreeNode(_preorder[0], null, null);
//         let [left, right] = _split(_inorder, _preorder[0]);
//         let preLeft = _preorder.slice(1, left.length + 1)
//         let preRight = _preorder.slice(left.length + 1)
//         pivot.left = _build(preLeft,left );
//         pivot.right = _build(preRight, right);
//         return pivot;
//     }
    
//     const _split = (_inorder, elem) => {
//         let left = [];
//         let i = 0
//         for(; i < _inorder.length; i++) {
//             if(_inorder[i] == elem) {
//                 i++;
//                 break
//             } else {
//                 left.push(_inorder[i]);
//             }
//         }
//         let right = [];
//         while(i< _inorder.length) {
//             right.push(_inorder[i]);
//             i++;
//         }
//         return [left, right];
//     }
//     return _build(preorder, inorder)
// };

// console.log(buildTree([3,9,20,15,7], [9,3,15,20,7]))


function TreeNode(val, left, right) {
             this.val = (val===undefined ? 0 : val)
             this.left = (left===undefined ? null : left)
             this.right = (right===undefined ? null : right)
    }
var buildTree = function(inorder, postorder) {
    const _build = (_postorder, _inorder) => {
        if(!_postorder.length && !_inorder.length) return null;
        let pivot = new TreeNode(_postorder[_postorder.length - 1], null, null);
        let [left, right] = _split(_inorder, _postorder[_postorder.length - 1]);
        let postLeft = _postorder.slice(0, left.length);
        let postRight = _postorder.slice(left.length, _postorder.length -1)
        pivot.left = _build(postLeft,left );
        pivot.right = _build(postRight, right);
        return pivot;
    }
    
    const _split = (_inorder, elem) => {
        let left = [];
        let i = 0
        for(; i < _inorder.length; i++) {
            if(_inorder[i] == elem) {
                i++;
                break
            } else {
                left.push(_inorder[i]);
            }
        }
        let right = [];
        while(i< _inorder.length) {
            right.push(_inorder[i]);
            i++;
        }
        return [left, right];
    }
    return _build(postorder, inorder)
};

console.log(buildTree([9,3,15,20,7],[9,15,7,20,3]))