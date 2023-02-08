import { getConfigList, getServicePropItem } from '@/utils'
import { Graph } from '@antv/x6'
import { NodeListItem } from '../../CodeTypeConfig/index'
const getServicePropList = getServicePropItem()

// const initNodeData = (key:string) => {
//   const arr = getServicePropList[key]
//   const obj = {
//     serviceProp: arr
//   }
//   // arr.forEach((item:any) => {
//   //   for (const key in item) {
//   //     if (key === 'name') {
//   //       obj[key] = item.name
//   //     }
//   //     obj[item.prop] = item.value
//   //   }
//   // })
//   return obj
// }
// 左侧添加节点图形
export const initCreateNode = (item:NodeListItem, graph:Graph) => {
  console.log()

  return graph.createNode({
    shape: `custom-${item.id}-${item.nodeShape}`,
    label: `${item.nodeName}`,
    attrs: {
      text: {
        text: `${item.nodeName}`
      }
    },
    data: {
      serviceProp: getServicePropList[item.serviceType]
    }
  })
}
