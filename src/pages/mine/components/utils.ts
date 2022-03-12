import { numColorMap, move } from './config'
// 初始化遍历根据地雷生成数字
export const init = (matrix: any, m: number, n: number) => {
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
      matrix[i][j].setNumStyle(mineCount, numColorMap[mineCount])
    }
  }
}

// 点到雷gameover
export const gameover = (matrix: any, m: number, n: number) => {
  console.log('gameover')
  // 遍历matrix，显示所有雷
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j].disabled = true
      if (matrix[i][j].mine) {
        matrix[i][j].status = 'on'
      }
    }
  }
}

// 单击或者双击开启的数字box
export const onNumMineBoxClick = (matrix: any, item: any, i: number, j: number) => {
  let flagNum = 0
  move.forEach((arr) => {
    const [x, y] = [arr[0], arr[1]]
    if (matrix[i + x] && matrix[i + x][j + y]) {
      if (matrix[i + x][j + y].flag)
        if (!matrix[i + x][j + y].mine) {
          flagNum += 1
        } else {
          // gameover
        }
    }
  })

  // 如果旗帜数量小于雷的数量，则周围off盒子闪烁一次
  if (flagNum < item.num) {
    const deps: any[] = []
    move.forEach((arr) => {
      const [x, y] = [arr[0], arr[1]]
      if (matrix[i + x] && matrix[i + x][j + y]) {
        if (matrix[i + x][j + y].status === 'off') {
          deps.push(matrix[i + x][j + y])
          matrix[i + x][j + y].toggleOffActive()
        }
      }
    })
    // 取消off_active状态
    setTimeout(() => {
      deps.forEach((mineBox: any) => mineBox.toggleOffActive())
    }, 130)
  }
}