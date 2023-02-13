<!-- eslint-disable no-undef -->
<template>
  <div class="rigthmenu_warp" :style="position">
    <MenuItem :menu="props.menu" />
    <div class="top"></div>
  </div>

</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import MenuItem from './MenuItem.vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  menu: {
    type: Array,
    default: () => []
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

const openRightMenu = (x: number, y: number) => {
  if (props.menu.length === 0) return
  states.x = x
  states.y = y
  states.display = 'block'
}
const clearRightMenu = () => {
  states.display = 'none'
}

const mouseenter = () => {
  // openRightMenu(300, 200)
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
  border-radius: 3px;
  padding: 7px 0;
  background: #fff;
  z-index: 999;

}

.top {
  z-index: 1;
  position: absolute;
  top: -5px;
  left: 15px;
  content: '';
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid rgb(149, 149, 149);
  border-bottom-color: transparent !important;
  border-right-color: transparent !important;
  box-sizing: border-box;
  transform: rotate(45deg);
  // clip-path: polygon(0 0, 0% 100%, 100% 50%);
}
</style>
