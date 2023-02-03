<script setup lang="ts">
import { reactive } from 'vue'
const form = reactive({
  id: '',
  nodeName: '',
  nodeShape: '',
  serviceType: '',
  serviceName: '',
  serviceProp: ''
})
// eslint-disable-next-line no-undef
defineExpose({
  form
})
</script>

<template>
  <el-form :model="form" label-width="70px" label-position="left">
    <el-form-item label="节点ID:">
      <el-input v-model="form.id" />
    </el-form-item>
    <el-form-item label="节点名称:">
      <el-input v-model="form.nodeName" />
    </el-form-item>
    <el-form-item label="节点形状:">
      <el-input v-model="form.nodeShape" />
    </el-form-item>
    <el-form-item label="服务类型:">
      <el-input v-model="form.serviceType" />
    </el-form-item>
    <el-form-item label="服务属性:">
      <el-input v-model="form.serviceProp" />
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
