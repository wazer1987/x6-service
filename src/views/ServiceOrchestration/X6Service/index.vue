<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initX6, initStencil } from '@/x6/index'
const graphcontainer = ref()
const stencil = ref()
onMounted(() => {
  initX6(graphcontainer.value)
  initStencil(stencil.value)
})
</script>

<template>
<div style="display: flex;">
  <div  style="width: 180px;position: relative;border-right: 1px solid #dfe3e8;" ref="stencil"></div>
  <div  style="width: calc(100% - 180px);height: 100%;" ref="graphcontainer"></div>
</div>
</template>

<style scoped>

</style>
