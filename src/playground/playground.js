

var countPrimes = function(n) {
    let prime = new Array(n + 1).fill(1);
    let count = 0;
    for(var i = 2; i <= Math.sqrt(n); i++) {
        for(var j = i*i; j <= n; j+=i) {
            prime[j] = 0;
        }
    }
    for(var i = 2; i <= n; i++) {
        if(prime[i] == 1) count++;
    }
    return  count;
}

console.log(countPrimes(2))