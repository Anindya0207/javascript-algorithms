const main = (N) => {
    let prime = new Array(N + 1).fill(true);
    const sieve = (n) => {
        prime[0] = prime[1] = false;
        for(var i = 2; i<= Math.sqrt(n); i++) {
            for (var j = i* i ; j <=n; j+=i) {
                prime[j] = false;
            }
        }
    }
    sieve(N);
    console.log(prime)
    let final = []
    for (var i = 1; i<= Math.sqrt(N); i++) {
        if(N % i == 0) {
            if(prime[i]) {
                final.push(i);
            }
            if(i != N/i && prime[N/i]) {
                final.push(N/i);
            }
        }
    }
    return final
}

console.log(main(8))