<script setup lang="ts">
import { Edit, CirclePlus, Delete } from '@element-plus/icons-vue'
import DialogForm from './DialogForm.vue'
import { ref } from 'vue'

const radioId:any = ref(null)
let currentRow:any = ref(null)
const DialogFormDom:any = ref(null)
const change = (row:any) => {
  radioId.value = row.id
  currentRow = row
}
const tableData:any = ref([])
tableData.value = [
  { nodeName: '开始', nodeShape: '矩形', serviceType: '1', serviceName: '行内服务', serviceProp: 'aaa', id: '1dddddd' },
  { nodeName: '开始', nodeShape: '矩形', serviceType: '1', serviceName: '远程服务', serviceProp: 'aaa', id: '2' }
]
const addNodeConfig = (): void => {
  DialogFormDom.value.openDialog('add')
}
const editNodeConfig = (): void => {
  DialogFormDom.value.openDialog('edit', currentRow)
}
const delNodeConfig = (): void => {
  console.log('新增节点配置')
}
</script>

<template>
  <div class="page_container">
    <el-row>
      <el-button :icon="CirclePlus"
                 type="primary"
                 @click="addNodeConfig">新增</el-button>
      <el-button :disabled="!radioId"
                 :icon="Edit"
                 type="info"
                 @click="editNodeConfig">编辑</el-button>
      <el-button :disabled="!radioId"
                 :icon="Delete"
                 type="danger"
                 @click="delNodeConfig">删除</el-button>
    </el-row>
    <div class="mt">
      <el-table :data="tableData" style="width: 100%">
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
        <el-table-column label="服务名称"
                         prop="serviceName" />
        <el-table-column label="服务属性"
                         prop="serviceProp" />
      </el-table>
    </div>
    <DialogForm ref="DialogFormDom"/>
  </div>
</template>

<style scoped lang="scss">

</style>
