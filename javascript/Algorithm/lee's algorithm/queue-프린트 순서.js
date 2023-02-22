// 내가 푼 풀이
class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
    this.index = 0;
  }

  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return value;
  }
  peek() {
    return this.queue[this.front];
  }
  peekFront() {
    return this.front;
  }
  peekIndex() {
    return this.index;
  }
  firstIndex(location) {
    this.index = location;
  }
  reviseIndex() {
    this.index = this.rear - 1;
  }
  max() {
    const array = this.queue.filter((elem) => elem);
    const maximum = Math.max(...array);
    return maximum;
  }
  size() {
    return this.rear - this.front;
  }
}

function solution(priorities, location) {
  const queue = new Queue();
  queue.firstIndex(location);
  let count = 0;

  for (let elem of priorities) {
    queue.enqueue(elem);
  }

  while (queue.peekFront() <= queue.peekIndex()) {
    let value = queue.dequeue();
    let maximum = queue.max();
    if (maximum > value) {
      queue.enqueue(value);
      if (queue.peekFront() == queue.peekIndex() + 1) {
        queue.reviseIndex();
      }
    } else {
      count++;
    }
  }

  return count;
}

// 강사님이 푸신 풀이

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      this.head = this.tail = newValue;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    const value = this.head.value;
    this.head = this.head.next;
    return value;
  }

  peek() {
    return this.head.value;
  }
}

function solution(priorities, location) {
  const queue = new Queue();
  for (let i = 0; i < priorities.length; i += 1) {
    // 각각의 인덱스까지 같이 넣어주는 아이디어
    queue.enqueue([priorities[i], i]);
  }
  priorities.sort((a, b) => b - a);
  // 내림차순으로 정렬한다.

  let count = 0;
  while (true) {
    const currentValue = queue.peek();
    if (currentValue[0] < priorities[count]) {
      queue.enqueue(queue.dequeue());
    } else {
      const value = queue.dequeue();
      count++;
      if (location === value[1]) {
        return count;
      }
    }
  }
}



