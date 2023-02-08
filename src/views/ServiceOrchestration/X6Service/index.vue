<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initX6, initStencil } from '@/x6/index'
import { initEvent, bus } from '@/x6/InitEvent'
import { Graph } from '@antv/x6'
import NodeOperde from '../NodeOperate/index.vue'
const graphcontainer = ref()
const stencil = ref()
const nodeOperdeDom = ref()
// 打开抽屉
const open = (node:any, graph:Graph) => {
  nodeOperdeDom.value.openDrawer(node, graph)
}

let graph:Graph
onMounted(() => {
  graph = initX6(graphcontainer.value)
  initStencil(stencil.value)
  initEvent(graph, graphcontainer.value)
})

bus.on('node:click', (cell:any) => {
  const { node } = cell
  open(node, graph)
})
</script>

<template>
<div style="display: flex;">
  <div  style="width: 180px;position: relative;border-right: 1px solid #dfe3e8;" ref="stencil"></div>
  <div  style="width: calc(100% - 180px);height: 100%;" ref="graphcontainer"></div>
  <NodeOperde ref="nodeOperdeDom"/>
</div>
</template>

<style scoped>

</style>
