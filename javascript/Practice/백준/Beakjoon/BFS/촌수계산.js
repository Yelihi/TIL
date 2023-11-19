const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const N = Number(iterator.next().value);
const [start, end] = iterator
  .next()
  .value.split(" ")
  .map((v) => Number(v));
const K = Number(iterator.next().value);

const family = Array.from(Array(N + 1), () => []);
const visited = new Array(N + 1).fill(0);

for (let i = 0; i < K; i++) {
  const [perent, son] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  family[son].push(perent);
  family[perent].push(son);
}

function bfs(start) {
  const queue = [[start, 0]];

  while (queue.length) {
    const [num, count] = queue.shift();
    const connectNum = family[num];
    if (visited[num]) continue;
    if (num === end) return count;
    visited[num] = 1;

    for (let i = 0; i < connectNum.length; i++) {
      let value = connectNum[i];
      if (visited[value]) continue;
      if (value === end) return count + 1;
      queue.push([value, count + 1]);
    }
  }
  return -1;
}

console.log(bfs(start));
