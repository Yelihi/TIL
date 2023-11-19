class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (parentIndex !== 0 && this.heap[parentIndex].cost > value.cost) {
      this._swap(parentIndex, currentIndex);

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return;
    if (this.heap.length === 2) return this.heap.pop();

    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    while ((this.heap[leftIndex] && this.heap[currentIndex].cost > this.heap[leftIndex].cost) || (this.heap[rightIndex] && this.heap[currentIndex].cost > this.heap[rightIndex].cost)) {
      if (this.heap[leftIndex] === undefined) {
        // 왼쪽 정점이 없을 경우
        this._swap(rightIndex, currentIndex);
      } else if (this.heap[rightIndex] === undefined) {
        // 오른쪽 정점이 없을 경우
        this._swap(leftIndex, currentIndex);
      } else if (this.heap[leftIndex].cost > this.heap[rightIndex].cost) {
        this._swap(rightIndex, currentIndex);
      } else if (this.heap[leftIndex].cost <= this.heap[rightIndex].cost) {
        this._swap(leftIndex, currentIndex);
      }
      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }

    return returnValue;
  }

  isEmpty() {
    return this.heap.length === 1;
  }

  _swap(a, b) {
    // 편의를 위해 배열의 요소를 swap하는 함수 작성
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function dijkstra(road, N) {
  let heap = new MinHeap();
  let firstNode = { node: 1, cost: 0 };
  heap.push(firstNode);

  const dist = Array.from(Array(N + 1), () => Infinity);
  dist[1] = 0;

  while (!heap.isEmpty()) {
    const { node: current, cost: currentCost } = heap.pop();

    for (let [src, dest, cost] of road) {
      let newCost = currentCost + cost;

      if (src === current && dist[dest] > newCost) {
        dist[dest] = newCost;
        heap.push({ node: dest, cost: newCost });
      } else if (dest === current && dist[src] > newCost) {
        dist[src] = newCost;
        heap.push({ node: src, cost: newCost });
      }
    }
  }

  return dist;
}

function solution(N, road, K) {
  const dist = dijkstra(road, N);
  return dist.filter((x) => x <= K).length;
}
