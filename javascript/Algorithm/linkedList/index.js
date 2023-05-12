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
