var lexicalOrder = function(n) {
    let final = new Set();
    const _calc= (num) => {
        if(num > n) return;
        final.add(num);
        for(let i = 0; i <= 9;i++) {
            let bla = 10 * num + i;
            _calc(bla)
        }
    }
    for(let i = 1; i<=9; i++) {
        _calc(i);
    }
    return Array.from(final)
};

console.log(lexicalOrder(34))