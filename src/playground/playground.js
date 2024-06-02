var addOperators = function(num, target) {
    let final = [];
    const _calc = (index, str, curr, prev) => {
       if(index >= num.length) {
        if(curr == target) {
            final.push(str);
            return;
        }
       }
       for(var i = index; i < num.length; i++) {
        if(i > index && num.charAt(index) == '0') break;
        const substr = num.substring(index, i+1);
        const currVal = Number(substr);
        if(index == 0) {
            _calc(i+1, substr, currVal, currVal);
        } else {
            _calc(i+1, `${str}+${substr}`, curr+currVal, currVal);
            _calc(i+1, `${str}-${substr}`, curr-currVal, -currVal);
            _calc(i+1, `${str}*${substr}`, curr-prev+(prev*currVal), (prev*currVal));
        }
       }
    }
    _calc(0, ``, 0, 0);
    console.log(final)
};
addOperators("105", 5); 