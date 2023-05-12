### DFS, BFS

<p>자바스크립트에서는 DFS 는 되도록 stack 을 통해 구현하는것이 좋다. 하지만 상황에 따라서는 재귀를 활용해야 할 수있기에 입력 조건이 너무 큰 경우가 아니라면 재귀가 편한 상황에 재귀를 사용해보자. </p>

- 순열

```js
function permutation(arr) {
  const result = [];

  //DFS
  const dfs = (i, arr) => {
    //base condition
    if (i === arr.legnth) {
      return result.push([...arr]);
    }

    for (let j = i; j < arr.length; j++) {
      //swap
      [arr[i], arr[j]] = [arr[j], arr[i]];
      //dfs
      dfs(i + 1, arr);
      //swap back
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };
  dfs(0, arr);
  return result;
}
```
