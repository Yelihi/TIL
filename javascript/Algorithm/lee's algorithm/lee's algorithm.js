// 요소의 추가와 삭제가 반복되는 로직이라면 어떻게 해야할까.
// 배열을 사용하는것은 조금 지양해야 한다.
// 연결리스트를 사용해야한다.

// 연결리스트는 메모리가 허용하는 한 요소를 제한없이 추가할 수 있다
// 탐색은 O(n)이 소요된다
// 요소를 추가하거나 제거할 때는 O(1) 이 소요된다
// Singly Linked List, Doubly Linked List, Circular Linked List 가 존재한다.

// 단일 연결 리스트
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  find(value) {
    let currNode = this.head;
    while (currNode.value !== value) {
      currNode = currNode.next;
    }
    return currNode;
  }

  append(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  insert(node, newValue) {
    const newNode = new Node(newValue);
    newNode.next = node.next;
    node.next = newNode;
  }

  remove(value) {
    let prevNode = this.head;
    while (prevNode.next.value !== value) {
      prevNode = prevNode.next;
    }

    if (prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
    }
  }

  display() {
    let currNode = this.head;
    let displayString = "[";
    while (currNode !== null) {
      displayString += `${currNode.value}, `;
      currNode = currNode.next;
    }
    displayString = displayString.substring(0, displayString.length - 2);
    displayString += "]";
    console.log(displayString);
  }
}

const linkedList = new SinglyLinkedList();
console.log(linkedList);
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(5);
linkedList.display();
console.log(linkedList.find(3));

// 실제 문제를 풀이할 떄 함수를 선언하는 방식은 이렇게 해도 될 것 같다
// 생성자 함수
let ListNode = function (value, next) {
  this.value = value;
  this.next = next;
};

// 이중 연결 리스트 (이전 노드 역시 가르킨다)

// 환영 연결 리스트

// 스택을 연결리스트로 구현하기
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value) {
    const node = new Node(value);
    node.next = this.top;
    this.top = node;
    this.szie += 1;
  }

  pop() {
    const value = this.top.value;
    this.top = this.top.next;
    this.size -= 1;
    return value;
  }

  size() {
    return this.size;
  }
}

// 큐 구조를 배열로 구현하기

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0; // 앞 인덱스
    this.rear = 0; // 뒤 인덱스
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

  size() {
    return this.rear - this.front;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue);

// 연결리스트로 큐 구현하기
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
    this.size = 0;
  }

  enqueue(newValue) {
    const newNode = new Node(newValue);
    if (this.head == null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;
  }

  dequeue() {
    const value = this.head.value;
    this.head = this.head.next;
    this.size -= 1;
    return value;
  }

  peek() {
    return this.head.value;
  }
}

// shift 를 함부로 쓰지 말자.
// shift 는 선형시간이 소요되기 때문에 큐를 구현할 수 없다.

// circular Queue
// 처음과 끝이 이어져 있는 큐
// 한정된 공간을 효율적으로 이용할 때 사용

class CircularQueue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.queue = [];
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(value) {
    if (this.isFull()) {
      console.log("Queue is full");
      return;
    }
    this.queue[this.front] = value;
    this.rear = (this.rear + 1) % this.maxSize;
    this.size += 1;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front = (this.front + 1) % this.maxSize;
    this.size -= 1;
    return value;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  peek() {
    return this.queue[this.front];
  }
}
