import './MineArea.scss'
import { numInit } from './utils'
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
    interface box {
      status: String
      num: Number
      numColor: String
      mine: Boolean
      flag: Boolean
    }
    const matrix = reactive(Array.from({ length: props.m },
      () => Array.from({ length: props.n }, () => ({ status: 'off', mine: Math.random() <= props.odds, flag: false }))))
    watch(() => matrix, (arr) => {
      numInit(arr, props.m, props.n)
      // console.log(matrix)
    }, { immediate: true })
    /**
      1: 默认没有被点开的格子
      2: 被点开的空格子
    */
    const dealItem = (item: any) => {
      if (item.status === 'off')
        return <span hide>.</span>
      if (item.flag)
        return <div i-mdi="flag" style="color:blue;" />
      if (item.mine)
        return <div i-mdi="mine" style="color:#000;" />
      if (item.num)
        return <span>{item.num}</span>
      return <span hide>.</span>
    }

    const click = (item: any, i: number, j: number) => {
      console.log('click')
      console.log(item, i, j)
      item.status = 'on'
    }
    const dblClick = (item: any, i: number, j: number) => {
      console.log('dblClick')
    }

    // eslint-disable-next-line react/display-name
    return () => (
      <div>
        {matrix.map((arr: any, i: number) => {
          return (
            <div key={i} className="minerow">
              {arr.map((item: any, j: number) => {
                return (
                  <button key={j} w="6" h="6" className={item.status === 'off'
                    ? 'button-off'
                    : 'button-on'}
                  onClick={() => click(item, i, j)}
                  onDblclick={() => dblClick(item, i, j)}
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
