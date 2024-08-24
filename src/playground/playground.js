/**
 * @param {number[][]} stones
 * @return {number}
 */
function DisjoinSet(size) {
  this.rankArr = Array.from({length: size } , () => 0);
  this.sizeArr = Array.from({length: size } , () => 1);
  this.parentArr = Array.from({length: size});
  for(let i  = 0; i < size; i++) {
    this.parentArr[i] = i;
  }
}

DisjoinSet.prototype.findParent = function(pivot) {
  if(this.parentArr[pivot] == pivot) return pivot;
  this.parentArr[pivot] = this.findParent(this.parentArr[pivot]);
  return this.parentArr[pivot];
}

DisjoinSet.prototype.unionRank = function(U, V){
  let parentU = this.findParent(U);
  let parentV = this.findParent(V);
  if(parentU == parentV) return;
  if(this.rankArr[parentU] > this.rankArr[parentV]) {
    this.parentArr[parentV] = parentU;
  } else if(this.rankArr[parentU] < this.rankArr[parentV] ) {
    this.parentArr[parentU] = parentV;
  } else {
    this.parentArr[parentV] = parentU
    this.rankArr[parentU]++;
  }
}
DisjoinSet.prototype.getUniqueParents = function(){
  let uniqueParent = {};
  for(let i = 0; i< this.parentArr.length; i++) {
      if(this.parentArr[i] != i) {
          uniqueParent[this.parentArr[i]] = true
      }
  } 
  return Object.keys(uniqueParent);
}


const numOfIslands = (rows, cols, operators) => {
  const getNormalisedNode = (row, col) => cols * row + col
  let visitedArr = Array.from({length: rows}, () => Array.from({length: cols} , () => 0));
  let dj = new DisjoinSet(rows * cols);
  let final = [], count = 0;
  let directions = [[-1,0], [1, 0], [0, -1], [0,1]]
  for(let i=0; i< operators.length; i++) {
      let [row, col] = operators[i];
      if(visitedArr[row][col]){
        final.push(count);
        continue;
      }
      count++;
      visitedArr[row][col] = 1;
      for(let dir of directions) {
        const [deltaRow, deltaCol] = dir;
        let newRow = row + deltaRow;
        let newCol = col + deltaCol;
        let normalisedNode = getNormalisedNode(row, col);
        let newNormalisedNode = getNormalisedNode(newRow, newCol);
        if(visitedArr[newRow] && visitedArr[newRow][newCol]) {
          let parentU = dj.findParent(normalisedNode);
          let parentV = dj.findParent(newNormalisedNode);
          if(parentU != parentV) {
            dj.unionRank(normalisedNode, newNormalisedNode);
            count--;
          }
        }
      }
      final.push(count);
  }
  return final;
}

console.log(numOfIslands(5,8,[[0,3], [4,3], [3,1], [3,5]]))
// console.log(numOfIslands(4, 5,[[1,1], [0,1], [3,3], [3,4]]))