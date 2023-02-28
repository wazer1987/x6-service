<!-- eslint-disable no-undef -->
<script setup>
import ParamsList from '@/components/ParamsList.vue'
import { reactive, ref } from 'vue'

const form = reactive({
  id: '',
  serviceType: '',
  meanName: '',
  serviceParams: [

  ]
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
    <el-form-item label="Bean名称:" prop="meanName">
      <el-input v-model="form.meanName" />
    </el-form-item>
    <el-form-item label="参数:" prop="serviceParams">
      <!-- <ServicePropItem v-model="form.serviceParams" :meanName="form.meanName" v-bind="$attrs"/> -->
      <ParamsList v-model="form.serviceParams" :meanName="form.meanName" v-bind="$attrs"/>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
