function DisjoinSet(size) {
  this.rankArr = Array.from({length: size} , () => 0);
  this.sizeArr = Array.from({length: size} , () => 1);
  this.parentArr = Array.from({length: size});
  for(let i  = 0; i < size; i++) {
    this.parentArr[i] = i;
  }
  this.maxSize = -Infinity;
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
    this.parentArr[parentU] = parentV;
    this.rankArr[parentV]++;
  }
}
DisjoinSet.prototype.unionSize = function(U, V){ 
    let parentU = this.findParent(U);
    let parentV = this.findParent(V);
    if(parentU == parentV) return;
    if(this.sizeArr[parentU] >= this.sizeArr[parentV]) {
        this.parentArr[parentV] = parentU;
        this.sizeArr[parentU] += this.sizeArr[parentV]
        this.maxSize = Math.max(this.maxSize, this.sizeArr[parentU]);
    } else {
        this.parentArr[parentU] = parentV;
        this.sizeArr[parentV] += this.sizeArr[parentU]
        this.maxSize = Math.max(this.maxSize, this.sizeArr[parentV]);
    }
}

var swimInWater = function(grid) {
  let arr = [];
  let n = grid.length;
  let getNormalisedNode = (row,col) => col * n + row;
  let dj = new DisjoinSet(n *n)
  for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j<grid.length; j++) {
          const normalisedNode = getNormalisedNode(i, j)
          arr.push([grid[i][j], normalisedNode, [i, j]])
      }
  }
  arr.sort((a, b) => a[0] - b[0]);
  console.log(arr);
  let directions = [[-1,0], [1,0], [0,1], [0,-1]];
  for(let i =0; i < arr.length; i++) {
    let [val, normalisedNode, [r,c]] = arr[i];
    for(let dir of directions) {
      let [deltaR, deltaC] = dir;
      let newR = deltaR + r;
      let newC = deltaC + c;
      if(grid[newR] && grid[newR][newC] != undefined && grid[newR][newC] < grid[r][c]) {
        dj.unionRank(normalisedNode, getNormalisedNode(newR, newC));
      }
    }
    if(dj.findParent(0) == dj.findParent(getNormalisedNode(n-1, n-1))) {
      return val
    }
  }
  return -1
};

console.log(swimInWater([[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]))