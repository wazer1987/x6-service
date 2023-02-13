<template>
  <ul class="menu_item_warp">
    <li @mouseenter="(e) => { mouseenter(e, item, index) }" @mouseleave="mouseleave" class="menu_item" :key="index"
      v-for="(item, index) in props.menu" @click="() => {clickFn(item,index)}">
      <span>{{ item.label }}</span>
    </li>
    <MenuNode :style="childStyle" v-if="states.children && states.children.length !== 0" :menu="states.children" />
  </ul>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, reactive } from 'vue'
import MenuNode from './MenuNode.vue'
// 拿到当前组件的实例 上面有父组件的实例
const currentCpn = getCurrentInstance()

// eslint-disable-next-line no-undef
const props = defineProps(
  {
    menu: {
      type: Array,
      default: () => []
    }
  }
)

const states = reactive({
  children: [],
  display: 'none',
  top: 0
})
const childStyle = computed(() => {
  return {
    display: states.display,
    top: states.top + 10 + 'px'
  }
})
const mouseenter = (e, item, index) => {
  states.children = item.children
  states.display = 'block'
  states.top = index * 30
}
// const mouseleave = () => {
//   states.display = 'none'
// }

const clickFn = (item:any, index:number) => {
  const data = {
    item,
    index
  }
  currentCpn.parent?.emit('nodeclick', data)
}
</script>

<style scoped lang="scss">
.menu_item_warp {
  position: relative;

}

.menu_item {
  text-align: center;
  height: 20px;
  width: 80px;
  line-height: 20px;
  padding: 5px 3px;
  cursor: pointer;
  &:hover {
    background: #ebf5ff;
    color: #409eff;
  }
}

</style>
