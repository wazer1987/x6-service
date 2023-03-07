import { Graph } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { initShortKey, keyboard } from './InitShortKey'
import { Export } from '@antv/x6-plugin-export'

export const pluginsConfig = {
  // 快捷键插件
  Keyboard: (graph:Graph) => {
    graph.use(keyboard)
    initShortKey(graph)
  },
  // 左侧拖拽插件
  Selection: (graph:Graph) => {
    graph.use(new Selection({
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
      pointerEvents: 'none',
      className: 'x6-node-selected-aa',
      content: 'sss'
    }))
  },
  // 撤销重做插件
  History: (graph:Graph) => {
    graph.use(new History({
      enabled: true
    }))
  },
  // 复制粘贴插件
  Clipboard: (graph:Graph) => {
    graph.use(
      new Clipboard({
        enabled: true
      })
    )
  },
  Export: (graph:Graph) => {
    graph.use(new Export())
  }
}
