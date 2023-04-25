import { Graph } from '@antv/x6'
import { NodeListItem } from '../../CodeTypeConfig/index'
import { getServicePropItem } from '@/utils/index'
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
  // 去服务里面拿服务属性然后找到对应的赋值到节点上
  const servicePropList = getServicePropItem()
  const { meanName, serviceParams, serviceType } = servicePropList.find((propitem:any) => propitem.meanName === item.serviceType)
  return graph.createNode({
    shape: `custom-${item.id}-${item.nodeShape}`,
    label: `${item.nodeName}`,
    attrs: {
      text: {
        text: `${item.nodeName}`
      }
    },
    data: {
      meanName,
      serviceParams,
      servicePropForm: {},
      serviceType,
      nodeType: item.nodeType
    }
  })
}
