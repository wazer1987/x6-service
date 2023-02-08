
import { Graph, Shape } from '@antv/x6'
// 不同类型节点的样式 线宽 背景颜色 边框等等
import { nodeStyleConfig } from '../../NodeStyleConfig/index'

import { NodeListItem } from '../../CodeTypeConfig/index'
import { initNodeTool } from '../InitNodeTool/index'
import { initCreateNode } from '../InitVreateNode'
// 链接庄
const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#000',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#000',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#000',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#000',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      group: 'top'
    },
    {
      group: 'right'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
}
// 配置节点的默认配置 和样式 链接装等等
const nodeDefaultConfig = {
  rect: (type:string) => {
    Shape.Rect.config({
      ...nodeStyleConfig[type],
      ports: { ...ports }
    })
  },
  circle: (type:string) => {
    Shape.Circle.config({
      ...nodeStyleConfig[type],
      ports: { ...ports }
    })
  },
  polygon: (type:string) => {
    Shape.Polygon.config({
      ...nodeStyleConfig[type],
      ports: { ...ports }
    })
  }
}
// 初始化 节点的默认选项
export const initNodeDefaultOptions = (data:any, graph:Graph) => {
  const nodeArray:any = []

  data.forEach((item:NodeListItem) => {
    nodeDefaultConfig[item.nodeShape](item.nodeShape)
    // 注册节点的方法
    initNodeTool(item)
    nodeArray.push(initCreateNode(item, graph))
  })
  return nodeArray
}
