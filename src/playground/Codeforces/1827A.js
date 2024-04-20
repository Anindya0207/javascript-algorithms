var t = parseInt(readline());

for (var tt = 0; tt< t; tt++) {
    var n = readline().split(' ').map(x => parseInt(x));
    var arr1 = readline().split(' ').map(x => parseInt(x));
    var arr2 = readline().split(' ').map(x => parseInt(x));
    arr1.sort((a,b) => b-a);
    arr2.sort((a,b) => b-a);
    var left1 = 0, left2 = 0, counter = 0, mult =1;
    while(left2 < arr2.length) {
      if(arr1[left1] > arr2[left2]) {
        left1++; counter++;
      } else {
        mult =( mult * Math.max(counter - left2, 0) % (Math.pow(10, 9) + 7));
        left2++;
      }
    }  
    print(mult % (Math.pow(10, 9) + 7)); 
}