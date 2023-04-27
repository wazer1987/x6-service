<script setup lang="ts">
import logo from '@/assets/logo.png'
import { Graph } from '@antv/x6'
import { onMounted, ref } from 'vue'
import { toolbarMenu, toolbarMenuFn } from './ToolBarMenu'
import Preview from './Preview/index.vue'
import { replaceJSON } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

let graph: Graph
const init = (cavans) => {
  graph = cavans
}
const versionFlag = ref(false)

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
      console.log(data, '===data')
      if (data.code === '000000') {
        return ElMessage({ message: data.message, type: 'success' })
      } else {
        return ElMessage({ message: data.message, type: 'warning' })
      }
    }).catch((e) => {
      return ElMessage({ message: '失败', type: 'warning' })
    })
  } else {
    const deployStatus = JSON.parse(sessionStorage.getItem('routerCode') as string).deployStatus
    const title = deployStatus === '0' ? '保存原图' : '升级版本号'
    const titleInfo = deployStatus === '0' ? '请保存绘制好的服务编排图' : '点击升级版本会生成一个新的版本服务编排图,点击保存原图即在原有版本上保存服务编排图'
    ElMessageBox.confirm(titleInfo, title, {
      distinguishCancelAndClose: true,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      // 已经发布的 才会显示升级版本号
      confirmButtonText: deployStatus === '0' ? '' : '升级版本',
      cancelButtonText: '保存原图'
    })
      .then((value) => {
        updateJSON({ cells: jsonData }, '1').then(res => {
          const { data } = res
          if (data.code === '000000') {
            window.opener.postMessage('getTableList', 'http://10.100.3.38:9084')
            return ElMessage({ message: data.message, type: 'success' })
          } else {
            return ElMessage({ message: data.message, type: 'warning' })
          }
        }).catch((e) => {
          return ElMessage({ message: '失败', type: 'warning' })
        })
      })
      .catch((e) => {
        console.log(e, '===e')
        if (e === 'cancel') {
          updateJSON({ cells: jsonData }, '0').then(res => {
            const { data } = res
            if (data.code === '000000') {
              return ElMessage({ message: data.message, type: 'success' })
            } else {
              return ElMessage({ message: data.message, type: 'warning' })
            }
          }).catch((e) => {
            return ElMessage({ message: '失败', type: 'warning' })
          })
        }
      })
  }
}

const apis = 'http://10.100.3.16:8124/tbCamelDeploy'
// const apis = 'http://10.10.2.109:8124/tbCamelDeploy'

// 调用后台接口保存JSON
const saveJSON = (json:any):any => {
  return axios.post(apis, {
    jsonStr: json,
    routeCode: JSON.parse(sessionStorage.getItem('routerCode') as string).routeCode,
    routeVersion: JSON.parse(sessionStorage.getItem('routerCode') as string).routeVersion,
    bankCode: '01121'
  })
}

const updateJSON = (json:any, overflag:string) => {
  return axios({
    method: 'PUT',
    url: apis,
    data: {
      jsonStr: json,
      routeCode: JSON.parse(sessionStorage.getItem('routerCode') as string).routeCode,
      routeVersion: JSON.parse(sessionStorage.getItem('routerCode') as string).routeVersion,
      bankCode: '01121',
      overflag
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
