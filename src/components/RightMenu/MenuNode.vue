<template>
  <ul class="menu_item_children">
    <li @mouseenter="(e) => { mouseenter(e, child, index) }" class=" menu_item_children_item" @mouseleave="mouseleave"
      v-for="(child, index) in menu" :key="child.label">
      <span>{{ child.label }}</span>
    </li>
    <MenuNode :style="childStyle" v-if="states.children && states.children.length !== 0" :menu="states.children" />
  </ul>
</template>

<script setup lang="ts">import { computed, reactive } from 'vue'
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
    top: states.top + 'px'
  }
})
const mouseenter = (e, item, index) => {
  states.display = 'none'
  states.children = item.children
  states.display = 'block'
  states.top = index * 30 + 10
}

const mouseleave = () => {
  // console.log(item, '====item')
  // states.children = []
  // if (item.children && item.children.length !== 0) return
  // states.display = 'none'

  // states.display = 'none'
}
</script>

<style scoped lang="scss">
.menu_item_children {
  position: absolute;
  background: #fff;
  left: 86px;
  border: 1px solid rgb(149, 149, 149);
  border-radius: 3px;
}

.menu_item_children_item {
  width: 80px;
  line-height: 20px;
  height: 20px;
  padding: 5px 3px;
  text-align: center;
  cursor: pointer;
}
</style>
