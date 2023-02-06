<!-- eslint-disable no-undef -->
<script setup>
import { reactive, ref } from 'vue'
const form = reactive({
  id: '',
  serviceType: '',
  serviceValue: '',
  serviceProp: ''
})
const formRef = ref(null)
const clearForm = () => {
  formRef.value.resetFields()
}
defineExpose({
  form,
  clearForm
})
</script>

<template>
  <!-- <el-button @click="test">点击</el-button> -->
  <el-form ref="formRef" :model="form" label-width="90px" label-position="left">
    <el-form-item label="服务ID:" prop="id">
      <el-input v-model="form.id" />
    </el-form-item>
    <el-form-item label="服务类型:" prop="serviceType">
      <el-input v-model="form.serviceType" />
    </el-form-item>
    <el-form-item label="服务类型值:" prop="serviceValue">
      <el-input v-model="form.serviceValue" />
    </el-form-item>
    <el-form-item label="服务属性:" prop="serviceProp">
      <el-input v-model="form.serviceProp" />
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
