import { Graph } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
import { initShortKey, keyboard } from './InitShortKey'
export const pluginsConfig = {
  Keyboard: (graph:Graph) => {
    graph.use(keyboard)
    initShortKey(graph)
  },
  Selection: (graph:Graph) => {
    graph.use(new Selection({
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
      pointerEvents: 'none'
    }))
  }
}
