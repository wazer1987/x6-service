import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/nodeconfig'
  },
  {
    path: '/nodeconfig',
    name: 'nodeconfig',
    component: () => import('@/views/ServiceOrchestration/NodeConfigPage/index.vue')
  },
  {
    path: '/x6service',
    name: 'x6service',
    component: () => import('@/views/ServiceOrchestration/X6Service/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
