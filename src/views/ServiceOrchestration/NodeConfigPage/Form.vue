<script setup>
import { reactive, ref } from 'vue'
import { getItem } from '@/utils/index'
const form = reactive({
  id: '',
  nodeName: '',
  nodeShape: '',
  serviceType: ''
})
const options = ref([])
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
    <el-form-item label="节点形状:" prop="nodeShape">
      <el-input v-model="form.nodeShape" />
    </el-form-item>
    <el-form-item label="服务类型:" prop="serviceType">
      <el-select style="width:100%;" v-model="form.serviceType">
        <el-option v-for="item in options" :key="item.serviceProp" :label="item.serviceType" :value="item.serviceProp" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
