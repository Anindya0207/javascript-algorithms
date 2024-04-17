var t = parseInt(readline());

for (var tt = 0; tt< t; tt++) {
   
    var secondLine = readline().split(' ').map(x => parseInt(x));
    var k = secondLine[2];
    var a = readline();
    var b = readline();
    var counter = 0;
    var i = 0, j = 0, c = '', sw = '';
    a = a.split('').sort((x,y,i) => x.charCodeAt(i) - y.charCodeAt(i)).join('');
    b = b.split('').sort((x,y,i) => x.charCodeAt(i) - y.charCodeAt(i)).join('');
    while(i < a.length && j < b.length) {
        var ai = a.charCodeAt(i);
        var bj = b.charCodeAt(j);
        if(ai < bj) {
          if(counter == k) {
            counter = 0;
            if(sw == 'left') {
              sw = 'right';
            } else {
              sw = 'left';
            }
          } else {
            if(sw == 'right') {
              counter = 0;
            }
            sw = 'left';
          }
        } else {
          if(counter == k) {
            counter = 0;
            if(sw == 'right') {
              sw = 'left';
            } else {
              sw = 'right';
            }
          } else {
            if(sw == 'left') {
              counter = 0;
            }
            sw = 'right';
          }
        }
        if(sw == 'left') {
          c = `${c}${a.charAt(i)}`; i++;
        } else {
          c = `${c}${b.charAt(j)}`; j++;
        }
       counter++;
    }
    print(c);
}