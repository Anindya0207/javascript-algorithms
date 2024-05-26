var combinationSum2 = function(candidates, target) {
    candidates.sort((a,b) => a-b)
    let final =[]
    const _calc = (index, arr, sum) => {
        if(sum == target){
            final.push(arr);
           return;
        }
        let i =index;
        while(i < candidates.length) {
           if(i > index && candidates[i] == candidates[i-1]) {
              i++; continue;
           } 
           if(sum + candidates[i] <= target) {
             _calc(i + 1, [...arr, candidates[i]], sum + candidates[i]);
           }
           i++;
        }
    };
    _calc(0,[], 0);
    console.log(final)
};

combinationSum2([10,1,2,7,6,1,5], 8)