// 10억 명은 logn 으로 풀어야 한다.
// 이 문제는 그래서 이진탐색을 풀어야 한다.
// tiems 는 10만이니 선형으로 가능하긴 할 것 같다.

// 우리는 특징 값을 찾는 것이 아니다.
// 우리가 찾는 것은 최소 몇 분에 모든 심사가 끝나는가?

// 조건에 맞는 값을 찾는것을 결정 문제 라고 부른다.
// 이를 해결할 때 사용하는 알고리즘을 파라매트릭 서치 (Parametric Search) 라고 한다.

// 최소 1분에서 10억분 * n 시간 사이 차지
// 면접관들이 몇명을 차지하는가?
// 처리 가능한 입국자가 n보다 작다면 분을 돌려야 하고, 입국자가 n 보다 크다면 분을 낮추어야 한다.
// 면접관이 시간대비 몇명을 처리할 수 있는가.

// 예를 들어 mid 가 30분이라면, 7분걸리는 면접관은 4명을 처리가능하고, 10분걸리는 면접관은 3명처리가 가능하다.
// 30분에 7명을 처리할 수 있는데, 이렇다면 6명처리보다 수가 많이 처리하니 좀 더 시간을 줄일 수 있지 않을까?
// 그렇기에 이진탐색으로 right 값을 mid - 1 하여 다시 처리한다.

// 이렇게 전체 리스트에서 특정 구간을 찾아야하는 경우, 즉 모든 요소 중 x를 만족하는 가장 큰/작은 값 을 만족하는 지점 문제는 파라메트릭 서치 문제일 가능성이 높다.

function solution(n, times) {
  const sortedTimes = times.sort((a, b) => a - b); // nlogn
  let left = 0;
  let right = sortedTimes[sortedTimes.length - 1] * n;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // sum([시간/심사시간])
    const sum = times.reduce((acc, time) => acc + Math.floor(mid / time), 0);

    if (sum < n) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
