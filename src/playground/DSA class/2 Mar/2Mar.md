Quick sort
https://runestone.academy/ns/books/published/pythonds/SortSearch/TheQuickSort.html

we take a pivot element like insertion sort

54 26 93 17 77 31 44 55 20
p  l                    r

- take any element as pivot/partition element. if we take 0 as p, then we take 1 as l and n-1 as r
- increment l till arr[l] > arr[p] and decrement r till arr[r] < arr[p]

54 26 93 17 77 31 44 55 20
p     l                 r

- swap arr[l] and arr[r] 

54 26 20 17 77 31 44 55 93
p     l                 r

- next bigger element than p is 77 and next smaller is 44

54 26 20 17 77 31 44 55 93
p           l     r

- swap

54 26 20 17 44 31 77 55 93

- next bigger element is 77 and next smaller is 31 

54 26 20 17 44 31 77 55 93
p               r  l 

- BUT l >= r hence we stop
- swap arr[p] and arr[r] and change p to 54 ka new index

31 26 20 17 44 54 77 55 93
                p  

- call qSort twice for the left and right part of pivot

qSort(arr, 0, p-1)
qSort(arr, p+1, n-1)


what will happen if we do it in a sorted array

1 2 3 4 5 6 7 8 9 
p l             r

it will run for the entire array. the  worst case compelxity will be O(n^2)
why?

because to check the array horizontally and swap the elements -> o(n)
and to iteratively and recursively call quickSort with the (Start, pivot-1) and (pivot+1, end) will take O(n) 

So all together it will be o(n^2) 

In merge sort, it will be always nlogn because merge sort recursion always divides the array by 2

Best case time complexity of quick sort is o(nlogn)

