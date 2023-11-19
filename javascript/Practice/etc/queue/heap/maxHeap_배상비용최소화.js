class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap[this.heap.length - 1];
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      let temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop();

    let returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    while (this.heap[currentIndex] < this.heap[leftIndex] || this.heap[currentIndex] < this.heap[rightIndex]) {
      if (!this.heap[leftIndex] || this.heap[leftIndex] < this.heap[rightIndex]) {
        let temp = this.heap[rightIndex];
        this.heap[rightIndex] = this.heap[currentIndex];
        this.heap[currentIndex] = temp;
        currentIndex = rightIndex;
      } else {
        let temp = this.heap[leftIndex];
        this.heap[leftIndex] = this.heap[currentIndex];
        this.heap[currentIndex] = temp;
        currentIndex = leftIndex;
      }

      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }

    return returnValue;
  }
}

function solution(no, works) {
  // 모든 작업의 합보다 no가 크면 배상 비용을 낼 필요가 없다.
  if (works.reduce((a, b) => a + b) <= no) {
    return 0;
  }

  // max heap 구성
  const heap = new MaxHeap();
  for (const work of works) {
    heap.push(work);
  }

  // no만큼 루프 돌면서 가장 큰 값을 빼서 처리 후 다시 push
  for (let i = 0; i < no; i += 1) {
    heap.push(heap.pop() - 1);
  }

  // 남은 요소에 제곱한 값들의 합을 구한 후 반환
  return heap.heap.reduce((a, b) => a + b * b);
}
