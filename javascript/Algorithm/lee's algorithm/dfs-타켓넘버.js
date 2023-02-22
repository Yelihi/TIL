// 원래 내가 생각했던 방법은 트리를 생성하여, 그 트리에서 dfs 를 돌려서 타겟값들을 찾아가는 과정이었다
// 하지만 트리를 구현하지 못해서 다른 방법을 찾게 되었다. (참고하엿음)

function solution(numbers, target) {
  let answer = 0;
  let length = numbers.length;
  function DFS(L, sum) {
    if (L === length) {
      if (sum === target) {
        answer++;
      }
    } else {
      DFS(L + 1, sum + numbers[L]);
      DFS(L + 1, sum - numbers[L]);
    }
  }
  DFS(0, 0);
  return answer;
}

// 깔금한 풀이이고 재귀를 어떤식으로 활용하는질 잘 보여줬다 생각한다.
// 다만 binarySearch 를 트리 구현을 하기 위해선
// 다음 식을 참고하자

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
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    } else {
      let current = this.root;
      function traverse(node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        if (node.left === null) {
          let leftNode = new Node(-value);
          let rightNode = new Node(value);
          node.left = leftNode;
          node.right = rightNode;
        }
      }
      traverse(current);
      return this;
    }
  }

  DFS(target) {
    let count = 0;
    let data = 0;
    let current = this.root;
    function traverse(node) {
      data = data + node.value;
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      if (node.left === null) {
        if (target === data) {
          count++;
        }
      }
      // 탐색이 끝나면 마지막 한단계의 덧셈을 빼주자
      data = data - node.value;
    }
    traverse(current);
    return count;
  }
}

function solution(numbers, target) {
  let answer = 0;

  let root = new binarySearchTree();
  root.insert(0);
  for (const num of numbers) {
    root.insert(num);
  }

  answer = root.DFS(target);
  return answer;
}
