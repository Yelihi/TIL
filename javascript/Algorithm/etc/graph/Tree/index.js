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
