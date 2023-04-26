<script setup lang="ts">
import logo from '@/assets/logo.png'
import { Graph } from '@antv/x6'
import { onMounted, ref } from 'vue'
import { toolbarMenu, toolbarMenuFn } from './ToolBarMenu'
import Preview from './Preview/index.vue'
import { replaceJSON } from '@/utils'
import { ElMessage } from 'element-plus'
import axios from 'axios'

let graph: Graph
const init = (cavans) => {
  graph = cavans
}

// 调用保存 去后台保存
const save = (graph:Graph) => {
  const flag = sessionStorage.getItem('flag')
  console.log(typeof flag, '===flag')

  const { cells } = graph.toJSON()
  if (cells.length <= 1) return ElMessage({ message: '不符合规则', type: 'warning' })
  // 在开始节点上添加路由代码 发送给后台
  const jsonData = replaceJSON(cells)

  // 第一次保存掉这个接口
  if (flag === '0') {
    saveJSON({ cells: jsonData }).then((res) => {
      const { data } = res
      if (data.code === '000000') {
        return ElMessage({ message: data.message, type: 'success' })
      } else {
        return ElMessage({ message: data.message, type: 'warning' })
      }
    })
  } else {
    updateJSON({ cells: jsonData }).then(res => {
      const { data } = res
      if (data.code === '000000') {
        return ElMessage({ message: data.message, type: 'success' })
      } else {
        return ElMessage({ message: data.message, type: 'warning' })
      }
    })
  }
}

// 调用后台接口保存JSON
const saveJSON = (json:any):any => {
  return axios.post('http://10.100.3.16:8124/tbCamelDeploy', {
    jsonStr: json,
    routeCode: JSON.parse(sessionStorage.getItem('routerCode') as string).routeCode,
    routeVersion: JSON.parse(sessionStorage.getItem('routerCode') as string).routeVersion,
    bankCode: '01121'
  })
}

const updateJSON = (json:any) => {
  return axios({
    method: 'PUT',
    url: 'http://10.100.3.16:8124/tbCamelDeploy',
    data: {
      jsonStr: json,
      routeCode: JSON.parse(sessionStorage.getItem('routerCode') as string).routeCode,
      routeVersion: JSON.parse(sessionStorage.getItem('routerCode') as string).routeVersion,
      bankCode: '01121'
    }
  })
}
// 更新的时候调用的接口

// 文件框组件
const fileREF = ref()
// 弹框相关
const previewRef = ref()

const commadClick = (item: any) => {
  if (item.command === 'upload') {
    fileREF.value.click()
    return
  }
  if (item.command === 'preview') {
    previewRef.value.openDialog(graph)
    return
  }
  if (item.command === 'save') {
    save(graph)
    return
  }
  toolbarMenuFn[item.command](graph)
}

const changeFile = ({ target }) => {
  const files = target.files[0]
  const reader = new FileReader()
  reader.readAsText(files, 'UTF-8')
  reader.onload = function (e) {
    // 文件内容字符串
    // eslint-disable-next-line camelcase
    const file_string = e.target.result
    graph.fromJSON(JSON.parse(file_string))
  }
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
    <input ref="fileREF" @change="changeFile" accept=".json" type="file" style="display: none;">
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
