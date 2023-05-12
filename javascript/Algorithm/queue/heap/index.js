// 우선순위 큐
// 일반적인 큐와 달리 우선순위가 먼저 나간다는 개념
// 힙은 우선순위 큐를 구현하기위한 가장 적합한 구조

// 힙은 우선순위가 높은 요소가 먼저 나가는 특징을 가진다.
// 루트가 가장 큰 값이 되는 최대 힙과 루트가 가장 작은 값이 되는 최소 힙이 있다.
// 자바스크립트는 힙을 직접 구현해야한다.....

// 힙은 요소가 추가될 때는 트리의 가장 마지막에 정점에 위치한다.
// 추가 후 부모 정점보다 우선순위가 높다면 부모정점과 순서를 바꾼다
// 이 과정을 반복하면 결국 우선순위가 높은 정점이 루트가 된다
// 완전 이진 트리의 높이는 logN 이기에 힙의 요소 추가 알고리즘은 O(logN) 시간복잡도를 지닌다.

// 최대힙 45 추가
// 그다음 36에 추가. 그다음 54 추가. 이 54는 45와 바뀐다.
// 이제 27 추가, 그 다음 63을 추가한다. 63과 36을 변경하고, 63과 54를 변경한다.

// 힙에서 요소 제거는 좀더 복잡
// 요소 제거는 루트 정점만 가능하다.
// 루트 정점이 제거된 후 가장 마지막 정점이 루트에 위치한다.
// 루트 정점의 두 자식 정점 중 더 우선순위가 높은 정점과 바꾼다
// 두 자식 정점이 우선순위가 더 낮을 때 까지 반복한다.
// 완전 이진 트리의 높이는 logN 이기에 힙의 요소 제거 알고리즘은 O(logN) 시간 복잡도를 가진다.

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop(); // 루트 정점만 남은 경우

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    while (this.heap[currentIndex] < this.heap[leftIndex] || this.heap[currentIndex] < this.heap[rightIndex]) {
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        const temp = this.heap[currentIndex];
        this.heap[currentIndex] = this.heap[rightIndex];
        this.heap[rightIndex] = temp;
        currentIndex = rightIndex;
      } else {
        const temp = this.heap[currentIndex];
        this.heap[currentIndex] = this.heap[leftIndex];
        this.heap[leftIndex] = temp;
        currentIndex = leftIndex;
      }
      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }

    return returnValue;
  }
}

const heap = new MaxHeap();
heap.push(45);
heap.push(36);
heap.push(54);
heap.push(27);
heap.push(65);
heap.push(89);
console.log(heap.heap);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex] > value) {
      this._swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return;
    if (this.heap.length === 2) return this.heap.pop();

    let returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    while ((this.heap[leftIndex] && this.heap[currentIndex] > this.heap[leftIndex]) || (this.heap[rightIndex] && this.heap[currentIndex] > this.heap[rightIndex])) {
      if (this.heap[leftIndex] === undefined) {
        this._swap(rightIndex, currentIndex);
      } else if (this.heap[rightIndex] === undefined) {
        this._swap(leftIndex, currentIndex);
      } else if (this.heap[leftIndex] > this.heap[rightIndex]) {
        this._swap(rightIndex, currentIndex);
      } else if (this.heap[rightIndex] > this.heap[leftIndex]) {
        this._swap(leftIndex, currentIndex);
      }

      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }
    return returnValue;
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  isEmpty() {
    return this.heap.length === 1;
  }
}
