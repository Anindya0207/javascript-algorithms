var t = parseInt(readline());

for (var tt = 0; tt< t; tt++) {
    var n = parseInt(readline());
    var arr = readline().split(' ').map(x => parseInt(x));
    arr.sort((a, b) => a-b)
    var left = 1, right = n-1, sumLeft = arr[0], sumRight = 0, ans = 'NO';
    while(left < right) {
        sumLeft += arr[left];
        sumRight += arr[right];
        left++; right--;
        if(sumRight > sumLeft) {
            ans = 'YES'; break;
        }
    }
    print(ans);
}