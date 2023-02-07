/* eslint-disable no-new */
import { getConfigList } from '@/utils'
import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { initNodeDefaultOptions } from './InitNode/index'
let graph: Graph
let data :any
let nodeTooLArr:any = []

const initEdge = (graph:any) => {
  Graph.registerEdge(
    'bpmn-edge',
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: '#A2B1C3',
          strokeWidth: 2
        }
      }
    },
    true
  )
  graph.createEdge({
    shape: 'bpmn-edge'
  })
}
export const initX6 = (Dom: HTMLDivElement) => {
  data = getConfigList()
  graph = new Graph({
    container: Dom,
    height: window.innerHeight,

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
      router: 'orth',
      // router: {
      //   name: 'orth',
      //   args: {
      //     padding: 1
      //   }
      // },
      // connector: {
      //   name: 'rounded',
      //   args: {
      //     radius: 8
      //   }
      // },
      anchor: 'center',
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
        radius: 20
      },
      // 初始化了边
      createEdge () {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#ddd',
              strokeWidth: 2, // 线宽
              // 箭头
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8
              }
            }
          },
          zIndex: 0
        })
      },
      // 判断连链接是否有效
      validateConnection ({ targetMagnet }) {
        return !!targetMagnet
      }
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
  // initEdge(graph)
  nodeTooLArr = initNodeDefaultOptions(data, graph)
  initEvent(Dom)
}
const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}
// 初始化事件 节点的鼠标的移入移出
export const initEvent = (Dom: HTMLDivElement) => {
  graph.on('node:mouseenter', () => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
  })
  graph.on('node:mouseleave', () => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
  })
  graph.on('node:click', ({ node }) => {
    console.log('节点被点击')
    console.log(node.getData(), '====node')
  })
}
// 初始化左侧工具栏可拖拽的节点 根据 节点列表取注册
export const initStencil = (Dom: HTMLDivElement) => {
  const stencil = new Stencil({
    title: '服务编排',
    collapsable: true,
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: 180,
    groups: [
      {
        title: '节点',
        name: 'group1'
      }
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55
    }
  })
  Dom.appendChild(stencil.container)

  stencil.load(nodeTooLArr, 'group1')
}
