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

// 그래프 표현하기
// 예를 들어 Graph 01234 정점이 있고 이에 대한 관계를 표현해야할 때 크게, 인접행렬과 인접리스트로 표현이 가능하다

// 인접행렬

const graph = Array.from(Array(5), () => Array(5).fill(false));
graph[0][1] = true; // 0 -> 1
graph[0][3] = true; // 0 -> 3
graph[1][2] = true; // 1 -> 2
graph[2][0] = true; // 2 -> 0
graph[2][4] = true; // 2 -> 4
graph[4][0] = true; // 4 -> 0

// 인접 리스트 활용 (자바스크립트에서는 배열로 만드는걸 추천한다)
const graph2 = Array.from(Array(5), () => []);
graph2[0].push(1); // 0 -> 1
graph2[0].push(3); // 0 -> 3
graph2[1].push(2); // 1 -> 2
graph2[2].push(0); // 2 -> 0
graph2[2].push(4); // 2 -> 4
graph2[4].push(0); // 4 -> 0

// 트리 역시 위 그래프처럼 구현이 가능하다
// 이진트리의 경우 조금 더 최적화하여 구현할 수 있다. 1차원 배열 혹은 연결리스트로 가능하다

// 이진트리 배열

// 0번 인덱스는 편의를 위해 비워둔다
// Left = Index * 2
// Right = Index * 2 + 1
// Parent = floor(Index/2)
const tree = [
  undefined,
  // 1
  9,
  // 1*2, 1*2+1
  3,
  8,
  // 2*2, 2*2+1, 3*2, 3*2+1
  2,
  5,
  undefined,
  7,
  // 4*2, 4*2+1, 5*2, 5*2+1
  undefined,
  undefined,
  undefined,
  4,
];

// 연결리스트
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }

  display() {
    const queue = new Queue();
    queue.enqueue(this.root);
    while (queue.size) {
      const currentNode = queue.dequeue();
      console.log(currentNode.value);
      if (currentNode.left) queue.enqueue(currentNode.left);
      if (currentNode.right) queue.enqueue(currentNode.right);
    }
  }
}

const tree2 = new Tree(new Node(9));
tree2.root.left = new Node(3);
tree2.root.right = new Node(8);
tree2.root.left.left = new Node(2);
tree2.root.left.right = new Node(5);
tree2.root.right.right = new Node(7);
tree2.root.left.right.right = new Node(4);

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

// 트라이 구현하기

class Node {
  constructor(value = "", last = false) {
    this.value = value;
    this.children = new Map();
    this.last = last;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new Node(currentNode.value + char, true));
      }
      currentNode = currentNode.children.get(char);
    }
  }

  has(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }

    return true;
  }

  serach(string) {
    let currentNode = this.root;

    for (const char of string) {
    }
  }
}

// 이진탐색
// 배열에는 중간에 추가하거나 삭제시 선형시간이 들어간다
// 따라서 탐색 트리를 통해 구현하는 방법이 좋다

// 배열로 구현하기(코딩테스트에서는 이렇게 사용할 것 같음)
function binarySearch(array, findValue) {
  let left = 0;
  let right = array.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (left <= right) {
    if (array[mid] === findValue) {
      return mid;
    }

    if (array[mid] < findValue) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }

    mid = Math.floor((left + right) / 2);
  }
  return -1; // 요소를 찾지 못했다.
}

// 이진 탐색

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class binarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.value < value) {
        if (currentNode.right === null) {
          this.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      } else {
        if (currentNode.left === null) {
          this.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      }
    }
  }

  has(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }

      if (currentNode.value < value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    return false;
  }
}

// BFS, DFS
// 너비우선탐색 - BFS
// 큐를 이용하여 구현할 수 있다. 시작지점에서 가까운 정점부터 탐색한다

// 깊이우선 탐색 - DFS
// 최대한 깊은 정점부터 탐색하는 알고리즘
// stack 을 이용하여 구현할 수 있다.

// 그리디 알고리즘
// 매 선택에서 지금 이 순간 가장 최적인 답을 선택하는 알고리즘
// 최적해를 보장해주진 않는다

// 보통 최적해를 구하는 알고리즘보다 빠른 경우가 많다
// 크루스칼, 다익스트라 알고리즘에 사용된다
// 직관적인 문제에 사용된다
// 되게 동전 반환 문제들이 예시다.

// 그리디 문제의 특징은 직관적이며 숫자가 크다

// 소수 구하기 O(sqrt(n));

function is_prime(num) {
  for (let i = 2; i * i <= num; i += 1) {
    if (num % i == 0) {
      return false;
    }
  }

  return true;
}

// 에라토스테네스의 체
// 2부터 54 중 소수를 구하기

// 가장 먼저 2를 선택한다. 그리고 2의 배수를 선택한다.
// 그 다음 3을 선택하고, 3의 배수수를 선택한다.
// 5를 선택하고 5의 배수를 선택한다.

function get_primes(num) {
  const prime = [false, false, ...Array(num - 1).fill(true)];

  for (let i = 2; i * i <= num; i += 1) {
    if (prime[i]) {
      for (let j = i * 2; j <= num; j += 1) {
        prime[j] = false;
      }
    }
  }

  return prime.filter(boolean);
}

// 재귀함수
// 재귀는 자기 자신을 호출하는 함수
// 자바스크립트에서는 콜스택에 제한이 있다. 크롬에 한해 약 1만개 정도 돌아간다
// 성능 개선을 위한 꼬리 재귀가 제공되지 않는다
// 자바스크립트에서도 재귀는 성능이 좋지 않다.

// 그럼에도 재귀로 작성하면 더 쉽게 코딩테스트 문제가 있기 때문이다.
// (Union-Find, DFS, Backtraking)

function recursion(n) {
  // 기저조건
  if (n > 10) {
    return n;
  }
  return recursion(n + 1);
}

// 피보나치 수열
// 여기서 n 은 항 번호다.
function fibonacc(n) {
  if (n <= 2) {
    return 1;
  }

  return fibonacc(n - 2) + fibonacc(n - 1);
}

// 합병 정렬
const merge = (a, b) => {
  if (a.length === 0) return b;
  else if (b.length === 0) return a;
  else if (a[0] < b[0]) return [a[0], ...merge(a.slice(1), b)];
  else return [b[0], ...merge(a, b.slice(1))];
};

const mergesort = (arr) => {
  if (arr.length < 2) return arr;
  else {
    const mid = Math.floor(arr.length / 2);
    return merge(mergesort(arr.slice(0, mid)), mergesort(arr.slice(mid)));
  }
};

// 전방 순회, 중위 순회, 후방 순회
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = node;
  }

  preorder(currentNode) {
    console.log(currentNode.value);
    if (currentNode.left) this.preorder(currentNode.left);
    if (currentNode.right) this.preorder(currentNode.right);
  }

  inorder(currentNode) {
    if (currentNode.left) this.ineorder(currentNode.left);
    console.log(currentNode.value);
    if (currentNode.right) this.ineorder(currentNode.right);
  }

  postorder(currentNode) {
    if (currentNode.left) this.postorder(currentNode.left);
    if (currentNode.right) this.postorder(currentNode.right);
    console.log(currentNode.value);
  }
}

// 순열 조합
// 자바스크립트에서는 이를 직접 구현해야한다

// 순열과 조헙으로 푸는 문제라면 n 이 크게 나오지 않는다
// 반대로 n 이 크다면 이게 순열과 조합이 아닐수 있음을 인정하자

// 순열
// 시간복잡도 O(n!)
function permutation(arr, n) {
  // 1개만 뽑는다면 그대로 순열을 반환한다. 탈출 조건으로 사용된다.
  if (n === 1) return arr.map((v) => [v]);
  let result = [];

  // 요소를 순환한다
  arr.forEach((fixed, idx, arr) => {
    // 현재 index를 제외한 요소를 추출한다.
    // index번째는 선택된 요소
    const rest = arr.filter((_, index) => index !== idx);
    // 선택된 요소를 제외하고 재귀 호출한다
    const perms = permutation(rest, n - 1);
    // 선택된 요소와 제귀 호출을 통해 구한 순열을 합쳐준다.
    const combine = perms.map((v) => [fixed, ...v]);
    // 결과값을 추가한다.
    result.push(...combine);
  });

  return result;
}

// 조합
// 시간복잡도 O(2^n)

function combinations(arr, n) {
  // 1개만 뽑는다면 그대로 조합을 반환한다. 탈출 조건으로도 사용된다.
  if (n === 1) return arr.map((v) => [v]);
  let result = [];

  // 요소를 순환한다
  arr.forEach((fixed, idx, arr) => {
    // 현재 index 이후 요소를 추출한다
    // index번째는 선택된 요소
    const rest = arr.slice(idx + 1);
    // 선택된 요소 이전 요소들을 제외하고 재귀 호출한다
    const combis = combinations(rest, n - 1);
    // 선택된 요소와 재귀 호출을 통해 구한 조합을 합쳐준다
    const combine = combis.map((v) => [fixed, ...v]);
    // 결과값에 추가한다
    result.push(...combine);
  });

  return result;
}
