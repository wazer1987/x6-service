import { Graph } from '@antv/x6'
import { commonStyele } from '../NodeStyleConfig/commonStyle'

import mitt from 'mitt'
export const bus = mitt()

const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

const enventList = {
  'node:click': (key:string, cell:any, Dom:HTMLElement) => {
    bus.emit(key, cell)
  },
  'node:mouseenter': (key:string, cell:any, Dom:HTMLElement) => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
    const { node } = cell
    // node.addTools(commonStyele.tools[0])
    bus.emit(key, cell)
  },
  'node:mouseleave': (key:string, cell:any, Dom:HTMLElement) => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
    const { node } = cell
    // node.removeTools()
    bus.emit(key, cell)
  },
  'edge:click': (key:string, cell:any, Dom:HTMLElement) => {
    bus.emit(key, cell)
  }
}

// tools: [
//   {
//     name: 'button-remove',
//     args: {
//       x: '100%',
//       y: 0,
//       offset: { x: 10, y: 0 }
//     }
//   }
// ]

export const initEvent = (graph:Graph, Dom:HTMLElement) => {
  for (const key in enventList) {
    graph.on(key, (cell:any) => {
      enventList[key](key, cell, Dom)
    })
  }
}
