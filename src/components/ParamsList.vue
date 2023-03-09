<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { Plus, SemiSelect, Switch, Finished } from '@element-plus/icons-vue'
import MethodParams from './mehotdParams/index.vue'
import { reactive, computed, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
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
  serviceName: '',
  props: [

  ]
})

const add = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.push({ name: '', prop: '', value: '', flag: true } as never)
}
const del = (index:any) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.modelValue.splice(index, 1)
}
const init = () => {
  if (!props.modelValue.length) {
    add()
  }
}
const openDialog = () => {
  // states.props = []
  dialogStates.dialogVisible = true
  if (props.logic === 'add') {
    init()
  } else if (props.logic === 'edit') {
    // const data = getServicePropItem()
    // states.props = data[props.modelValue]
  }
}

const save = () => {
  emit('update:modelValue', props.modelValue)
  dialogStates.dialogVisible = false
}
const check = (item) => {
  item.flag = !item.flag
}

const value = computed({
  get () {
    return JSON.stringify(props.modelValue)
  },
  set (value) {
    console.log('走到set')

    states.serviceName = value
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div @click="openDialog" style="width:100%;cursor: pointer;" >
    <el-input :autosize="{ minRows: 16, maxRows: 18 }" type="textarea" :model-value="value"  disabled></el-input>
  </div>

  <el-dialog center :close-on-click-modal="false" v-model="dialogStates.dialogVisible" width="50%">
  <el-form  label-position="left" label-width="80px">
    <el-row :gutter="12" v-for="(item,index) in modelValue" :key="index" class="mb">
      <el-col :span="2">
        <el-button @click="add" v-if="index === 0" type="primary" :icon="Plus" circle />
        <el-button  v-else @click="del(index)" type="danger" :icon="SemiSelect" circle />
      </el-col>
      <el-col :span="11">
        <el-form-item label="字段名称:" prop="name">
          <el-input v-model="item.name" />
        </el-form-item>
      </el-col>
      <el-col :span="11" >
        <el-form-item label="字段:" prop="prop">
          <el-input v-model="item.prop" />
        </el-form-item>
      </el-col>
      <el-col :span="2" style="margin-top:10px">
        <el-form-item>
          <el-button type="primary" @click="() => {check(item)}" :icon="Switch" circle />
        </el-form-item>
      </el-col>
      <el-col :span="22" style="margin-top:10px">
        <el-form-item label="默认值:" prop="value">
          <el-input v-if="item.flag" v-model="item.value" />
          <MethodParams v-else v-model="item.value"/>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button :icon="Finished" type="primary" @click="save">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.el-textarea {
  :deep(.el-textarea__inner) {
    cursor: pointer !important;
    pointer-events: none;
  }
}
</style>
