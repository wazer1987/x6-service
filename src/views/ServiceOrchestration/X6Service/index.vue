<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initX6, initStencil } from '@/x6/index'
import { initEvent, bus } from '@/x6/InitEvent'
import RightMenu from '@/components/RightMenu/index.vue'
import { Graph } from '@antv/x6'
import NodeOperde from '../NodeOperate/index.vue'
const graphcontainer = ref()
const stencil = ref()
const nodeOperdeDom = ref()
// 点击节点的时候打开抽屉
const open = (node:any, graph:Graph, nodeOredge:string) => {
  nodeOperdeDom.value.openDrawer(node, graph, nodeOredge)
}
// 点击边的时候 打开抽屉
const edgeOpen = (edge:any, graph:Graph, nodeOredge:string) => {
  nodeOperdeDom.value.edgeOpenDrawer(edge, graph, nodeOredge)
}
let graph:Graph
onMounted(() => {
  graph = initX6(graphcontainer.value)
  initStencil(stencil.value)
  initEvent(graph, graphcontainer.value)
})

bus.on('node:click', (cell:any) => {
  const { node } = cell
  open(node, graph, 'node')
})

bus.on('edge:click', (cell:any) => {
  console.log('点击了边')

  const { edge } = cell
  edgeOpen(edge, graph, 'edge')
})

const rightMenuRef = ref()
bus.on('node:contextmenu', (cell:any) => {
  const { x, y } = cell
  rightMenuRef.value.openRightMenu(x, y)
})
bus.on('blank:click', () => {
  rightMenuRef.value.clearRightMenu()
})
</script>

<template>
<div style="display: flex; position: relative;">
  <div  style="width: 180px;position: relative;border-right: 1px solid #dfe3e8;" ref="stencil"></div>
  <div  style="width: calc(100% - 180px);height: 100%;" ref="graphcontainer"></div>
  <NodeOperde ref="nodeOperdeDom"/>
  <RightMenu ref="rightMenuRef" />
</div>
</template>

<style scoped>

</style>
