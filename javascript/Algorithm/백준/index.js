// 백준에 바꿔서 입력할 버전
// let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");

// 하나의 값을 받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim();

// 한 줄에 공백으로 값이 들어올 때
// let input = require("fs")
//   .readFileSync("example.txt")
//   .toString()
//   .trim()
//   .split("\n");

// 한줄에 하나씩 값이 들어올 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split("\n");

// 첫 번째 줄에 자연수 n 을 받고, 그 다음 줄에 공백으로 구분된 n개의 값들을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split(/\s+/);
// const [n, ...arr] = input;

// 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄에 n개의 줄에 걸쳐 한 줄에 하나의 값을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split('\n');
// const [n, ...arr] = input;

// 디 버그 할때 : node index

// 급할때 사용하는 버전

function BFS(graph, start, visited) {
  // 전체 큐를 선언해준다
  const queue = [];
  // 탐색을 시작할 node 혹은 index 를 넣어준다
  queue.push(start);
  // 동시에 visited 역시 선언해준다(시작지점)
  visited[start] = true;

  // queue 의 길이가 있을때까지
  while (queue.length) {
    // 맨 앞 요소를 빼준다
    const v = queue.shift();

    // 맨 앞 요소와 연결된 나머지 노드들을 순회를 돌아준다
    for (const node of graph[v]) {
      // 방문하지 않았다면
      if (!visited[v]) {
        // node를 queue 에 추가해준다
        queue.push(node);
        // 방문 처리를 해준다
        visited[node] = true;
      }
    }
  }
}

// 다만 queue 를 생성하여 해주는것이 좀 더 효율부분에 있어서 이득이 있다. 다만, 급할때는 그냥 배열로라도 하는게 좋다
// Queue 를 클래스로 선언했다면 메서드로 enqueue, dequeue 가 있을 것이다. 이를 위 push, shift 에 활용해주면 되고 size 메서드를 통해 queue.length 를 대신해주면 된다
