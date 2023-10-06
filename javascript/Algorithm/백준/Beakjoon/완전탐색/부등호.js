const sol = (input) => {
  const N = +input[0];
  const inequality = input[1].split(" ");
  const visit = new Array(10).fill(0);
  let max = String(Number.MIN_SAFE_INTEGER);
  let min = String(Number.MAX_SAFE_INTEGER); // min, max를 문자열 형태로 선언한다.

  function dfs(L, prev, result) {
    if (L === N) {
      // L=N 이라면 모든 부등호가 사용 된 것
      max = result > max ? result : max;
      min = result < min ? result : min;
      return;
    }
    if (inequality[L] === "<") {
      for (let i = prev + 1; i < 10; i++) {
        // 부등호가 < 이면 전 숫자보다 큰 숫자에서 사용 가능 여부를 판단
        if (visit[i]) continue;
        visit[i] = 1;
        dfs(L + 1, i, result + i); // result + i 는 문자열이다. 즉, "02" + "1" => "021" 형태.
        visit[i] = 0; // 재귀적으로 visit 배열을 계속 사용해야 하므로 사용 가능 여부를 없애고 재귀가 끝나면 다시 부여한다.
      }
    } else {
      for (let i = prev - 1; i > -1; i--) {
        // 부등호가 > 이면 전 숫자보다 작은 숫자에서 사용 가능 여부를 판단
        if (visit[i]) continue;
        visit[i] = 1;
        dfs(L + 1, i, result + i);
        visit[i] = 0;
      }
    }
    return;
  }

  for (let i = 0; i < 10; i++) {
    // 첫 숫자가 0~9까지 모두 조회하면 된다.
    visit[i] = 1;
    dfs(0, i, `${i}`);
    visit[i] = 0;
  }

  return `${max}\n${min}`;
};

// 백준에서 입력을 받는 코드
const input = [];
require("readline")
  .createInterface(process.stdin, process.stdout)
  .on("line", (line) => {
    input.push(line);
  })
  .on("close", () => {
    console.log(sol(input));
    process.exit();
  });
