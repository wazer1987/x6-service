import { Graph } from '@antv/x6'

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
    bus.emit(key, cell)
  },
  'node:mouseleave': (key:string, cell:any, Dom:HTMLElement) => {
    const ports = Dom.querySelectorAll(
      '.x6-port-body'
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
    bus.emit(key, cell)
  }
}

export const initEvent = (graph:Graph, Dom:HTMLElement) => {
  for (const key in enventList) {
    graph.on(key, (cell:any) => {
      enventList[key](key, cell, Dom)
    })
  }
}