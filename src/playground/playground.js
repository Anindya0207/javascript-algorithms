const bitManipulation = (n) =>  {
    // for(var i = 0; i<32; i++) {
    //     if(n < 1<<i) break
    //     if(!(n & 1 << i)) {
    //         console.log(n | 1 << i);return
    //     }
    // }
    // console.log(n);
    let i = 0, n1 = n;
    while(n) {
        if(!(n & 1)) return n1 | 1 << i;
        i++;
        n = n >> 1;
    }
    return n1
}

console.log(bitManipulation(5))