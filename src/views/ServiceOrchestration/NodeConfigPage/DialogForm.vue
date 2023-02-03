<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import status from './logic'
import Form from './Form.vue'
const pageStatus = reactive({
  dialogVisible: false,
  bntLoading: false
})
const title = ref('')
const statusFlag = ref('')
const bntLoading = ref(false)
let currentRow = reactive({})
const refFormDom = ref(null)
const openDialog = (flag:string, row?:any):void => {
  pageStatus.dialogVisible = true
  title.value = status[flag].title
  statusFlag.value = flag
  currentRow = row
}
const save = async () => {
  pageStatus.bntLoading = true
  await status[statusFlag.value].fn(refFormDom.value, currentRow)
  pageStatus.bntLoading = false
  pageStatus.dialogVisible = false
}
defineExpose({
  openDialog
})
</script>

<template>
    <el-dialog
    v-model="pageStatus.dialogVisible"
    :title="title"
    width="30%"
  >
    <Form  ref="refFormDom" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="pageStatus.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="bntLoading">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
