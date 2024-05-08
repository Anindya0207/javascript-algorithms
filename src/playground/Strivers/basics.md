1. when in a loop we keep on diving the number, like while (n > 0).... n = n / x; then the time complexity is O(logx N)
2. Euclidean algorithm states that GCD(a,b) = GCD(a % b, b) where a > b
const findGCD = (num1, num2) => {
  if(num1 == 0) return num2;
  if(num1 > num2) return findGCD(num1 % num2, num2);
  return findGCD(num2 % num1, num1);
}
3. A subsequence is a sub-sequenece which should follow the order of the actual sequence. it can be either contiguous or non contiguous
[3,1,2] => [3] [1] [2] [3,1] [3,2] [1,2] [3,1,2] these are all possible subsequence. 
[3,2] is a non contigious subsequnce
[1,2,3] is not a subsequence becuase it doesn't follow the order.
This can be achieved by Power set also which is mentioned in 6May.md

4. To rotate a array by k we can simply do
arr1 = [...arr]
arr[i] = arr1[(i+k)%arr.length]
This is very powerful formula to rotate the array or to check if an array is rotated k times. 
To check if A and B are same array but after k rotation
A[i] = B[(i+k)%A.length]