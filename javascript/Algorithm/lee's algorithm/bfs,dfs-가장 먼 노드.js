// 핵심 키워드는 노드와 간선, 최단경로
// 최단 경로가 제일 큰 경우의 집합을 구하는 문제

function solution(n, edge) {
  // 인접 리스트로 그래프 생성, 간선들이 1부터 시작하니 1번부터 시작하기 위해 n + 1
  const graph = Array.from(Array(n + 1), () => []);

  for (const [src, dest] of edge) {
    // 그래프가 양방향이니 양쪽에서 더해주기
    graph[src].push(dest);
    graph[dest].push(src);
  }

  // 각 정점의 거리를 기록할 수 있도록 배열을 생성한다
  const distance = Array(n + 1).fill(0);
  // 첫 정점의 길이는 1이라고 해주자
  distance[1] = 1;

  // bfs
  const queue = [1];
  while (queue.length > 0) {
    const src = queue.shift();
    for (const dest of graph[src]) {
      // 가지않은 경로
      if (distance[dest] == 0) {
        queue.push(dest);
        distance[dest] = distance[src] + 1;
      }
    }
  }

  const max = Math.max(...distance);
  return distance.filter((item) => item === max).length;
}

// 각각 `그래프, 거리, 방문 체크, 시작 노드 번호, 거리` 입니다.
function dfs(graph, distance, check, src, count) {
  for (const dest of graph[src]) {
    // 방문할 수 있는 노드 순회
    if (distance[dest] > count + 1 && !check[dest]) {
      // 방문이 가능하다면
      check[dest] = true; // dest 노드를 방문합니다.
      distance[dest] = count + 1; // 거리를 갱신합니다.
      dfs(graph, distance, check, dest, count + 1); // 다음 노드로 넘어갑니다. (재귀)
      check[dest] = false; // 방문을 해제합니다.
    }
  }
}

function solution(n, edge) {
  const graph = Array.from(Array(n + 1), () => []);

  for (const [src, dest] of edge) {
    graph[src].push(dest);
    graph[dest].push(src);
  }

  const check = Array(n + 1).fill(false); // 노드를 방문했는지 체크하기 위한 배열
  const distance = Array(n + 1).fill(20001); // 1번 노드와 거리를 기록하기 위한 배열

  check[1] = true; // 1번은 미리 방문
  distance[1] = 1; // 1번 노드 스스로의 거리는 1
  dfs(graph, distance, check, 1, 1); // DFS 시작

  const max = Math.max(...distance.slice(1));
  return distance.filter((item) => item === max).length;
}
