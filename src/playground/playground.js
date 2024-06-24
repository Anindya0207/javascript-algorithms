var subarraysWithKDistinctComp = function(nums, k) {
    let l =0, r = 0, map= new Map(), maxC = 0;
    while(r < nums.length) {
        map.set(nums[r], (map.get(nums[r]) || 0) +1)
        while(map.size > k) {
            let countL = map.get(nums[l]);
            countL--;
            if(!countL) map.delete(nums[l]);
            else map.set(nums[l], countL);
            l++;
        }
        maxC += (r - l + 1);
        r++;
    }
    return maxC
}

var subarraysWithKDistinct = function(nums, k) {
    return subarraysWithKDistinctComp(nums, k) - subarraysWithKDistinctComp(nums, k-1)
};

console.log(subarraysWithKDistinct([1,2,1,2,3], 2))