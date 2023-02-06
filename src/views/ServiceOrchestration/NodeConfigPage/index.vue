<script setup lang="ts">
import { Edit, CirclePlus, Delete } from '@element-plus/icons-vue'
import DialogForm from './DialogForm.vue'
import { onMounted, ref } from 'vue'
import { getConfigList, editConfigList } from '@/utils'
const tableLoaidng = ref(false)
const radioId:any = ref(null)
let currentRow:any = ref(null)
const btnLoading = ref(false)
const DialogFormDom:any = ref(null)
const change = (row:any) => {
  radioId.value = row.id
  currentRow = row
}
const tableData:any = ref([])
const init = () => {
  radioId.value = null
  tableLoaidng.value = true
  setTimeout(() => {
    const data = getConfigList()
    tableData.value = getConfigList()
    tableLoaidng.value = false
  }, 1000)
}
onMounted(() => {
  init()
})
const addNodeConfig = (): void => {
  DialogFormDom.value.openDialog('add')
}
const editNodeConfig = (): void => {
  DialogFormDom.value.openDialog('edit', currentRow)
}
// 删除逻辑
const delNodeConfig = (): void => {
  btnLoading.value = true
  const data = getConfigList()
  const index = data.findIndex((item:any) => item.id === radioId.value)
  data.splice(index, 1)
  editConfigList(data)
  btnLoading.value = false
  init()
}
</script>

<template>
  <div class="page_container">
    <el-row>
      <el-button :icon="CirclePlus"
                 :loading="btnLoading"
                 type="primary"
                 @click="addNodeConfig">新增</el-button>
      <el-button :disabled="!radioId"
                 :loading="btnLoading"
                 :icon="Edit"
                 type="info"
                 @click="editNodeConfig">编辑</el-button>
      <el-button :disabled="!radioId"
                 :loading="btnLoading"
                 :icon="Delete"
                 type="danger"
                 @click="delNodeConfig">删除</el-button>
    </el-row>
    <div class="mt">
      <el-table v-loading="tableLoaidng" :data="tableData" style="width: 100%">
        <el-table-column width="38">
          <template #default="scope">
            <el-radio class="radio" :label="scope.row.id"
                      v-model="radioId"
                      @change="change(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="节点名称"
                         prop="nodeName" />
        <el-table-column label="节点形状"
                         prop="nodeShape" />
        <el-table-column label="服务类型"
                         prop="serviceType" />
      </el-table>
    </div>
    <DialogForm @initList="init" ref="DialogFormDom"/>
  </div>
</template>

<style scoped lang="scss">

</style>
