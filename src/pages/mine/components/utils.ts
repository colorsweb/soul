// 生成数字
const move = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
export const numInit = (matrix: any, m: number, n: number) => {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j].mine) continue
      let mineCount = 0
      move.forEach((arr) => {
        const [x, y] = [arr[0], arr[1]]
        if (matrix[i + x] && matrix[i + x][j + y]) {
          if (matrix[i + x][j + y].mine)
            mineCount += 1
        }
      })
      matrix[i][j].num = mineCount
    }
  }
}
