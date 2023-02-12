<template>
  <ul class="menu_item_warp">
    <li @mouseenter="(e) => { mouseenter(e, item, index) }" @mouseleave="mouseleave" class="menu_item" :key="index"
      v-for="(item, index) in props.menu" @click="item.clickFn">
      <span>{{ item.label }}</span>
    </li>
    <!-- <ul class="menu_item_children" :style="childStyle" v-if="states.children && states.children.length !== 0">
      <li class="menu_item_children_item" v-for="child in states.children" :key="child.label">
        <span>{{ child.label }}</span>
      </li>
    </ul> -->
    <MenuNode :style="childStyle" v-if="states.children && states.children.length !== 0" :menu="states.children" />
  </ul>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import MenuNode from './MenuNode.vue'
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
}
</style>
