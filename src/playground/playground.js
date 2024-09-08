const knapSac = (N,W,val,wt) => {
  let dp = Array.from({length: N}, () => Array.from({length: W+ 1}, () => undefined))
  const _calc = (index, _weight) => {
      if(index == 0) {
          if(_weight == 0) return 0;
          if(_weight >= wt[index]) {
              return val[index] * Math.floor(_weight / wt[index])
          }
          return -Infinity;
      }
      if(dp[index][_weight] != undefined) return dp[index][_weight]
      let notake = _calc(index -1, _weight);
      let take = -Infinity;
      if(wt[index] <= _weight) {
          take = val[index] + _calc(index, _weight - wt[index]);
      }
      dp[index][_weight]= Math.max(take, notake);
      return dp[index][_weight];
  }
  
  let balbla = _calc(N-1, W) 
  return balbla == -Infinity ? 0 : balbla
}

console.log(knapSac(1,5, [10], [2]))