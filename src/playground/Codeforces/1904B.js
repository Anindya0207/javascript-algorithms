var t = parseInt(readline());

for (var tt = 0; tt< t; tt++) {
    var n = readline().split(' ').map(x => parseInt(x));
    var arr1 = readline().split(' ').map(x => parseInt(x));
    var arr2 = [...arr1].sort((a,b) => a-b);
    var arr3 = [];
    arr3[0] = arr2[0];
    for(var i = 1; i < arr2.length; i++) {
      arr3[i] = arr3[i-1] + arr2[i];
    }
    var map = {};
    for(var i = 0; i < arr2.length;) {
      if(map[arr2[i]] === undefined) {
        var counter = i;
        while(counter < arr2.length && arr3[counter] >= arr2[counter + 1]) {
          counter++;
        }
        while(i <= counter) {
          map[arr2[i]] = counter;
          i++;
        }
      }
    }
    arr1 = arr1.map(a => map[a]);
    print(arr1.join(' '));
}