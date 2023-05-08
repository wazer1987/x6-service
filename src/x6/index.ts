/* eslint-disable no-new */
import { getConfigList } from '@/utils'
import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { initEdge } from './InitEdge'
import { initNodeDefaultOptions } from './InitNode/index'
import { initPlugins } from './InitPlugins'
import { getNodeList } from '@/utils/fetch'
let graph: Graph
let data :any
let nodeTooLArr:any = []

export const initX6 = async (Dom: HTMLDivElement) => {
  // data = getConfigList()
  const res = await getNodeList()
  console.log(res, '===res')

  if (res.data.code === '200') {
    data = res.data.retObj
  }
  graph = new Graph({
    container: Dom,
    height: window.innerHeight,
    // 是否启用平移画布
    panning: {
      enabled: true,
      modifiers: 'shift',
      eventTypes: ['leftMouseDown']
    },
    grid: {
      size: 10,
      visible: true,
      type: 'mesh', // 'dot' | 'fixedDot' | 'mesh'
      args: {
        color: '#e0e0e0', // 网格线/点颜色
        thickness: 1 // 网格线宽度/网格点大小
      }
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3
    },

    connecting: {
      // 如果你的边有拐点的话 那么他会让每一条边尽量保持垂直或者水平
      router: {
        name: 'er',
        args: {
          offset: 40
        }
      },
      // 线的转角 原话程度
      connector: {
        name: 'rounded',
        args: {
          radius: 8
        }
      },
      // 设置锚点 连线的时候需要一个基准点
      anchor: 'center',
      // 是否允许循环连线  起始点和终点相互连线
      allowLoop: false,
      // connectionPoint: 'anchor',
      // 起始和终止只允许创建一条边
      allowMulti: false,
      // 是否可以链接到画布空白位置
      allowBlank: false,
      // 是否允许 线链接到节点上 而非连接庄上
      allowNode: true,
      // 是否允许 线链接到 连接庄 false 是链接不到链接庄
      allowPort: true,
      // 碰到链接庄的时候 自动吸附
      snap: {
        radius: 10
      },
      // 初始化了边
      createEdge () {
        return this.createEdge({
          shape: 'custom-edge'
        })
      }
      // 判断连链接是否有效
      // validateConnection ({ targetMagnet }) {
      //   return !!targetMagnet
      // }
    },
    // 连线的时候高亮 链接庄的
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF'
          }
        }
      }
    }
  })
  // 初始化插件
  initPlugins(graph)
  // 初始化节点 注册节点 创建节点
  nodeTooLArr = initNodeDefaultOptions(data, graph)
  // 初始化边
  initEdge()

  return graph
}

// 初始化左侧工具栏可拖拽的节点 根据 节点列表取注册
export const initStencil = (Dom: HTMLDivElement) => {
  const stencil = new Stencil({
    title: '服务编排',
    collapsable: true,
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: 180,
    // stencilGraphPadding: 10,
    groups: [
      {
        title: '自定义组件',
        name: 'group1'
      },
      {
        title: '标准组件',
        name: 'group2'
      }
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 100,
      dx: 5,
      marginX: -8
      // rowHeight: 55,
      // resizeToFit: true

    }
  })
  Dom.appendChild(stencil.container)
  console.log(nodeTooLArr, '===nodeTooLArr')
  // 分组
  const group = {
    group1: [],
    group2: []
  }
  // 匹配分数
  nodeTooLArr.forEach((item:any) => {
    group[item.data.nodeType].push(item)
  })
  // 添加到左侧
  for (const key in group) {
    stencil.load(group[key], key)
  }
}
