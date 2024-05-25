var betterString = function(str1, str2) {
    let map = {}, count1 = 0 , count2 = 0, dp = [1];
    for(var i = 1; i <= str1.length; i++)  {
        dp[i] = 2* dp[i-1];
        if(map[str1.charAt(i-1)]) {
            dp[i] -= dp[map[str1.charAt(i-1)] -1];
        }
        map[str1.charAt(i-1)] = i;
    }
    count1 = dp[i-1]
    map = {}, dp =[1];
    for(var i = 1; i <= str2.length; i++)  {
        dp[i] = 2* dp[i-1];
        if(map[str2.charAt(i-1)]) {
            dp[i] -= dp[map[str2.charAt(i-1)] -1];
        }
        map[str2.charAt(i-1)] = i;
    } 
    count2 = dp[i-1]
   if(count1 >= count2) return str1;
   return str2
};

betterString('gfg', 'ggg');