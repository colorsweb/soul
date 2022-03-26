/**
  status:
    off: 没有被点开的格子
    on: 被点开的空格子
  num: 格子周围雷的数量
  numColor: num的颜色
  mine：是否是一个雷
  flag：是否是一个旗帜
  offActive：关闭状态时由于点击周围数字而临时获得开启状态的样式
  mineActive: 点到雷的红色背景
  disabled：游戏结束禁用
  _odds：雷出现的概率
*/
export class MineBox {
  status: string = 'off'
  coordinate: number[]
  num: number = 0
  numColor?: string
  mine?: boolean
  flag: boolean = false
  offActive: boolean = false
  mineActive: boolean = false
  disabled: boolean = false
  _odds: number
  constructor(odds: number,coordinate: number[]) {
    this._odds = odds
    this.coordinate = coordinate
    if (MineBox.totalMineNum < MineBox.mineNum) {
      // 根据概率生成地雷
      this.mine = Math.random() <= this._odds
      if (this.mine)
        MineBox.totalMineNum += 1
    }
  }

  /**
   * totalMineNum 当前录入的地雷数
   * mineNum 应该录入的地雷数
   * onBoxNum 已经打开的格子
   * totalBoxNumber 格子数
   */
  static totalMineNum = 0
  static mineNum: number
  static onBoxNum = 0
  static totalBoxNumber: number
  static totalFlagNumber: number = 0
  static dealOnBoxNum() {
    MineBox.onBoxNum++
    if (MineBox.onBoxNum === MineBox.totalBoxNumber - MineBox.mineNum)
      return true
    return false
  }

  // 设置数字和颜色
  setNumStyle(n: number, c: string) {
    this.num = n
    this.numColor = c
  }

  // 切换off_active状体
  toggleOffActive() {
    this.offActive = !this.offActive
  }
}
