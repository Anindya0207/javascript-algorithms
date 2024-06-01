var solveSudoku = function(board) {
    const canBePlaced = (rowIndex, colIndex, num) => {
        // check for the column
        for(var i = 0; i < 9; i++) {
            if(board[rowIndex][i] == num) {
                return false;
            }
        }
        //check for the row
        for(var i  = 0; i < 9; i++) {
            if(board[i][colIndex] == num) {
                return false;
            }
        }
        //check for sub boxes
        let rowsToCheck = [];
        let colsToCheck = [];
        if((rowIndex + 1)% 3 == 0) {
            rowsToCheck = [rowIndex, rowIndex - 1, rowIndex - 2]
        } else if((rowIndex + 1)% 3 == 1) {
            rowsToCheck = [rowIndex, rowIndex + 1, rowIndex +2];
        } else if((rowIndex + 1)% 3 == 2) {
            rowsToCheck = [rowIndex, rowIndex - 1, rowIndex +1];
        }
        if((colIndex + 1)% 3 == 0) {
            colsToCheck = [colIndex, colIndex - 1, colIndex - 2]
        } else if((colIndex + 1)% 3 == 1) {
            colsToCheck = [colIndex, colIndex + 1, colIndex +2];
        } else if((colIndex + 1)% 3 == 2) {
            colsToCheck = [colIndex, colIndex - 1, colIndex +1];
        }

        for(var p = 0; p < rowsToCheck.length; p++) {
            for(var q = 0; q < colsToCheck.length; q++) {
                if(board[rowsToCheck[p]][colsToCheck[q]] == num) {
                    return false
                }
            }
        }
        return true;
    }
    const _calc = (rowIndex, colIndex) => {
        if(rowIndex >= 9) return true;
        if(board[rowIndex][colIndex] != '.') {
            if(colIndex < 9) {
                return _calc(rowIndex, colIndex + 1)
            } else {
                return _calc(rowIndex + 1, 0);
            }
        }
        for (var num = 1; num <= 9; num++) {
            if(!canBePlaced(rowIndex, colIndex, num)) continue;
            board[rowIndex][colIndex] = `${num}`;
            if(colIndex < 9) {
                if(_calc(rowIndex, colIndex + 1)) {
                    return true;
                }
            } else {
                if(_calc(rowIndex + 1, 0)) {
                    return true;
                }
            }
            board[rowIndex][colIndex] = '.';
        }
        return false;
    };
    _calc(0, 0);
    console.log(board)
}

const board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
solveSudoku(board)
