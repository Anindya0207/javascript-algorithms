function DisjoinSet(size) {
  this.rankArr = Array.from({ length: size }, () => 0);
  this.sizeArr = Array.from({ length: size }, () => 1);
  this.parentArr = Array.from({ length: size });
  for (let i = 0; i < size; i++) {
    this.parentArr[i] = i;
  }
}

DisjoinSet.prototype.findParent = function (pivot) {
  if (this.parentArr[pivot] == pivot) return pivot;
  this.parentArr[pivot] = this.findParent(this.parentArr[pivot]);
  return this.parentArr[pivot];
};

DisjoinSet.prototype.unionRank = function (U, V) {
  let parentU = this.findParent(U);
  let parentV = this.findParent(V);
  if (parentU == parentV) return;
  if (this.rankArr[parentU] > this.rankArr[parentV]) {
    this.parentArr[parentV] = parentU;
  } else if (this.rankArr[parentU] < this.rankArr[parentV]) {
    this.parentArr[parentU] = parentV;
  } else {
    this.parentArr[parentU] = parentV;
    this.rankArr[parentV]++;
  }
};
DisjoinSet.prototype.unionSize = function (U, V) {
  let parentU = this.findParent(U);
  let parentV = this.findParent(V);
  if (parentU == parentV) return;
  if (this.sizeArr[parentU] >= this.sizeArr[parentV]) {
    this.parentArr[parentV] = parentU;
    this.sizeArr[parentU] += this.sizeArr[parentV];
  } else {
    this.parentArr[parentU] = parentV;
    this.sizeArr[parentV] += this.sizeArr[parentU];
  }
};
DisjoinSet.prototype.getDisconnected = function () {
  let count = 0;
  console.log(this.parentArr);
  for (let i = 0; i < this.parentArr.length; i++) {
    if (this.parentArr[i] == i) {
      count++;
    }
  }
  return count;
};
