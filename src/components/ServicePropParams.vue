<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { Plus, SemiSelect } from '@element-plus/icons-vue'
import { setItem, getItem } from '@/utils/index'
import { reactive, computed } from 'vue'
const props = defineProps({
  beanName: {
    type: String,
    default: () => ''
  },
  logic: {
    type: String,
    default: () => ''
  }
})
const emit = defineEmits(['update:modelValue'])

const dialogStates = reactive({
  dialogVisible: false
})
const states = reactive({
  props: [

  ]
})

const add = () => {
  states.props.push({ name: '', prop: '', value: '' } as never)
}
const del = (index:any) => {
  states.props.splice(index, 1)
}
const init = () => {
  const data = getItem('METHOD_PARAMS')
  states.props = data[beanName]
  if (!states.props.length) {
    add()
  }
}
const openDialog = () => {
  states.props = []
  dialogStates.dialogVisible = true
  init()
  // if (props.logic === 'add') {
  //   init()
  // } else if (props.logic === 'edit') {
  //   const data = getServicePropItem()
  //   states.props = data[props.modelValue]
  // }
}

const save = () => {
  // let data = getServicePropItem()
  const obj = {}
  obj[states.serviceName] = states.props
  if (!data) {
    data = { ...obj }
  } else {
    data = { ...data, ...obj }
  }
  // setServicePropItem(data)
  dialogStates.dialogVisible = false
}

</script>

<template>
  <div @click="openDialog" style="width:100%;">
    <el-input type="textarea" :model-value="value" disabled ></el-input>
  </div>

  <el-dialog :close-on-click-modal="false" v-model="dialogStates.dialogVisible" width="50%">
  <el-form  label-position="left">
    <el-row :gutter="24" v-for="(item,index) in states.props" :key="item.prop" class="mb">
      <el-col :span="1">
        <el-button @click="add" v-if="index === 0" type="primary" :icon="Plus" circle />
        <el-button  v-else @click="del(index)" type="danger" :icon="SemiSelect" circle />
      </el-col>
      <el-col :span="7">
        <el-form-item label="字段名称:" prop="name">
          <el-input v-model="item.name" />
        </el-form-item>
      </el-col>
      <el-col :span="7" >
        <el-form-item label="字段:" prop="prop">
          <el-input v-model="item.prop" />
        </el-form-item>
      </el-col>
      <el-col :span="9" >
        <el-form-item label="默认值:" prop="value">
          <el-input v-model="item.value" />
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="save">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-input {
  :deep(.el-input__inner) {
    cursor: pointer !important;
  }
}
</style>
