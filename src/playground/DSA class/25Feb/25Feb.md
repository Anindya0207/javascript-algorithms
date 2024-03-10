Insertion Sort

this algo will go back side not forward direction.
So from second element, check backwards if any element is lesser than the current element.

12 11 13 5 6 --- 11 < 12 so 11 will go before 12

11 12 13 5 6 --- 13 < 12 so nothing will happen

11 12 13 5 6 -- 5 < 13 so 5 will keep on going backward  and be inserted before 11

5 11 12 13 6 -- 6 < 13 so 6 will keep on going backward and be stopped till 5 since 6> 5


4 3 2 10 12 1 5 6
  _
3 4 2 10 12 1 5 6
    _
2 3 4 10 12 1 5 6
      _
2 3 4 10 12 1 5 6
         _ 
2 3 4 10 12 1 5 6
            _
1 2 3 4  10 12 5 6
               _ 
1 2 3 4  5  10 12 6
                  _
1 2 3 4  5  6  10 12

second loop will not even execute if the aray is sorted. So best time complexity is o(n) for insertion sort
