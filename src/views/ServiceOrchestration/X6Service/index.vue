<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'

import { initX6, initStencil } from '@/x6/index'
import { initEvent, uselogicHook } from '@/x6/InitEvent'
import RightMenu from '@/components/RightMenu/RightMenu.vue'
import { Graph } from '@antv/x6'
import SettingPanel from './SettingPanel/index.vue'
import ToolbarPanel from './ToolbarPanel/index.vue'
const graphcontainer = ref()
const stencil = ref()
const ToolbarPanelRef = ref()
let graph: Graph

onMounted(() => {
  // 初始化画布 和画布的配置 和插件
  graph = initX6(graphcontainer.value)
  // 初始化 左侧工具栏
  initStencil(stencil.value)
  // 初始化事件
  initEvent(graph, graphcontainer.value)
  // 初始化 顶部导航
  ToolbarPanelRef.value.init(graph)
})
/**
 *  @param menuclick 右键菜单点击的回调
 *  @param rightMenuRef 右键菜单实例DOM 上面有打开显示和隐藏右键菜单的方法
 *  @param nodeOperdeDom 右侧弹出框的实例DOM 上面 有显示 和关闭的方法
 *  @param Menu 右键菜的配置 label 文字 command 用于来判断 是编辑还是删除
 */
const { menuclick, rightMenuRef, Menu, nodeOperdeDom } = uselogicHook()

</script>

<template>
  <div style="display: flex; position: relative;">
    <!-- 顶部toolbar-panel -->
    <ToolbarPanel ref="ToolbarPanelRef"/>
    <!-- 左侧的拖拽 -->
    <div style="width: 180px;position: relative;border-right: 1px solid #dfe3e8;" ref="stencil"></div>

    <!-- 中间的图区域 -->
    <div style="width: calc(100% - 180px);height: 100%;" ref="graphcontainer"></div>

    <!-- 右侧弹框的组件-->
    <SettingPanel ref="nodeOperdeDom" />

    <!-- 右键的按钮 -->
    <RightMenu ref="rightMenuRef" :menu="Menu" @nodeclick="menuclick"/>
  </div>
</template>

<style scoped>

</style>
