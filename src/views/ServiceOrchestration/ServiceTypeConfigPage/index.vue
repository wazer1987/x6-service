<script setup lang="ts">
import { Edit, CirclePlus, Delete } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import DialogForm from './DialogForm.vue'
import { usePage } from './IndexHooks'
const { states, pageFn, dialogRef } = usePage()
onMounted(() => {
  pageFn.init()
})
</script>

<template>
  <div class="page_container">
    <el-row>
      <el-button :icon="CirclePlus"
                 :loading="states.btnLoading"
                 type="primary"
                 @click="pageFn.add">新增</el-button>
      <el-button :disabled="!states.radioId"
                 :loading="states.btnLoading"
                 :icon="Edit"
                 type="info"
                 @click="pageFn.edit">编辑</el-button>
      <el-button :disabled="!states.radioId"
                 :loading="states.btnLoading"
                 :icon="Delete"
                 type="danger"
                 @click="pageFn.del">删除</el-button>
    </el-row>
    <div class="mt">
      <el-table v-loading="states.tableLoaidng" :data="states.tableData" style="width: 100%">
        <el-table-column width="38">
          <template #default="scope">
            <el-radio class="radio" :label="scope.row.id"
                      v-model="states.radioId"
                      @change="pageFn.change(scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="服务类型"
                         prop="serviceType" />
        <el-table-column label="服务类型值"
                         prop="serviceValue" />
        <el-table-column label="服务属性"
                         prop="serviceProp" />
      </el-table>
      <DialogForm ref="dialogRef" @initList="pageFn.init"/>
    </div>
  </div>
</template>

<style scoped>

</style>
