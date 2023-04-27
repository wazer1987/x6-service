<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'

import { initX6, initStencil } from '@/x6/index'
import { initEvent, uselogicHook } from '@/x6/InitEvent'
import RightMenu from '@/components/RightMenu/RightMenu.vue'
import { Graph } from '@antv/x6'
import SettingPanel from './SettingPanel/index.vue'
import ToolbarPanel from './ToolbarPanel/index.vue'
import { getQueryParam } from '@/utils/index'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const graphcontainer = ref()
const stencil = ref()
const ToolbarPanelRef = ref()
const loading = ref(false)
let graph: Graph

// 查询 xml图
const getXmlImg = (params:any):any => {
  return axios.get('http://10.100.3.16:8124/tbCamelDeploy/findByCode', {
    params
  })
}

onMounted(() => {
  // 获取路由代码id
  const params = getQueryParam()
  sessionStorage.setItem('routerCode', JSON.stringify(params))
  params.routeName = decodeURI(params.routeName)
  loading.value = true
  // 查询图表
  getXmlImg(params).then((res:any) => {
    const { data: { code, retObj } } = res
    if (code === '000000') {
      loading.value = false
      // 第一次进入设计器 没有图表需要绘制 并设置未第一次进入的标识
      if (JSON.stringify(retObj) === '{}') {
        sessionStorage.setItem('flag', '0')
        return ElMessage({ message: '请绘制！', type: 'success' })
      } else {
        // 第二次进入 查回来数据 需要显示在设计器上 并取到状态
        const json = JSON.parse(retObj.routeJson)
        const routerCode = JSON.parse(sessionStorage.getItem('routerCode') as string)
        routerCode.deployStatus = retObj.deployStatus
        sessionStorage.setItem('routerCode', JSON.stringify(routerCode))
        graph.fromJSON(json)
      }
    }
  }).catch((e) => {
    loading.value = false
  })
  // console.log(decodeURI(params.routeName), '===params')

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
  <div v-loading="loading" style="display: flex; position: relative;">
    <!-- 顶部toolbar-panel -->
    <ToolbarPanel ref="ToolbarPanelRef"/>
    <!-- 左侧的拖拽 -->
    <div style="width: 200px;position: relative;border-right: 1px solid #dfe3e8;" ref="stencil"></div>

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
