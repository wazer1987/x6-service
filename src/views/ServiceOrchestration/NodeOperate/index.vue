<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { nextTick, reactive, ref, toRaw } from 'vue'

const drawer = ref(false)
const activeName = ref('nodeConfig')
const currentNode = ref(null)
const form = reactive({
  size: {},
  position: {},
  attrs: {},
  id: ''
})
const shapeFlag = ref('')
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

const openDrawer = (node:any) => {
  currentNode.value = node
  const config = node.prop()
  console.log(config, '===config')

  const shapeArr = config.shape.split('-')
  shapeFlag.value = shapeArr[shapeArr.length - 1]
  Object.assign(form, config)
  console.log(form, '==form')

  activeName.value = 'nodeConfig'
  drawer.value = true
}
defineExpose({
  openDrawer
})
</script>

<template>
  <el-drawer v-model="drawer" title="服务编排操作">
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
        </el-form>
        <el-button @click="save">保存</el-button>
      </el-tab-pane>
      <el-tab-pane name="edgeConfig" label="连线设置">edgeConfig</el-tab-pane>
      <el-tab-pane name="serviceConfig" label="服务设置">serviceConfig</el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<style scoped>

</style>
