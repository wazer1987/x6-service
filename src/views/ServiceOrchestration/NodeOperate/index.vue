<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { nextTick, reactive, ref, toRaw } from 'vue'
import { getServicePropItem, getItem, SERVICE_KEY } from '@/utils'
import { Check } from '@element-plus/icons-vue'
import { Graph } from '@antv/x6'
const getServicePropList = getServicePropItem()
const drawer = ref(false)
const isNodeOrEdge = ref('')

const activeName = ref('nodeConfig')
// 当前点击的节点实例
const currentNode = ref(null)
let graphcanvas: Graph
// 节点的样式表
const shapeFlag = ref('')
const form = reactive({
  size: {},
  position: {},
  attrs: {},
  id: ''
})

// 节点的业务数据
const servicePropList = ref([])
// 业务数据表单
const serviceForm = ref({})
// 节点的形状样式保存操作
const save = () => {
  currentNode.value.prop('position', { x: Number(form.position.x), y: Number(form.position.y) })
  currentNode.value.prop('size', { width: Number(form.size.width), height: Number(form.size.height) })
  const obj = toRaw(form.attrs)
  currentNode.value.prop('attrs', {
    ...obj,
    body: {
      fill: obj[shapeFlag.value].fill,
      stroke: obj[shapeFlag.value].stroke,
      strokeWidth: obj[shapeFlag.value].strokeWidth
    },
    rect: {
      fill: obj[shapeFlag.value].fill,
      stroke: obj[shapeFlag.value].stroke,
      strokeWidth: obj[shapeFlag.value].strokeWidth
    },
    label: {
      ...obj.label,
      text: obj.text.text
    },
    text: {
      ...obj.text,
      text: obj.text.text
    }

  })
}

// 节点的业务数据保存操作
const saveServieData = () => {
  console.log('保存节点业务数据')
  currentNode.value.setData(serviceForm.value)
}

const serviceListItem = ref({})

// 点击节点初始化 抽屉操作
const openDrawer = (node: any, graph: Graph, nodeOrEdge: string) => {
  isNodeOrEdge.value = nodeOrEdge
  // 当前点击的节点
  currentNode.value = node
  graphcanvas = graph
  // 拿到节点的 样式 宽高等
  const config = node.prop()
  const shapeArr = config.shape.split('-')
  shapeFlag.value = shapeArr[shapeArr.length - 1]
  // 赋值给节点的表单
  Object.assign(form, config)

  // 拿到业务数据

  const { serviceProp } = node.getData()

  // 拿到表单的服务类型和斌方法
  const serviceList = getItem(SERVICE_KEY)
  serviceListItem.value = serviceList.find(item => item.serviceProp === serviceProp)

  servicePropList.value = getServicePropList[serviceProp]
  // 初始化默认值
  servicePropList.value.forEach(item => {
    serviceForm.value[item.prop] = item.value
  })
  currentNode.value.setData(serviceForm.value)
  activeName.value = 'nodeConfig'
  drawer.value = true
}
// 点击的边线实例
const currentEdge = ref(null)
// 边线的表单
const edgeForm = reactive({
  id: '',
  data: '',
  defaultLabel: {},
  shape: '',
  source: '',
  target: '',
  attrs: {}
})

const edgeOpenDrawer = (edge: any, graph: Graph, nodeOrEdge: string) => {
  isNodeOrEdge.value = nodeOrEdge
  currentEdge.value = edge
  graphcanvas = graph
  // 渲染边的样式表单
  const config = edge.prop()
  Object.assign(edgeForm, config)
  // 渲染 表达式的表单
  if (edge.getLabels().length) {
    edgeServiceConfig.lables = edge.getLabels()[0].attrs.label.text
  }

  activeName.value = 'edgeConfig'
  drawer.value = true
}
// 保存边的样式
const saveEdge = () => {
  currentEdge.value.attr('line/stroke', edgeForm.attrs.line.stroke)
  currentEdge.value.attr('line/strokeWidth', Number(edgeForm.attrs.line.strokeWidth))
  const attrs = currentEdge.value.getAttrs()
}
// 保存表达式
// 表达式表单
const edgeServiceConfig = reactive({
  lables: ''
})
const saveEdgeService = () => {
  console.log('保存')
  currentEdge.value.setLabels(edgeServiceConfig.lables)
  currentEdge.value.setData({ expression: edgeServiceConfig.lables })
}
// 导出设置
const exportData = () => {
  console.log('导出')
  console.log(graphcanvas.toJSON())
  localStorage.setItem('JSONDATA', JSON.stringify(graphcanvas.toJSON()))
}
const importData = () => {
  const data = JSON.parse(localStorage.getItem('JSONDATA') as string)
  console.log(data)
  graphcanvas.fromJSON(data.cells)
  console.log('导入')
}
const downImg = () => {
  console.log('图片')
}

const NodeId = reactive({
  id: ''
})

const path: any = []
const tinkTraceDeep = (id: string) => {
  const cell = graphcanvas.getCellById(id)
  path.push(cell)
  const allEdge = graphcanvas.getEdges()
  allEdge.forEach(item => {
    if (item.target.cell === id) {
      path.push(item)
      tinkTraceDeep(item.source.cell)
    }
  })
}
const tinkTrace = (id: string) => {
  tinkTraceDeep(NodeId.id)
  path.forEach((item) => {
    if (item.shape === 'custom-edge') {
      item.attr('line/stroke', '#1890ff')
      item.attr('line/strokeDasharray', 5)
      item.attr('line/targetMarker', 'classic')
      item.attr('line/style/animation', 'ant-line 30s infinite linear')
    } else {
      item.attr('body/stroke', '#1890ff')
    }
  })
}
defineExpose({
  openDrawer,
  edgeOpenDrawer
})
</script>

<template>
  <el-drawer class="drawer" v-model="drawer" title="服务编排操作">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane v-if="isNodeOrEdge === 'node'" name="nodeConfig" label="节点设置">
        <el-form :model="form" label-position="left" label-width="100px">
          <el-form-item label="节点id:">
            <el-input disabled v-model="form.id" />
          </el-form-item>
          <el-form-item label="节点宽度:">
            <el-input v-model="form.size.width" />
          </el-form-item>
          <el-form-item label="节点高度:">
            <el-input v-model="form.size.height" />
          </el-form-item>
          <el-form-item label="节点背景色:">
            <el-input v-model="form.attrs[shapeFlag].fill" />
          </el-form-item>
          <el-form-item label="节点名称:">
            <el-input v-model="form.attrs.text.text" />
          </el-form-item>
          <el-form-item label="节点边框颜色:">
            <el-input v-model="form.attrs[shapeFlag].stroke" />
          </el-form-item>
          <el-form-item label="节点边框粗细:">
            <el-input v-model="form.attrs[shapeFlag].strokeWidth" />
          </el-form-item>
          <el-form-item label="节点x坐标:">
            <el-input v-model="form.position.x" />
          </el-form-item>
          <el-form-item label="节点y坐标:">
            <el-input v-model="form.position.y" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Check" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="isNodeOrEdge === 'node'" name="serviceConfig" label="服务编排设置">
        <el-form label-position="left" label-width="100px">
          <el-form-item label="服务类型:">
            <el-input disabled v-model="serviceListItem.serviceType" />
          </el-form-item>
          <el-form-item label="Bean名称:">
            <el-input disabled v-model="serviceListItem.serviceProp" />
          </el-form-item>
        </el-form>
        <el-divider content-position="left">方法入参</el-divider>
        <el-form :model="serviceForm" label-position="left" label-width="100px">
          <el-form-item v-for="item in servicePropList" :key="item.prop" :label="item.name + ':'">
            <el-input v-model="serviceForm[item.prop]" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Check" @click="saveServieData">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="isNodeOrEdge === 'edge'" name="edgeConfig" label="连线设置">
        <el-form :model="edgeForm" label-position="left" label-width="100px">
          <el-form-item label="连线id:">
            <el-input disabled v-model="edgeForm.id" />
          </el-form-item>
          <el-form-item label="起始节点id:">
            <el-input disabled v-model="edgeForm.source.cell" />
          </el-form-item>
          <el-form-item label="目标节点id:">
            <el-input disabled v-model="edgeForm.target.cell" />
          </el-form-item>
          <el-form-item label="连线颜色:">
            <el-input v-model="edgeForm.attrs.line.stroke" />
          </el-form-item>
          <el-form-item label="连线宽度:">
            <el-input v-model="edgeForm.attrs.line.strokeWidth" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Check" @click="saveEdge">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="isNodeOrEdge === 'edge'" name="edgeServiceConfig" label="表达式设置">
        <el-form :model="edgeServiceForm" label-position="left" label-width="100px">
          <el-form-item label="输入表达式值:">
            <el-input v-model="edgeServiceConfig.lables" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Check" @click="saveEdgeService">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="generateConfig" label="生成设置">
        <el-button @click="exportData">导出数据</el-button>
        <el-button @click="importData">导入数据</el-button>
        <el-button @click="downImg">生成图片</el-button>
        <el-button @click="tinkTrace">链路跟踪</el-button>
        <el-input style="margin-top:20px;" v-model="NodeId.id" />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<style scoped lang="scss">
.el-tabs {
  height: 100% !important;
}
</style>
