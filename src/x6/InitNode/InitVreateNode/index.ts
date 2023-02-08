import { getConfigList, getServicePropItem } from '@/utils'
import { Graph } from '@antv/x6'
import { NodeListItem } from '../../CodeTypeConfig/index'
const getServicePropList = getServicePropItem()
const initNodeData = (key:string) => {
  const arr = getServicePropList[key]
  const obj = {}
  arr.forEach((item:any) => {
    for (const key in item) {
      if (key === 'name') {
        obj[key] = item.name
      }
      obj[item.prop] = item.value
    }
  })
  return obj
}
// 左侧添加节点图形
export const initCreateNode = (item:NodeListItem, graph:Graph) => {
  return graph.createNode({
    shape: `custom-${item.id}-${item.nodeShape}`,
    label: `${item.nodeName}`,
    attrs: {
      label: {
        text: `${item.nodeName}`
      }
    },
    data: initNodeData(item.serviceType)
  })
}
