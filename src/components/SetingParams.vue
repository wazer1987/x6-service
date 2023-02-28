<script setup lang="ts">

</script>

<template>
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
</template>

<style scoped>

</style>
