var t = parseInt(readline());

for (var tt = 0; tt< t; tt++) {
    var n = parseInt(readline());
    var arr = readline().split(' ').map(x => parseInt(x));
    var arrBkp = [...arr];
    arr.sort((a, b) => a - b);
    var i = 0, final = 'YES';
    while(i < arr.length) {
        if(arr[i] %2 != arrBkp[i] %2) {
            final = 'NO';
            break;
        }
        i++;
    }
    print(final);
}