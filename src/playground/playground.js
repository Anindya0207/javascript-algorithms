var longestOnes = function(nums, k) {
    let l = 0, r = 0, maxC = -Infinity;
    let currConversationC = 0;
    while(r < nums.length) {
        if(nums[r] === 0) {
            currConversationC++
        };
        while(currConversationC > k) {
            if(nums[l] === 0) {
                currConversationC--;
            }
            l++;
        }
        maxC = Math.max(maxC, r - l + 1);
        r++;
    }
    return maxC ;
};


console.log(longestOnes([0,0,0,0], 0))