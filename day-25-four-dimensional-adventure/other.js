function parseInput(input: string) {
  return input.split("\n").map(l => l.split(",").map(v => parseInt(v)));
}

function solve(data: ReturnType<typeof parseInput>) {
  const n = data.length;
  const visited = data.map(_ => false);

  const dist = (a, b) =>
    Math.abs(a[0] - b[0]) +
    Math.abs(a[1] - b[1]) +
    Math.abs(a[2] - b[2]) +
    Math.abs(a[3] - b[3]);
  const dfs = (ind: number) => {
    visited[ind] = true;
    for (let i = 0; i < n; ++i) {
      if (!visited[i] && dist(data[ind], data[i]) <= 3) {
        dfs(i);
      }
    }
  };

  let cnt = 0;
  for (let i = 0; i < n; ++i) {
    if (!visited[i]) {
      ++cnt;
      dfs(i);
    }
  }
  return cnt;
}

console.log(solve(parseInput(input)));
