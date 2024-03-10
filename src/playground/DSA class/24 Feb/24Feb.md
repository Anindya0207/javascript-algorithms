Selection sort is all about finding the minimum or maximum basis on in which order you are tryhing to sort the array.
If asc > find the min else the max
Outer loop will run 0 - n
inner loop will find the minIndex
after the inner loop arr[minIdex] and arr[i] will be swapped

64 11 12 34 25 20
_
find minimum and replace with the first index

11 64 12 34 25 20
    _
run minimum logic from 64 to 20.. find miimum and put it in second index

11 12 64 34 25 20
      _
11 12 20 34 25 64
          _ 
11 12 20 25 34 64

11 12 20 25 34 64
            _
11 12 20 25 34 64


Optimisation

64 11 12 20 25 34

selection sort can not be optimised

but selection sort deos swapping only one time in each outer iteration, Bubble sort does swapping in n*n times which involved computation cost