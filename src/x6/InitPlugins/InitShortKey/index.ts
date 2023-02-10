import { Graph } from '@antv/x6'
import { Keyboard } from '@antv/x6-plugin-keyboard'

const keyboard = new Keyboard({
  enabled: true
})

// 快捷键的配置

const initShortKey = (graph:Graph) => {
  console.log('注册了快捷键')
  graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })
}

export {
  initShortKey,
  keyboard
}
