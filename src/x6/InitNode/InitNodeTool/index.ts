import { Graph } from '@antv/x6'
import { NodeListItem } from '../../CodeTypeConfig/index'
export const initNodeTool = (item:NodeListItem) => {
  Graph.registerNode(`custom-${item.id}-${item.nodeShape}`, {
    inherit: `${item.nodeShape}` // 或 'rect'
  })
}
