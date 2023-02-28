<script setup lang="ts">
import { Graph } from '@antv/x6'
import { reactive } from 'vue'
import { initServiceProp, splicingParams } from '@/utils/serviceprop'
const states = reactive({
  dialogVisible: false,
  activeName: 'User'
})
let graph:any
const openDialog = (cavans:Graph) => {
  states.dialogVisible = true
  graph = cavans
  console.log(graph.getCells(), '===cell')

  // initXML()
}

const arrStr = []

const initXML = () => {
  const rootnode = rootNode()

  genXML(rootnode)
  console.log(arrStr.join(''))
}
const genXML = (rootnode:any) => {
  const children = genNeighbors(rootnode)
  if (children.length === 0) return
  if (children.length > 1) {
    arrStr.push(genChoice(children))
  } else if (children.length === 1) {
    arrStr.push(genTo(children[0]))
  }
  // children.forEach((child:any) => {
  //   genXML(child)
  // })
}

// 生成to模板的方法
const toTempLate = (child:any) => {
  // 获取节点名称
  const { text: { text } } = child.getAttrs()
  // 拿到mean方法名称
  const { serviceProp } = child.getData()
  // 如果 你的 serviceForm是个空对象 那就需要初始化如果不是 就直接返回
  const formData = initServiceProp(child)
  return `<to id='${text}' uri="bean:${serviceProp}?method=doProcess(*,*,${splicingParams(formData)})">`
}

// to的入口函数
const genTo = (child) => {
  return toTempLate(child)
}
// when模板的方法
const whenTempalte = (child:any) => {
  return `
   <when>
    ${toTempLate(child)}
   </when>`
}

// 生成choice标签
const genChoice = (children:any) => {
  let template = '<choice>'
  // return whenTempalte(child)
  children.forEach((child:any) => {
    template += whenTempalte(child)
  })
  template += '\r\n</choice>\r\n'
  return template
}

// 查找当前节点下的子节点
const genNeighbors = (node:any) => {
  const nodes = graph.getNeighbors(node, { deep: false, outgoing: true })
  return nodes
}

// 找到根节点
const rootNode = () => {
  const root = graph.getRootNodes()
  const id = root[0].id
  const node = graph.getCellById(id)
  return root[0]
  // 返回所有的根节点
  // const root = graph.getRootNodes()
  // console.log(root, '===root')

  // 可以获取所有的终点 就是没有输出边的节点
  // console.log(graph.getLeafNodes(), '====getLeafNodes')
  // const node1 = graph.getCellById('35927f1b-c340-4a20-aa73-116f85aae7ce')

  // const node2 = graph.getCellById('d66a3ff3-d005-456a-ac05-84ede03c1a77')
  // 可以获取 一条线上的所有节点
  // console.log(graph.getPredecessors(node2, {
  //   deep: true
  // }))
  // 获取自己所有两端的节点
  // const node3 = graph.getCellById('7090c5a0-08ed-428a-902d-4c7c16895d96')
  // console.log(graph.getNeighbors(node3), '===getNeighbors')

  // 获取当前节点下的所有子孙节点 是个数组
  // const node4 = graph.getCellById('35927f1b-c340-4a20-aa73-116f85aae7ce')
  // console.log(graph.getSuccessors(node4, { breadthFirst: true }), '====getSuccessors1')

  // const node5 = graph.getCellById('88d5f3ff-6f4e-4457-b56c-f93391c65047')
  // console.log(graph.getNeighbors(node5, { indirect: true, outgoing: true }))
  // const root = graph.getRootNodes()
  // const node = graph.getCellById(root[0].id)
  // const id = root[0].id
  // const nodes = graph.getNeighbors(node, { deep: false, outgoing: true })
  // console.log(nodes, '===nodes1')
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
    <el-dialog class="custom_dialog" v-model="states.dialogVisible" title="预览" :close-on-click-modal="false"
      width="30%">
      <el-tabs v-model="states.activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
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
