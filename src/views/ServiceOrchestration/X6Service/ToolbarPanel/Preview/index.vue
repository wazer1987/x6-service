<script setup lang="ts">
import { reactive } from 'vue'

const states = reactive({
  dialogVisible: false
})
const openDialog = () => {
  states.dialogVisible = true
}

const handleClick = () => {
  console.log('点击了tab')
}
// eslint-disable-next-line no-undef
defineExpose({
  openDialog
})
</script>

<template>
  <div>
    <el-dialog class="custom_dialog" v-model="states.dialogVisible" title="预览" :close-on-click-modal="false"
      width="30%">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="states.dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="states.dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-overlay-dialog) {

  .el-dialog__body {
    padding: 10px !important;
  }
}
</style>
