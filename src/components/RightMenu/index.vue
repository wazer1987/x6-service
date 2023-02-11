<!-- eslint-disable no-undef -->
<template>
  <ul class="rigthmenu_warp" :style="position">
    <!-- <li class="menu_item" :key="index" v-for="(item, index) in props.menu" @click="item.clickFn">{{ item.label }}</li> -->
    <el-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
      <span>111</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </ul>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  menu: {
    type: Array,
    default: () => [
      {
        label: '菜单1',
        clickFn: () => {
          console.log('点击了菜单1')
        }
      },
      { label: '菜单2', clickFn: () => { console.log('点击了菜单2') } }
    ]
  }
})

const states = reactive({
  x: 0,
  y: 0,
  display: 'none'
})
const position = computed(() => {
  return {
    top: states.y + 10 + 'px',
    left: states.x + 180 + 'px',
    display: states.display
  }
})

const dropdown1 = ref()

const openRightMenu = (x: number, y: number) => {
  states.x = x
  states.y = y
  states.display = 'block'
  dropdown1.value.handleOpen()
}
const clearRightMenu = () => {
  states.display = 'none'
  dropdown1.value.handleClose()
}
// eslint-disable-next-line no-undef
defineExpose({
  openRightMenu,
  clearRightMenu
})
</script>

<style scoped lang="scss">
.rigthmenu_warp {
  position: absolute;
  border: 1px solid rgb(149, 149, 149);
  display: none;
  border-radius: 3px;
  // overflow: hidden;
  padding: 5px 0;
  background: #fff;

  .menu_item {
    text-align: center;
    height: 20px;
    width: 80px;
    line-height: 20px;
    padding: 5px 3px;
    cursor: pointer;
  }
}

.rigthmenu_warp::after {

  position: absolute;
  top: -5px;
  left: 15px;
  content: '';
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid rgb(149, 149, 149);
  box-sizing: border-box;
  transform: rotate(45deg);
  // clip-path: polygon(0 0, 0% 100%, 100% 50%);
}
</style>
