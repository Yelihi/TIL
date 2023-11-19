const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();
const [start, end] = input.split(" ").map((v) => Number(v));

// dp 로 풀다가 망했음. 그 -1 이라는 부분이 문제. 아니였다면 충분히 dp 로 풀수 있었음

const visited = new Array(100001).fill(0);

function bfs(start) {
  visited[start] = 1;
  const queue = [[start, 0]];

  while (queue.length) {
    const [num, count] = queue.shift();
    if (num === end) return count;
    for (let next of [num + 1, num - 1, num * 2]) {
      if (next < 0 || next > 100000 || visited[next]) continue;
      if (!visited[next]) {
        queue.push([next, count + 1]);
        visited[next] = 1;
      }
    }
  }
}

const answer = bfs(start);
console.log(answer);
