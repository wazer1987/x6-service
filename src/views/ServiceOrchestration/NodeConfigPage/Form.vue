<script setup>
import { reactive, ref } from 'vue'
const form = reactive({
  id: '',
  nodeName: '',
  nodeShape: '',
  serviceType: '',
  serviceProp: ''
})
const formRef = ref(null)
const clearForm = () => {
  formRef.value.resetFields()
}
// const test = () => {
//   form = {
//     id: 3
//   }
// }
// eslint-disable-next-line no-undef
defineExpose({
  form,
  clearForm
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
    <el-form-item label="节点形状:" prop="nodeShape">
      <el-input v-model="form.nodeShape" />
    </el-form-item>
    <el-form-item label="服务类型:" prop="serviceType">
      <el-input v-model="form.serviceType" />
    </el-form-item>
    <el-form-item label="服务属性:" prop="serviceProp">
      <el-input v-model="form.serviceProp" />
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
