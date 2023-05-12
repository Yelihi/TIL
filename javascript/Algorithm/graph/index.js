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
