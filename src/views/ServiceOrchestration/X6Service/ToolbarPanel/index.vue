<script setup lang="ts">
import logo from '@/assets/logo.png'
import { Graph } from '@antv/x6'
import { onMounted, ref } from 'vue'
import { toolbarMenu, toolbarMenuFn } from './ToolBarMenu'
import Preview from './Preview/index.vue'
let graph: Graph
const init = (cavans) => {
  graph = cavans
}
// 弹框相关
const previewRef = ref()

const commadClick = (item: any) => {
  if (item.command === 'preview' || item.command === 'upload' || item.command === 'down') {
    previewRef.value.openDialog(graph)
    return
  }
  toolbarMenuFn[item.command](graph)
}

// eslint-disable-next-line no-undef
defineExpose({
  init
})
</script>

<template>
  <div class="toolbar_container">
    <div>
      <img style="height:30px" :src="logo" alt="">
    </div>
    <div class="toolbar">
      <div class="toolbar_item" v-for="item in toolbarMenu" :key="item.icon" :title="item.label"
        @click="() => { commadClick(item) }">
        <i :class="item.icon"></i>
      </div>
    </div>
    <Preview ref="previewRef" />
  </div>
</template>

<style scoped lang="scss">
.toolbar_container {
  position: absolute;
  padding: 0 30px;
  top: 0;
  left: 0;
  right: 0;
  background: $fbck;
  height: 30px;
  z-index: 99;
  border-bottom: 1px dashed $bordercolor;
  display: flex;

  .toolbar {
    display: flex;
    line-height: 30px;
    padding: 0 50px;
    width: 100%;
    justify-content: center;

    .toolbar_item {
      padding: 0px 5px;
      margin-left: 10px;
      opacity: 0.4;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
