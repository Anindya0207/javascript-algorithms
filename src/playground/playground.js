const matrixMultiplication = (arr, n) => 
    {
        let dp = Array.from({length: n}, () => Array.from({length: n}, () => undefined));
        const _calc = (i, j) => {
            if(i == j) return 0;
            if(dp[i][j] != undefined) return dp[i][j]
            let mini = Infinity;
            for(let k = i;k <= j-1; k++) {
                let stepsReqWithCurrPartition = arr[i-1] * arr[k] * arr[j];
                let leftSteps = _calc(i, k);
                let rightSteps = _calc(k+1, j);
                let totalSteps = stepsReqWithCurrPartition + leftSteps + rightSteps
                mini = Math.min(mini,totalSteps)
            }
            dp[i][j] = mini;
            return mini;
        }
        
        return _calc(1, n-1);
    }

    console.log(matrixMultiplication([40, 20, 30, 10, 30],5))