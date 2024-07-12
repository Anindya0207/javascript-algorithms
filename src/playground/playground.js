var candy = function (ratings) {
    let i = 0, j = i+1, total = 1, peak;
    while(j < ratings.length) {
        debugger
        if(ratings[j] != undefined && ratings[j] == ratings[i]) {
            total += 1;
            i++;
            j++;
            continue;
        }
        peak = 1
        while(ratings[j] != undefined && ratings[j] > ratings[i]) {
            peak++;
            total += peak;
            i++;
            j++;
        }
        down = 1; 
        while(ratings[j] != undefined && ratings[j] < ratings[i]) {
            total += down;
            down++;
            i++;
            j++;
        }
        if(down > peak) {
            total = total + (down - peak);
        }
    }
    return total;
};

// console.log(candy([0, 2, 4, 7, 6, 5, 4, 3,2, 1,1,1,2,3,4, 2,1,1,1]))
console.log(candy([1,0,2]))