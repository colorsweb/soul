import './MineArea.scss'
import classnames from 'classnames'
import { dealOpenBox, displayMaxSafeArea, fillMine, gameover, init, onNumMineBoxClick } from './utils'
import { MineBox } from './mineBox'

export default defineComponent({
  name: 'MineArea',
  props: {
    // 行
    m: Number,
    // 列
    n: Number,
    // 雷数
    mineNum: Number,
    // 雷出现的概率
    odds: Number,
    label: String,
    value: Number,
  },
  setup(props: any) {
    // 阻止默认右击事件
    const mine = ref<null | HTMLElement>(null)
    MineBox.mineNum = props.mineNum
    MineBox.totalMineNum = 0
    MineBox.onBoxNum = 0
    MineBox.totalBoxNumber = props.m * props.n
    const matrix = reactive(Array.from({ length: props.m },
      (_,i) => Array.from({ length: props.n }, (_,j) => (new MineBox(props.odds, [i,j])))))
    watch(() => matrix, (matrix) => {
      if (MineBox.totalMineNum < props.mineNum)
        fillMine(matrix, props.m, props.n, props.mineNum)

      console.log(MineBox.totalMineNum)
      init(matrix, props.m, props.n)
    }, { immediate: true })

    const dealItem = (item: any) => {
      if (item.status === 'off' && !item.flag)
        return <span hide>.</span>
      if (item.flag)
        return <div i-mdi="flag" style="color:blue;" />
      if (item.mine)
        return <div i-mdi="mine" style="color:#000;" />
      if (item.num > 0)
        return <span style={{ color: item.numColor }}>{item.num}</span>
      return <span hide>.</span>
    }

    const click = (item: any, i: number, j: number) => {
      if (item.status === 'off' && !item.flag) {
        dealOpenBox(item, matrix)
        if (item.mine)
          gameover(matrix, item)

        if (item.num === 0) {
          // 最大安全区域
          displayMaxSafeArea(matrix, i, j)
        }
        return
      }
      if (item.flag) {
        item.flag = false
        MineBox.totalFlagNumber -= 1
        return
      }
      if (item.num > 0)
        onNumMineBoxClick(matrix, i, j, item)
    }
    const mouseup = (e: MouseEvent, item: any, i: number, j: number) => {
      if (item.flag) {
        item.flag = false
        MineBox.totalFlagNumber -= 1
        return false
      }
      if (e.button === 2 && item.status === 'off' && !item.flag && MineBox.totalFlagNumber < props.mineNum) {
        item.flag = true
        MineBox.totalFlagNumber += 1
        console.log(MineBox.totalFlagNumber)
      }
      return false
    }

    // eslint-disable-next-line react/display-name
    return () => (
      <div ref={mine}>
        {matrix.map((arr: any, i: number) => {
          return (
            <div key={i} className="minerow">
              {arr.map((item: any, j: number) => {
                return (
                  <button key={j} flag={item.flag} w="6" h="6" className={classnames({
                    'button-off': item.status === 'off',
                    'button-on': item.status === 'on',
                    'button-off_active': item.offActive,
                    'button-disabled': item.disabled,
                    'mine_active': item.mineActive
                  })}
                  onClick={() => click(item, i, j)}
                  oncontextmenu={(e: MouseEvent) => mouseup(e, item, i, j)}
                  >{dealItem(item)}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  },
})
