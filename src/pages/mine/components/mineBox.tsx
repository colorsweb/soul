/**
  status:
    off: 没有被点开的格子
    on: 被点开的空格子
  num: 格子周围雷的数量
  numColor: num的颜色
  mine：是否是一个雷
  flag：是否是一个旗帜
  offActive：关闭状态时由于点击周围数字而临时获得开启状态的样式
  disabled：游戏结束禁用
  _odds：雷出现的概率
*/
export class MineBox {
  status: string
  num: number
  numColor?: string
  mine: boolean
  flag: boolean
  offActive: boolean
  disabled: boolean
  _odds: number
  constructor(odds: number) {
    this._odds = odds
    this.status = 'off'
    this.flag = false
    this.num = 0
    this.offActive = false
    this.disabled = false
    this.mine = Math.random() <= this._odds
  }

  // 设置数字和颜色
  setNumStyle(n:number,c:string) {
    this.num = n
    this.numColor = c
  }

  // 切换off_active状体
  toggleOffActive() {
    this.offActive = !this.offActive
  }
}