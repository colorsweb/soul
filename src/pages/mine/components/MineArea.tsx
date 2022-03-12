import './MineArea.scss'
import { init, onNumMineBoxClick, gameover } from './utils'
import { MineBox } from './mineBox'
import classnames from 'classnames'

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
    const mine = ref(null)
    // onMounted(() => {
    //   mine.value.oncontextmenu = () => {
    //     return false
    //   }
    // })

    const matrix = reactive(Array.from({ length: props.m },
      () => Array.from({ length: props.n }, () => (new MineBox(props.odds)))))
    watch(() => matrix, (arr) => {
      init(arr, props.m, props.n)
    }, { immediate: true })

    const dealItem = (item: any) => {
      if (item.status === 'off')
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
      if (item.status === 'off') {
        item.status = 'on'
        if (item.mine) {
          gameover(matrix, props.m, props.n)
          return
        }
        return
      }
      if (item.flag) {
        item.flag = false
        return
      }
      if (item.num > 0) {
        onNumMineBoxClick(matrix, item, i, j)
      }
    }
    const mouseup = (e: MouseEvent, item: any, i: number, j: number) => {
      console.log(e.button)
      if (e.button === 2) {
        console.log('右键点击')
      }
    }

    // eslint-disable-next-line react/display-name
    return () => (
      <div ref="mine">
        {matrix.map((arr: any, i: number) => {
          return (
            <div key={i} className="minerow">
              {arr.map((item: any, j: number) => {
                return (
                  <button key={j} w="6" h="6" className={classnames({
                    'button-off': item.status === 'off',
                    'button-on': item.status === 'on',
                    'button-off_active': item.offActive,
                    'button-disabled': item.disabled
                  })}
                    onClick={() => click(item, i, j)}
                    onMouseup={(e) => mouseup(e, item, i, j)}
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
