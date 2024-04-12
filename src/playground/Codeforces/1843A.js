var t = parseInt(readline());

for (var i = 0; i< t; i++) {
    var n = parseInt(readline());
    var arr = readline().split(' ').map(x => parseInt(x));
    arr.sort((a, b) => a - b);
    var left =0, right = n-1, sum = 0;
    while(left < right) {
        sum = sum + (arr[right] - arr[left]);
        left++; right--;
    }
    print(sum);
}