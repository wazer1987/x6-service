<script setup lang="ts">
import { Graph } from '@antv/x6'
import { reactive, ref } from 'vue'
import codeXmlEditor from '@/components/codeXmlEditor.vue'
import { genXML } from '@/gencode/genXML'
import { TabsPaneContext } from 'element-plus'
import item from 'element-plus/es/components/space/src/item'
// @types/codemirror
const states = reactive({
  dialogVisible: false,
  activeName: 'XML',
  xmlCode: '',
  jsonCode: '',
  imgdata: ''
})
const josnREF = ref()

let graph: any
// let xml: any = []
const openDialog = (cavans: Graph) => {
  states.dialogVisible = true
  states.activeName = 'XML'
  graph = cavans
  states.xmlCode = genXML(graph)
  states.jsonCode = JSON.stringify(graph.toJSON(), null, 2)
}

const handleClick = (pane: TabsPaneContext, ev: Event) => {
  // console.log(22222)

  const { paneName } = pane
  console.log(pane, '===pane')

  if (paneName === 'IMG') {
    initImg()
  }
}
const initImg = () => {
  graph.toPNG((dataUri: string) => {
    states.imgdata = dataUri
  })
}
const exportImg = () => {
  graph.exportPNG('1')
}
// eslint-disable-next-line no-undef
defineExpose({
  openDialog
})
</script>

<template>
  <div>
    <el-dialog destroy-on-close class="custom_dialog" v-model="states.dialogVisible" title="预览" :close-on-click-modal="false" width="60%">
      <el-tabs v-model="states.activeName" class="demo-tabs"  @tab-click="handleClick">
        <el-tab-pane label="XML" name="XML">
          <codeXmlEditor codeType="application/xml" v-model:value="states.xmlCode"  height-size="400"/>
          <div style="text-align: center;margin-top:10px">
            <el-button type="primary" @click="states.dialogVisible = false">
            保存XML文件
          </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane  label="JSON" name="JSON">
          <codeXmlEditor  codeType="application/json" v-model:value="states.jsonCode"   height-size="400"/>
          <div style="text-align: center;margin-top:10px">
            <el-button type="primary" @click="states.dialogVisible = false">
            保存JSON文件
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane style="height: 400px;" label="IMG" name="IMG">
          <img :src="states.imgdata" >
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
