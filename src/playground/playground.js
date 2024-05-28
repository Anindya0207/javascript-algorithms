var exist = function(board, word) {
    let final = true, map = {}, current = false;
    const _calc = (i, j, index) => {
        if(index == word.length) {
            return true
        }
        const target = word.charAt(index);
        if(board[i+1] && board[i+1][j] == target && !map[`${i+1}${j}`]) {
            map[`${i+1}${j}`] = true;
            const res1 = _calc(i+1, j, index+1);
            current = current || res1;
            if(!res1)  map[`${i+1}${j}`] = false;
        }
        if(board[i-1] && board[i-1][j] == target && !map[`${i-1}${j}`]) {
            map[`${i-1}${j}`] = true;
            const res2 = _calc(i-1, j, index+1);
            current = current || res2;
            if(!res2) map[`${i-1}${j}`] = false;
        }
        if(board[i][j+1] == target && !map[`${i}${j+1}`]) {
            map[`${i}${j+1}`] = true;
            const res3 = _calc(i, j+1, index+1);
            current = current || res3
            if(!res3)  map[`${i}${j+1}`] = false;
        }
        if(board[i][j-1] == target && !map[`${i}${j-1}`]) {
            map[`${i}${j-1}`] = true;
            const res4 = _calc(i, j-1, index+1);
            current = current || res4
            if(!res4)  map[`${i}${j-1}`] = false;
        }
       return current 
    }
    for(var i = 0; i< board.length; i++) {
        for(var j = 0; j < board[i].length; j++) {
            if(board[i][j] == word.charAt(0)) {
                map = {}, current = false;
                map[`${i}${j}`] = true;
                final = _calc(i, j, 1);
                if(final) {
                    console.log(true); return;
                }
            }
        }
    }
    console.log(false)
};

exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCD")
// exist([["C","A","A"],["A","A","A"],["B","C","D"]], "AAB")
// exist([["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], 'ABCESEEEFS')