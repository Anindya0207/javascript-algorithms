// var canJump = function(nums) {
//   debugger;
//   let i = nums.length - 1;
//   while(i >= 0) {
//     let j = i-1, canJump = false;
//     while(j >= 0) {
//       let jump = nums[j] + j;
//       if(jump >= i) {
//         canJump = true;
//         i = j; break;
//       }
//       j--;
//     }
//     if(canJump && i == 0) {
//       return true;
//     }
//     if(!canJump) {
//       return false;
//     }
//   }
// };

var canJump = function(nums) {
  let maxJump = -Infinity;
  if(nums.length == 1) return true;
  for(var i = 0; i < nums.length; i++) {
      let jump = nums[i] + i;
      if(maxJump != -Infinity && i > maxJump) {
          return false;
      } else {
          maxJump = Math.max(maxJump, jump);
      }
      if(maxJump >= nums.length -1) return true
  }
}
console.log(canJump([2,3,1,1,4]))