<script setup lang="ts">
import { Graph } from '@antv/x6'
import { reactive } from 'vue'
import { initServiceProp, splicingParams, formatParams } from '@/utils/serviceprop'
import Codemirror from 'codemirror-editor-vue3'
// @types/codemirror
const states = reactive({
  dialogVisible: false,
  activeName: 'first',
  xmlCode: ''
})

let graph: any
let xml: any = []
const openDialog = (cavans: Graph) => {
  states.dialogVisible = true
  states.activeName = 'first'
  graph = cavans
  xml = []
  const root = rootNode()
  genXMLEntry(root)
  console.log(xml, '===xml')
  states.xmlCode = xml.reverse().join('\r\n')
}

const genXMLEntry = (node: any): any => {
  const nextNodes = genNeighbors(node)
  console.log(nextNodes, '===nextNodes')
  if (nextNodes.length === 0) return
  if (nextNodes.length > 1) {
    console.log('这里说明我下一个节点是分支')
    let choise = '<choice>'
    nextNodes.forEach((item: any) => {
      choise += genWhenTempLate(item)
    })
    choise += '\r\n</choice>\r\n'
    xml.push(choise)
  } else {
    console.log('这里说明我下一个节点是一个')
    const to = genToTempLate(nextNodes[0])
    return to
  }
}
// when 的模板
const genWhenTempLate = (node: any) => {
  return `
  <when>
    ${genToTempLate(node)}
  </when>`
}
const genToTempLate = (node: any) => {
  let to = ''
  const { text: { text } } = node.getAttrs()

  // 拿到mean方法名称
  const { meanName, serviceParams } = node.getData()

  // 如果 你的 serviceForm是个空对象 那就需要初始化如果不是 就直接返回
  const formData = formatParams(serviceParams)
  to = `<to id='${text}' uri="bean:${meanName}?method=doProcess(*,*,${splicingParams(formData)}})">`
  const nextTo = genXMLEntry(node)
  if (nextTo) {
    return to + '\n' + nextTo
  }
  return to
}

// // 查找当前节点下的子节点
const genNeighbors = (node: any) => {
  const nodes = graph.getNeighbors(node, { deep: false, outgoing: true })
  return nodes
}
const cmOptions = {
  mode: 'text/html', // language mode
  theme: 'monokai', // theme
  smartIndent: false,
  readOnly: true
}
// 找到根节点
const rootNode = () => {
  const root = graph.getRootNodes()
  return root[0]
}

const handleClick = () => {
  console.log('点击了tab')
}
// eslint-disable-next-line no-undef
defineExpose({
  openDialog
})
</script>

<template>
  <div>
    <el-dialog class="custom_dialog" v-model="states.dialogVisible" title="预览" :close-on-click-modal="false" width="60%">
      <el-tabs v-model="states.activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="XML" name="first">
          <Codemirror v-model:value="states.xmlCode" :options="cmOptions" border placeholder="test placeholder" :height="400"/>
        </el-tab-pane>
        <el-tab-pane label="JSON" name="second">Config</el-tab-pane>
        <el-tab-pane label="图片" name="second">Config</el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="states.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="states.dialogVisible = false">
            保存
          </el-button>
        </span>
      </template>
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
