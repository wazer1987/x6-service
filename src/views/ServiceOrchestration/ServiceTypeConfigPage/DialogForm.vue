<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { usePage } from './DialogHooks'
import Form from './Form.vue'
const emits = defineEmits(['initList'])
const { states, pageFn, refFormDom } = usePage(emits)
defineExpose({
  openDialog: pageFn.openDialog
})
</script>

<template>
  <el-dialog v-model="states.dialogVisible" :close-on-click-modal="false" :title="states.title" width="30%">
    <Form ref="refFormDom" :logic="states.flag"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="states.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="pageFn.save" :loading="states.bntLoading">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
