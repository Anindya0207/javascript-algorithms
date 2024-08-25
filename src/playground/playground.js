/**
 * @param {number[][]} stones
 * @return {number}
 */
function DisjoinSet(size) {
  this.rankArr = Array.from({length: size + 1} , () => 0);
  this.sizeArr = Array.from({length: size + 1} , () => 1);
  this.parentArr = Array.from({length: size + 1});
  for(let i  = 0; i <= size; i++) {
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
var removeStones = function(stones) {
    let maxR = -Infinity;
    let maxC = -Infinity;
    let uniqueParent = {};
    for(let i =0; i< stones.length;i++) {
        let [u,v] = stones[i];
        maxR = Math.max(maxR, u);
        maxC = Math.max(maxC, v);
    }
    let dj = new DisjoinSet(maxR + maxC + 1);
    for(let i = 0; i < stones.length; i++) {
        let [u,v] = stones[i];
        let normalisedCol = v + maxR + 1
        dj.unionRank(u, normalisedCol);
    }
    for(let i = 0; i < stones.length; i++) {
        let [u,v] = stones[i];
        let normalisedCol = v + maxR + 1
        let parentU = dj.findParent(u);
        let parentV = dj.findParent(normalisedCol);
        uniqueParent[parentU]++
        uniqueParent[parentV]++
    }
    let totalDisConnected = Object.keys(uniqueParent).length
    return stones.length - totalDisConnected
};


console.log(removeStones([[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]))