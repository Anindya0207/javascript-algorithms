# Main formulas

2 ^ i = 1 << i
to find setbit at i => num & (1 << i) == 1
to set bit at i => num = num | (1 << i)
XOR => n ^ 0 = n ; n ^ n =0
For any number n = 2 ^ x => n & n-1 = 0
to count set bits => do n = n & n-1 till n > 0 and simply count++;
n * ( a1 ^ a2 ^ a3) = (n * a1) ^ (n * a2) ^ (n * a3)
for Sum of XORs in a array sum = sum + (2 ^ i) * (setcount * unsetcount)
(a1 & a3) ^ (a1 & a4) ^ (a2 & a3) ^ (a2 & a4 )= (a1 & (a3 ^ a4)) ^ (a2 & (a3 ^ a4))

# Bit manipulation

| - Bitwise or
& - Bitwise and
^ - Bitwise XOR --> 1 ^ 1 => 0 ... 1 ^ 0 => 1 ... 0 ^ 1 => 1 ... 0 ^ 0 => 0
~ - Bitwise not -> 1 -> 0 ... 0 -> 1 

>> Javascript way to transform decimal to binary 
num.toString(2)

>>binary to decimal 
parseInt(num, 2)

>> program to convert decimal to binary
const _convert = num => {
    if (num == 0) return s;
    const rem = num %2;
    s = rem + s;
    return _convert(Math.floor(num/2))
}

>> How to chek if 0th bit is set or not for a binary number

11011 & 00001 => 00001 

just do bitwise AND with 1. .if answer is 1 then 0th bit is set else unset

Similarly to check if 1st bit is set.. we will do bitwise & with 10
to check 2nd bit.. we will do with 100

so to check if ith bit is set in a binary number just multiple the num with 2^i

### which means num & (1 << i)

>> to set the ith bit 
num = num | (1 << i)

>> to detect how many set bits in a num

Approach 1: In this approach we keep on doing right shift on the actual number and do bitwise and with 1. so we will get if the 0th bit is set or not. If it gives nonzero response, increment count

let count = 0;
const _count = num => {
    if(num <= 0) return;
    if(num & 1) count++
    _count(num >> 1);
}
_count(11101);
console.log(count)

Approach 2: In this approach we will keep on doing bitwise & with 1 << i till i reaches last bit of the num

let count = 0;
const _count = num => {
    for(var i = 0; i < num.toString(2).length; i++) {
        if(num & (1 << i)) count++;
    }
}
console.log(count)

Approach 3: In this approach, we will keep on incrementing count till num & (num -1) doesn't become 0

let count = 0;
const _count = num => {
    while(num > 0) {
        count++;
        num = num & (num-1);
    }
}
console.log(count)

### So we learnt that if we do n & n -1 it will eventually give 0 and it will run till it gives the number of set bits there is in n

** So we can say for any number 2 ^ n => n & (n-1) is 0 **

## Lonely number
if there are two duplicated array and we need to find a unique number. we can keep on xoring the elements the final element will be the unique number
because n ^ n = 0  and  0 ^ n = n
var singleNumber = function(nums) {
    if(!nums.length) return 0;
    if(nums.length == 1) return nums[0];
    return nums.reduce((acc, curr) => acc ^ curr)
};

## Xor queries in a array
whenever we need to find the sum or Xor of a range within a array always prefix array calculation is best approach.
we will calculate prefix Xor array. then prefixArray[Right +1] XOR prefixarray[left] is our answer

## XOR of Sum of every possible pair of an array
If we have been given any set of numbers a1 a2 a3
then we can say for any number n 
n * ( a1 ^ a2 ^ a3) = (n * a1) ^ (n * a2) ^ (n * a3)

## Sum of XOR of all pairs
If we have been given any set of numbers a1 a2 a3
then we need to calculate the setbit counts and unset bitcounts in an array. 

for e.g 7,3,5 -> 
111
011
101
so if we take an array of bitcounts => it would be [2, 2, 3]
so unset bit counts are [1,1,0]

Formula is iterate over this bit count array and for each index, sum would be 2 ^ i * (setcount * unsetcount)
sum += (1 << i) * (setcount * unsetcount)

## Flip numbers

bht hi asaan sa question

const fn = (num1, num2) => {
  let final = 0;
  let bitArray = new Array(32).fill(0);
  for(var i = 0; i < bitArray.length;  i++) {
    if((num1&(1<<i)) != (num2&(1<<i))) final++;
  }
  return final;
}

## Lonely Number II
We have seen previously that if there's only one unique / lonely number in a two duplicated array (means all other elements in the array appears twice) we can simply do Xor of all the numbers. 
but it will not work for three/odd duplicated array. If there are odd numbers duplicated in the array we need to take a differentn approach

ex: 1 2 1 1
const fn = (arr) => {
  let bitArr = new Array(32).fill(0);
  for(var i = 0; i < bitArr.length; i++) {
     let  count = 0;
     for(var j = 0; j < arr.length; j++) {
      let num = arr[j];
      if(num & (1<<i)) count++;
     }
     bitArr[i] = count;
  }
  let sum = 0;
  for(var i =0 ; i< bitArr.length; i++) {
    let oc = bitArr[i];
    if(oc % 3 != 0) {
      sum += (1 << i);
    }
  }
  return sum
}

## Missing and repeating number

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

# Power set in bit manipulation
[1,2,3]
to find all possible subset of this array using power set we can 

mask the digits with 
000 -> []
001 -> [3]
010 -> [2]
011 -> [2,3]
100 -> [1]
101 -> [1,3]
110 -> [1,2]
111 -> [1,2,3]

the time completxity is for outer loop which will run from 0 -- Math.pow(2, n) -> O(2^n) and for inner loop to traverse bits  0 -n O(n)
so total is O(n * 2^n)

var subsets = function(nums) {
    let final = [];
    for(var mask = 0; mask < (1 << nums.length); mask++) {
        let temp = [];
        for(var i = 0; i < nums.length; i++) {
            if(mask & (1<<i)) {
                temp.push(nums[i]);
            }
        }
        final.push(temp);
    }
    return final;
};