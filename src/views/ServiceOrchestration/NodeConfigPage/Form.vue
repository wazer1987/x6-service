<script setup>
import { reactive, ref } from 'vue'
import { getItem } from '@/utils/index'
const form = reactive({
  id: '',
  nodeName: '',
  nodeShape: '',
  serviceType: '',
  nodeIcon: '',
  nodeType: ''
})
const options = ref([])
const shapeOptions = ref([
  { label: '矩形', value: 'rect' },
  { label: '圆形', value: 'circle' },
  { label: '多边形', value: 'polygon' }
])
const nodeIconOptions = ref([
  { label: '齿轮', value: 'set' },
  { label: '闪电', value: 'shandian' },
  { label: '调用', value: 'tiaoyong' },
  { label: '服务', value: 'fuwu' }
])
const nodeTypeOptions = ref([
  { label: '自定义组件', value: 'group1' },
  { label: '标准组件', value: 'group2' }
])
const formRef = ref(null)
const clearForm = () => {
  formRef.value.resetFields()
}
const initOptions = () => {
  options.value = getItem('serviceList')
}

// eslint-disable-next-line no-undef
defineExpose({
  form,
  clearForm,
  initOptions
})
</script>

<template>
  <!-- <el-button @click="test">点击</el-button> -->
  <el-form ref="formRef" :model="form" label-width="70px" label-position="left">
    <el-form-item label="节点ID:" prop="id">
      <el-input v-model="form.id" />
    </el-form-item>
    <el-form-item label="节点名称:" prop="nodeName">
      <el-input v-model="form.nodeName" />
    </el-form-item>
    <el-form-item label="节点类型:" prop="nodeType">
      <el-select style="width:100%;" v-model="form.nodeType">
        <el-option v-for="item in nodeTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="节点形状:" prop="nodeShape">
      <el-select style="width:100%;" v-model="form.nodeShape">
        <el-option v-for="item in shapeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="节点图标:" prop="nodeIcon"  v-if="form.nodeShape === 'rect'">
      <el-select style="width:100%;" v-model="form.nodeIcon">
        <el-option v-for="item in nodeIconOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="服务类型:" prop="serviceType">
      <el-select style="width:100%;" v-model="form.serviceType">
        <el-option v-for="item in options" :key="item.serviceProp" :label="item.serviceType" :value="item.meanName" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
