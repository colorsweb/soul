import { numColorMap, move } from './config'
import {MineBox} from './mineBox'

// 初始化前加满地雷
export const fillMine = (matrix: any, m: number, n: number, mineNum: number) => {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j].mine) continue
      matrix.mine = Math.random() <= matrix._odds
      MineBox.totalMineNum += 1
      if (mineNum === MineBox.totalMineNum) return
    }
  }
  if (MineBox.totalMineNum < mineNum) {
    fillMine(matrix, m, n, mineNum)
  }
}

// 初始化遍历根据地雷生成数字
export const init = (matrix: any, m: number, n: number) => {
  // 记录所有为0的格子坐标
  const safeBoxArr: Array<number>[] = []
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
      if (mineCount === 0) safeBoxArr.push([i, j])
      matrix[i][j].setNumStyle(mineCount, numColorMap[mineCount])
    }
  }
  // 随机打开一个安全（num为0）的盒子
  const idx = Math.floor(Math.random() * safeBoxArr.length)
  displayMaxSafeArea(matrix, safeBoxArr[idx][0], safeBoxArr[idx][1])
}

/**
 * 点到雷
 * 旗帜已经大于雷数，但是没有覆盖到所有雷
 */
export const gameover = (matrix: any) => {
  console.log('gameover')
  const m = matrix.length
  const n = matrix[0].length
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

// 单击开启的数字box
export const onNumMineBoxClick = (matrix: any, i: number, j: number, item: any) => {
  // 旗帜数
  let flagNum = 0
  // 正确的旗帜数
  let trueFlagNum = 0
  move.forEach((arr) => {
    const [x, y] = [arr[0], arr[1]]
    if (matrix[i + x] && matrix[i + x][j + y]) {
      if (matrix[i + x][j + y].flag) {
        flagNum += 1
        if (matrix[i + x][j + y].mine) {
          trueFlagNum += 1
        }
      }
    }
  })

  // 如果旗帜数量小于雷的数量，则周围off盒子闪烁一次
  if (flagNum < item.num) {
    const deps: any[] = []
    move.forEach((arr) => {
      const [x, y] = [arr[0], arr[1]]
      if (matrix[i + x] && matrix[i + x][j + y]) {
        const tempBox = matrix[i + x][j + y]
        if (tempBox.status === 'off' && !tempBox.flag) {
          deps.push(tempBox)
          tempBox.toggleOffActive()
        }
      }
    })
    // 取消off_active状态
    setTimeout(() => {
      deps.forEach((mineBox: any) => mineBox.toggleOffActive())
    }, 100)
  } else {
    if (trueFlagNum < item.num) {
      gameover(matrix)
    } else {
      // todo 最大安全区域
      displayMaxSafeArea(matrix, i, j)
    }
  }
}

/**
 * 打开盒子时添加计数器以及判断是否胜利
 */
export const dealOpenBox = (item:any) => {
  item.status = 'on'
  const res = MineBox.dealOnBoxNum()
  if (res) {
    setTimeout(() => alert('success'),200)
  }
}


/**
 * 展示最大安全区域
 * 把周围非旗帜打开
 * 如果num是0，继续调用
 */
export const displayMaxSafeArea = (matrix: any, i: number, j: number) => {
  move.forEach((arr) => {
    const [x, y] = [arr[0], arr[1]]
    if (matrix[i + x] && matrix[i + x][j + y]) {
      const tempBox = matrix[i + x][j + y]
      if (tempBox.status === 'off' && !tempBox.flag) {
        dealOpenBox(tempBox)
        if (tempBox.num === 0) {
          displayMaxSafeArea(matrix, i + x, j + y)
        }
      }
    }
  })
}