var maxProfit = function(prices) {
    
    const _calc = (index, buy) => {
        if(index >= prices.length) return 0
        if(buy == 1) {
            return Math.max(
                -prices[index] + _calc(index + 1, 0),
                0 + _calc(index + 1, 1)
            )
        } else if(buy == 0) {
            return Math.max(
                prices[index] + _calc(index + 2, 1),
                0 + _calc(index + 1, 0)
            )
        }
    }

    return _calc(0, 1);
};

console.log(maxProfit([1,2,4]))