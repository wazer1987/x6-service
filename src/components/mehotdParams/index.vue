<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Finished } from '@element-plus/icons-vue'

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const states = reactive({
  dialogVisible: false,
  methodParams: '',
  form: {
    paramName: '',
    paramType: '',
    isArray: '',
    isRequired: '',
    isGloble: ''
  },
  paramsArr: [{
    paramName: '',
    paramType: '',
    paramValue: '',
    isArray: '',
    isRequired: '',
    isGloble: ''
  }]
})

const openDialog = () => {
  states.dialogVisible = true
  if (props.modelValue) {
    const arr = JSON.parse(props.modelValue)
    if (arr.length !== 0) {
      states.paramsArr = arr
    } else {
      add()
    }
  }
}
const methodParams = computed({
  get () {
    return props.modelValue
  },
  set (newvalue) {
    console.log(newvalue, '===newvalue')

    emits('update:modelValue', newvalue)
  }
})

const add = () => {
  states.paramsArr.push({
    paramName: '',
    paramType: '',
    paramValue: '',
    isArray: '',
    isRequired: '',
    isGloble: ''
  })
}
const del = () => {
  if (states.paramsArr.length === 1) return
  states.paramsArr.pop()
}

const save = () => {
  methodParams.value = JSON.stringify(states.paramsArr)
  states.dialogVisible = false
}

const isArrayOptions = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
]

const isRequiredOptions = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'M' }
]

const isGlobleOptions = [
  { label: '全局', value: 'G' },
  { label: '局部', value: 'P' },
  { label: '条件', value: 'D' }
]
</script>

<template>
  <div @click="openDialog" class="params_container" style="width:100%">
    <el-input autosize type="textarea" v-model="methodParams" disabled placeholder="请输入方法参数" />
    <el-dialog :close-on-click-modal="false" :append-to-body="true" v-model="states.dialogVisible" title="方法入参" center
      width="40%">
      <el-row><el-button type="primary" style="width:100%;" @click="add">添加一组参数</el-button></el-row>
      <el-divider />

      <el-form :model="states.form" label-position="top" label-width="90px">
        <el-row :gutter="12" v-for="(item,index) in states.paramsArr" :key="index">
          <el-col :span="12">
            <el-form-item label="参数名称:" prop="paramName">
              <el-input v-model="item.paramName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参数类型:" prop="paramType">
              <el-input v-model="item.paramType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参数值:" prop="paramValue">
              <el-input v-model="item.paramValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否数组:" prop="isArray">
              <el-select style="width:100%;" v-model="item.isArray">
                <el-option v-for="item in isArrayOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否必输:" prop="isRequired">
              <el-select style="width:100%;" v-model="item.isRequired">
                <el-option v-for="item in isRequiredOptions" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否全局变量:" prop="isGloble">
              <el-select style="width:100%;" v-model="item.isGloble">
                <el-option v-for="item in isGlobleOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-divider />
        </el-row>

      </el-form>
      <el-row><el-button type="danger" style="width:100%;" @click="del">删除一组参数</el-button></el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="save" :icon="Finished">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<style scoped lang="scss">
.el-textarea {
  :deep(.el-textarea__inner) {
    cursor: pointer;
  }
}
</style>
