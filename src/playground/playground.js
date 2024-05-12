

const findTwoElement= ( arr, n) => 
{
  let xor = 0;
  //Step 1: Find the Xor between missing and repeating. To do that Xor all element of arr with all natural numbers
  for(var i =1; i <= arr.length ; i++) {
    xor = xor ^ arr[i-1] ^ i;
  }
  //Step 2: find the closest setbit of the xor number from right
  let setbitIndex = 0
  for(var i = 0; i < 32; i++) {
    if(xor & (1 << i)){ 
      setbitIndex = i;
      break
    }
  }
  // Step3: Divide all numbers of the array and all the natural numbers from 1 to n in a left and right bucket basis the setbit value at the setBitIndex
  let left = [], right = []
  for(var i = 1; i <=arr.length; i++) {
    if(arr[i-1]&(1 << setbitIndex)) {
      right.push(arr[i-1]);
    } else {
      left.push(arr[i-1])
    }
    if(i&(1<<setbitIndex)) {
      right.push(i);
    } else {
      left.push(i)
    }
  }

  console.log(left.sort((a,b) => a-b),right.sort((a,b) => a-b))
  //Step4: Do Xor of left and right arrays (Left is 0 club and right is 1 club) we will get the missing number and repeating number
  const leftXor = left.reduce((acc, curr) => (acc ^ curr), 0);
  const rightXor = right.reduce((acc, curr) => (acc ^ curr), 0);
  console.log(leftXor, rightXor)
  // Step5: Check which one is the missing and duplicate from these two numbers
  const isDuplicate = arr.find(n => n == leftXor);
  return isDuplicate ? [leftXor, rightXor] : [rightXor, leftXor]
}

findTwoElement([1,3,3])
// findTwoElement([3,24,22,7,10,34,27,29,13,2,11,23,9,26,32,12,1,14,4,8,6,19,17,15,30,28,20,31,5,16,25,18,9,33])