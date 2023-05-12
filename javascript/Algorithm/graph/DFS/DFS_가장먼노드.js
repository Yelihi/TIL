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
