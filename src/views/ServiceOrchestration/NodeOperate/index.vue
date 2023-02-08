<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { nextTick, reactive, ref, toRaw } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { Graph } from '@antv/x6'
const drawer = ref(false)
const activeName = ref('nodeConfig')
// 当前点击的节点实例
const currentNode = ref(null)
let graphcanvas:Graph
// 节点的样式表
const shapeFlag = ref('')
const form = reactive({
  size: {},
  position: {},
  attrs: {},
  id: ''
})

const config = {
  angle: 0,
  position: {

  },
  size: {

  },
  attrs: {

  },
  visible: true,
  shape: '',
  id: '',
  zIndex: 1
}

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

// 初始化 抽屉操作
const openDrawer = (node:any, graph:Graph) => {
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
  console.log(node.getData(), '===data')

  const { serviceProp } = node.getData()
  servicePropList.value = serviceProp
  // 初始化默认值
  servicePropList.value.forEach(item => {
    serviceForm.value[item.prop] = item.value
  })
  currentNode.value.setData(serviceForm.value)
  activeName.value = 'nodeConfig'
  drawer.value = true
}

// 导出设置
const exportData = () => {
  console.log('导出')
  console.log(graphcanvas.toJSON())
}
const importData = () => {
  console.log('导入')
}
const downImg = () => {
  console.log('图片')
}

defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer class="drawer" v-model="drawer" title="服务编排操作">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="nodeConfig" label="节点设置">
        <el-form :model="form" label-position="left" label-width="100px">
          <el-form-item  label="节点id:">
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
            <el-button type="primary"  :icon="Check" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane name="edgeConfig" label="连线设置">edgeConfig</el-tab-pane> -->
      <el-tab-pane name="serviceConfig" label="服务编排设置">
        <el-form :model="serviceForm" label-position="left" label-width="100px">
          <el-form-item v-for="item in servicePropList" :key="item.prop" :label="item.name+ ':'">
            <el-input  v-model="serviceForm[item.prop]" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  :icon="Check" @click="saveServieData">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="generateConfig" label="生成设置">
        <el-button @click="exportData">导出数据</el-button>
        <el-button @click="importData">导入数据</el-button>
        <el-button @click="downImg">生成图片</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<style scoped lang="scss">
.el-tabs {
  height:  100% !important;
}
</style>
