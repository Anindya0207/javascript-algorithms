const JobScheduling = (arr) =>{
    let maxDead = -Infinity, jobC = 0, maxC = 0
    arr.sort((a, b) => b.profit - a.profit);
    for(var i  = 0; i<arr.length; i++) {
        maxDead = Math.max(maxDead, arr[i].dead);
    }
    let deadLineArr = new Array(maxDead).fill(-1);
    for(var i =0; i < arr.length; i++) {
        let dead = arr[i].dead;
        for(let k = dead-1; k >=0 ;k--) {
            if(deadLineArr[k] == -1) {
                deadLineArr[k] = arr[i];
                maxC += arr[i].profit;
                jobC++;
                break;
            }
        }
    }
    return [jobC, maxC]
  }

  console.log(JobScheduling(
    [
        {dead: 2, profit: 100},
        {dead: 1, profit: 19},
        {dead: 2, profit: 27},
        {dead: 1, profit: 25},
        {dead: 1, profit: 15}
    ]
  ))