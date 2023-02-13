import { Graph } from '@antv/x6'
import { commonStyele } from '../NodeStyleConfig/commonStyle'

// import mitt from 'mitt'
import { nextTick, ref } from 'vue'
// export const bus = mitt()

const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}
// 右键菜单的实例 上面有打开右键菜单 和隐藏右键菜单的方法
const rightMenuRef = ref()
// 右键的时候 当前的节点或者边
const currentNode = ref()
// 右侧弹框的实例
const nodeOperdeDom = ref()
let canvas:any
const enventList = {
  'node:click': (key:string, cell:any, Dom:HTMLElement) => {
    // bus.emit(key, cell)
  },
  'node:mouseenter': (key:string, cell:any, Dom:HTMLElement) => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
    const { node } = cell
    // node.addTools(commonStyele.tools[0])
    // bus.emit(key, cell)
  },
  'node:mouseleave': (key:string, cell:any, Dom:HTMLElement) => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
    const { node } = cell
    // node.removeTools()
    // bus.emit(key, cell)
  },
  'edge:click': (key:string, cell:any, Dom:HTMLElement) => {
    // bus.emit(key, cell)
  },
  'node:contextmenu': (key:string, cell:any, Dom:HTMLElement) => {
    const { x, y } = cell
    // 获取到当前右击的节点
    currentNode.value = cell
    // 调用 右键菜单的 打开方法
    rightMenuRef.value.openRightMenu(x, y)
  },
  'edge:contextmenu': (key:string, cell:any, Dom:HTMLElement) => {
    const { x, y } = cell
    // 获取到当前右击的节点
    currentNode.value = cell
    // 调用 右键菜单的 打开方法
    rightMenuRef.value.openRightMenu(x, y)
  },
  'blank:click': (key:string, cell:any, Dom:HTMLElement) => {
    rightMenuRef.value.clearRightMenu()
  }
}

// 菜单的配置项
const Menu = [
  { label: '编辑', command: 'edit' },
  { label: '删除', command: 'delete' }
]

// 右键菜单 操作的hook

export const uselogicHook = () => {
  // 点击右键菜单的逻辑
  const rightMenuLogic = {
  // 编辑 拿到当前右键的节点 然后打开 右侧弹框
    edit: () => {
      if (currentNode.value.cell.isNode()) {
        const { node } = currentNode.value
        nodeOperdeDom.value.openDrawer(node, canvas, 'node')
      } else {
        const { edge } = currentNode.value
        console.log(edge)
        nodeOperdeDom.value.edgeOpenDrawer(edge, canvas, 'edge')
      }
    },
    delete: () => {
    // 删除 拿到当前右键的节点 然后打开 删除节点
      if (currentNode.value.cell.isNode()) {
        const { node } = currentNode.value
        canvas.removeNode(node.id)
      } else {
        const { edge } = currentNode.value
        canvas.removeEdge(edge.id)
      }

      rightMenuRef.value.clearRightMenu()
    }
  }
  const menuclick = (data:any) => {
    const { item: { command } } = data
    rightMenuLogic[command]()
  }
  return {
    menuclick,
    rightMenuRef,
    Menu,
    nodeOperdeDom
  }
}

export const initEvent = (graph:Graph, Dom:HTMLElement) => {
  canvas = graph
  for (const key in enventList) {
    graph.on(key, (cell:any) => {
      enventList[key](key, cell, Dom)
    })
  }
}
