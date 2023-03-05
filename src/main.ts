import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
// import { GlobalCmComponent } from 'codemirror-editor-vue3'

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// console.log(GlobalCmComponent, '===GlobalCmComponent')
const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app
  .use(ElementPlus, { size: 'small' })

  .use(router)
  .mount('#app')
