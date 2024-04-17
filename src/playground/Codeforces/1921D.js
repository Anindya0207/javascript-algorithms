var t = parseInt(readline());

for (var tt = 0; tt< t; tt++) {
    var n = readline().split(' ').map(x => parseInt(x));
    var arr1 = readline().split(' ').map(x => parseInt(x));
    var arr2 = readline().split(' ').map(x => parseInt(x));
    arr1.sort((a,b) => b-a);
    arr2.sort((a,b) => b-a);
    var left1 = 0, right1 = arr1.length -1, left2 = 0, right2 = arr2.length -1, sum = 0;
    while(left1 <= right1) {
      
      var a = Math.abs(arr1[left1] - arr2[left2]);
      var b = Math.abs(arr1[left1] - arr2[right2]);
      var c = Math.abs(arr1[right1] - arr2[left2]);
      var d = Math.abs(arr1[right1] - arr2[right2]);
      if(a > b) {
        if(c > a) {
          if(d > c) {
            sum += d;
            right1--; right2--;
          } else {
            sum += c;
            right1--; left2++;
          }
        } else {
          if(d > a) {
            sum += d;
            right1--; right2--;
          } else {
            sum += a;
            left1++; left2++;
          }
        }
      } else {
        if(c > b) {
          if(d > c) {
            sum += d;
            right1--; right2--;
          } else {
            sum += c;
            right1--; left2++;
          }
        } else {
          if(d > b) {
            sum += d;
            right1--; right2--;
          } else {
          sum += b;
          left1++; right2--;
          }
        }
        
      }
    }  
    print(sum);
}