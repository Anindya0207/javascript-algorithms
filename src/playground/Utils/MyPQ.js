class PriorityQueue {
  constructor(minMax) {
    this.heap = [];
    this.minMax = minMax || 'min';
  }
  getParent(index) {
    return Math.floor((index - 1) / 2);
  }
  getLeftChild(index) {
    return 2 * index + 1;
  }
  getRightChild(index) {
    return 2 * index + 2;
  }
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = this.getParent(index);
      if (
        this.minMax == 'min' &&
        this.heap[parent].priority <= this.heap[index].priority
      )
        break;
      if (
        this.minMax == 'max' &&
        this.heap[parent].priority >= this.heap[index].priority
      )
        break;
      this.swap(index, parent);
      index = parent;
    }
  }
  heapifyDown() {
    let index = 0;
    let n = this.heap.length;
    while (true) {
      let leftIndex = this.getLeftChild(index);
      let rightIndex = this.getRightChild(index);
      let overrideIndex = index;
      if (leftIndex < n) {
        if (
          this.heap[leftIndex].priority < this.heap[overrideIndex].priority &&
          this.minMax == 'min'
        )
          overrideIndex = leftIndex;
        if (
          this.heap[leftIndex].priority > this.heap[overrideIndex].priority &&
          this.minMax == 'max'
        )
          overrideIndex = leftIndex;
      }
      if (rightIndex < n) {
        if (
          this.heap[rightIndex].priority < this.heap[overrideIndex].priority &&
          this.minMax == 'min'
        )
          overrideIndex = rightIndex;
        if (
          this.heap[rightIndex].priority > this.heap[overrideIndex].priority &&
          this.minMax == 'max'
        )
          overrideIndex = rightIndex;
      }

      if (index == overrideIndex) break;
      this.swap(index, overrideIndex);
      index = overrideIndex;
    }
  }
  peek() {
    return this.heap[0];
  }
  isEmpty() {
    return this.heap.length == 0;
  }
  dequeue() {
    if (this.heap.length == 0) return null;
    if (this.heap.length == 1) return this.heap.pop();
    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }
}
