<script setup lang="ts">
import { Graph } from '@antv/x6'
import { reactive, ref } from 'vue'
import codeXmlEditor from '@/components/codeXmlEditor.vue'
import { genXML } from '@/gencode/genXML'
import { TabsPaneContext, ElMessageBox, ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import axios from 'axios'
// @types/codemirror
const states = reactive({
  dialogVisible: false,
  activeName: 'XML',
  xmlCode: '',
  jsonCode: '',
  imgdata: '',
  tableLoaidng: false
})
const josnREF = ref()

let graph: any
// let xml: any = []
const openDialog = (cavans: Graph) => {
  graph = cavans
  const { cells } = graph.toJSON()
  if (cells.length === 0) return ElMessage({ message: '画布中没有节点', type: 'warning' })
  states.dialogVisible = true
  states.activeName = 'XML'
  states.jsonCode = ''
  states.xmlCode = ''
  states.jsonCode = JSON.stringify(graph.toJSON(), null, 2)
  try {
    states.tableLoaidng = true
    // const { data: { retObj: { camelXm } } } = await requestXML(graph.toJSON())
    requestXML(graph.toJSON()).then((res:any) => {
      const { data: { retObj: { camelXml } } } = res
      states.xmlCode = camelXml
      states.tableLoaidng = false
    }).catch(() => {
      states.tableLoaidng = false
    })
  } catch (error) {
    states.tableLoaidng = false
  }

  // console.log(camelXml, '===camelXml')

  // console.log()

  // states.xmlCode = genXML(graph)
  // setTimeout(() => {
  //   states.jsonCode = JSON.stringify(graph.toJSON(), null, 2)
  // }, 1000)
}

const requestXML = (json:any):any => {
  return axios.post('http://10.100.3.16:8124/camelview', { jsonStr: json })
}

const handleClick = (pane: TabsPaneContext, ev: Event) => {
  const { paneName } = pane
  if (paneName === 'IMG') {
    initImg()
  } else if (paneName === 'JSON') {
    states.jsonCode = ''
    states.jsonCode = JSON.stringify(graph.toJSON(), null, 2)
  }
}
// 保存xml文件
const saveXML = () => {
  console.log('保存xml')
  ElMessageBox.prompt('请输入文件名称', '文件名称', {
    confirmButtonText: '保存',
    cancelButtonText: '取消',
    inputErrorMessage: 'Invalid Email'
  })
    .then(({ value }) => {
      console.log('保存成功')
      const blob = new Blob([states.xmlCode], { type: 'application/xml;charset="utf-8"' })
      saveAs(blob, `${value}.xml`)
    })
    .catch(() => {
      console.log('保存失败')
    })
}

const saveJSON = () => {
  console.log('保存JSON')
  ElMessageBox.prompt('请输入文件名称', '文件名称', {
    confirmButtonText: '保存',
    cancelButtonText: '取消',
    inputErrorMessage: 'Invalid Email'
  })
    .then(({ value }) => {
      console.log('保存成功')
      const blob = new Blob([states.jsonCode], { type: 'application/json;charset="utf-8"' })
      saveAs(blob, `${value}.json`)
    })
    .catch(() => {
      console.log('保存失败')
    })
}
// 渲染图片
const initImg = () => {
  graph.toPNG((dataUri: string) => {
    states.imgdata = dataUri
  })
}
// 导出图片
const exportImg = () => {
  ElMessageBox.prompt('请输入图片名称', '图片名称', {
    confirmButtonText: '保存',
    cancelButtonText: '取消',
    inputErrorMessage: 'Invalid Email'
  })
    .then(({ value }) => {
      graph.exportPNG(value)
    })
    .catch(() => {
      console.log('保存失败')
    })
}
// eslint-disable-next-line no-undef
defineExpose({
  openDialog
})
</script>

<template>
  <div>
    <el-dialog destroy-on-close class="custom_dialog" v-model="states.dialogVisible" title="预览" :close-on-click-modal="false" width="60%">
      <el-tabs v-loading="states.tableLoaidng" v-model="states.activeName" class="demo-tabs"  @tab-click="handleClick">
        <el-tab-pane label="XML" name="XML">
          <codeXmlEditor codeType="application/xml" v-model:value="states.xmlCode"  height-size="400"/>
          <div style="text-align: center;margin-top:10px">
            <el-button type="primary" @click="saveXML">
            保存XML文件
          </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane  label="JSON" name="JSON">
          <codeXmlEditor  codeType="application/json" v-model:value="states.jsonCode"   height-size="400"/>
          <div style="text-align: center;margin-top:10px">
            <el-button type="primary" @click="saveJSON">
            保存JSON文件
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="IMG" name="IMG">
          <div style="text-align: center;">
            <img style="width: 100%;" :src="states.imgdata" >
          </div>
          <div style="text-align: center;margin-top:10px">
            <el-button type="primary" @click="exportImg">
            下载图片
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-overlay-dialog) {
  .el-dialog__body {
    padding: 10px !important;
  }
}
</style>
