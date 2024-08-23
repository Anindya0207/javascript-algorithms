function DisjoinSet(size) {
  this.rankArr = Array.from({length: size + 1} , () => 0);
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
    this.parentArr[parentU] = parentV;
    this.rankArr[parentV]++;
  }
}

const spanningTree = (v, adj) => {
  let dj = new DisjoinSet(v);
  adj.sort((a,b) =>a[2] - b[2]);
  let sum = 0;
  for(let i =0 ;i < adj.length; i++) {
      let [ u, v, w] = adj[i];
      let parentU = dj.findParent(u);
      let parentV = dj.findParent(v);
      if(parentV == parentU) continue;
      dj.unionRank(u, v);
      sum += w;
  }
  return sum;
}
console.log(spanningTree(3,  [[0,1 ,5],
  [1,2,3],
  [0,2,1]]))