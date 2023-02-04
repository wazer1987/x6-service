<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import status from './logic'
import Form from './Form.vue'
import { ElDialog, ElButton } from 'element-plus'
const pageStatus = reactive({
  dialogVisible: false,
  bntLoading: false
})
const title = ref('')
const statusFlag = ref('')
let currentRow = reactive({})
const refFormDom = ref()
const emits = defineEmits(['initList'])
const openDialog = (flag: string, row?: any): void => {
  pageStatus.dialogVisible = true
  title.value = status[flag].title
  statusFlag.value = flag
  currentRow = row
  nextTick(() => {
    status[statusFlag.value].init(refFormDom.value, currentRow, pageStatus)
  })
}
const save = () => {
  status[statusFlag.value].fn(refFormDom.value, currentRow, pageStatus, () => {
    emits('initList')
  })
}
defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog v-model="pageStatus.dialogVisible" :close-on-click-modal="false" :title="title" width="30%">
    <Form ref="refFormDom" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="pageStatus.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="pageStatus.bntLoading">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
