
Bubble sort

Bubble sort me outer loop will run 0-n
Inner loop will also run 0-n
Will compare  every element with the next element and swap if it is more or less (Asc or desc)

This way after every run the n - i ... n indices are always sorted

To optimise, we can run the inner loop till n - i because last n-i indices are sorted after every outer loop

To optimise even further, the inner loop can alter a flag if we swapped any adjacent elements.
If that flag hasn't changes in the entire inner loop, that means all the elements are already sorted. 
In that case, we can break the outer loop.

12 4 43 2 54 1
    4 12 43 2 54 1 i=0 j=1
    4 12 43 2 54 1 i=1 j=2
    4 12 2 43 54 1 i=2 i=3
    4 12 2 43 54 1 i=3 j=4
    4 12 2 43 1 54 i=4 j=5---pass 1

4 12 2 43 1 54
    4 12 2 43 1 54 i=0
    4 2 12 43 1 54
    4 2 12 43 1 54
    4 2 12 1 43 54
    4 2 12 1 43 54 --- pass2

4 2 12 1 43 54
    2 4 12 1 43 54
    2 4 12 1 43 54
    2 4 1 12 43 54
    2 4 1 12 43 54
    2 4 1 12 43 54 ---pass3

2 4 1 12 43 54
    2 4 1 12 43 54
    2 1 4 12 43 54
    2 1 4 12 43 54
    2 1 4 12 43 54
    2 1 4 12 43 54 --pass4

2 1 4 12 43 54
    1 2 4 12 43 54
    1 2 4 12 43 54
    1 2 4 12 43 54
    1 2 4 12 43 54
    1 2 4 12 43 54 --pass5

max n-1 passes required to sort 

// why j is run 0 to arr.length - 1 - i?
because after each pass the last i elements are already sorted. so no need to check them again in the inner loop 

for(var i =0; i < arr.length - 1; i++) {
      for(var j=0; j < arr.length -1 -i; j++) {
        if(arr[j] > arr[j+1]) {
          swap(arr[j], arr[j+1]);
        }
      }
   }

12 23 45 56 88 77

here only the last two indices are needed to be swapped then why to run whole array?

for(var i =0; i < arr.length - 1; i++) {
    flag = false;
    for(var j=0; j < arr.length -1 -i; j++) {
        if(arr[j] > arr[j+1]) {
            flag = true;
            swap(arr[j], arr[j+1]);
        }
    }
    if(flag == false) {
        break;
    }
}