
import { Graph, Shape } from '@antv/x6'
// 不同类型节点的样式 线宽 背景颜色 边框等等
import { nodeStyleConfig } from '../../NodeStyleConfig/index'

import { NodeListItem } from '../../CodeTypeConfig/index'
import { initNodeTool } from '../InitNodeTool/index'
import { initCreateNode } from '../InitVreateNode'

// 图标
import set from '@/assets/set.png'
import shandian from '@/assets/shandian.png'
import fuwu from '@/assets/fuwu.png'
import tiaoyong from '@/assets/tiaoyong.png'
const iconList = {
  set,
  shandian,
  tiaoyong,
  fuwu
}
// 链接庄
const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          // 控制连接装是否能拖出来线
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
  rect: (node:NodeListItem) => {
    nodeStyleConfig[node.nodeShape].attrs.image['xlink:href'] = iconList[node.nodeIcon]

    Shape.Rect.config({
      ...nodeStyleConfig[node.nodeShape],
      ports: { ...ports }
    })
  },
  circle: (node:NodeListItem) => {
    Shape.Circle.config({
      ...nodeStyleConfig[node.nodeShape],
      ports: { ...ports }
    })
  },
  polygon: (node:NodeListItem) => {
    Shape.Polygon.config({
      ...nodeStyleConfig[node.nodeShape],
      ports: { ...ports }
    })
  }
}
// 初始化 节点的默认选项
export const initNodeDefaultOptions = (data:any, graph:Graph) => {
  const nodeArray:any = []
  console.log(data, '====data')
  data.forEach((item:NodeListItem) => {
    nodeDefaultConfig[item.nodeShape](item)
    // 注册节点的方法
    initNodeTool(item)
    nodeArray.push(initCreateNode(item, graph))
  })
  return nodeArray
}
