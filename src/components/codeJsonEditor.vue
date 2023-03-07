
<template>
  <div class="in-coder-panel">
    <textarea style="height: 100% !important;" ref="textareajson" v-model="code"></textarea>
  </div>
</template>

<script>
// 引入全局实例
import _CodeMirror from 'codemirror/lib/codemirror'
// 手动刷新
import 'codemirror/addon/display/autorefresh'
// 核心样式
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/lint/json-lint'

// 折叠代码
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'

// 引入主题后还需要在 options 中指定主题才会生效
// 需要引入具体的语法高亮库才会有对应的语法高亮效果, 目前已动态引入
import 'codemirror/theme/dracula.css'
// 主题样式
import 'codemirror/addon/hint/show-hint.css'

import { reactive, defineComponent, toRefs, getCurrentInstance, onMounted, onBeforeUnmount, watch } from 'vue'

// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/r/r.js'
console.log('看看走了几次')

const codemirrorThemList = []
const requireModules = require.context('codemirror/theme/', false, /\.css$/)
requireModules.keys().forEach(value => {
  const newValue = value.replace(/^\.\//, '').replace(/\.css$/, '')
  codemirrorThemList.push(newValue)
})

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror
let coder = null // 编辑器实例

export default defineComponent({
  name: 'codeJsonEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    heightSize: {
      type: Number,
      default: 500
    },
    scene: {
      type: String,
      default: 'look' // add: 新增； edit: 编辑； look: 查看
    },
    eventType: {
      type: String,
      default: 'blur' // 可用事件'change', 'blur'等等；具体参考codemirror文档
    },
    codeType: {
      type: String

    },
    theme: {
      type: String,
      default: 'dracula' // 编辑器主题色
    }
  },
  setup (props, { emit }) {
    const { proxy } = getCurrentInstance()
    const data = reactive({
      code: props.value, // 内部真实的内容
      // 默认配置
      options: {
        autoRefresh: true,
        mode: props.codeType, // 不设置的话，默认使用第一个引用
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: props.theme,
        // 显示行号
        lineNumbers: true,
        lint: true,
        gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // foldGutter: {
        //   // eslint-disable-next-line new-cap
        //   rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.indent, CodeMirror.fold.comment)
        // },
        readOnly: (props.scene === 'add' || props.scene === 'edit') ? false : 'nocursor' // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
      },
      // 初始化
      initialize: () => {
        console.log('走了几次')
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        coder = CodeMirror.fromTextArea(proxy.$refs.textareajson, data.options)
        const h = props.heightSize + 'px'
        coder.setSize('auto', h)
        // 此处也可使用'change'事件，不过每次书写的过程中都会触发，为了提高性能，故默认使用'blur'
        coder.on(props.eventType, coder => {
          emit('update:value', coder.getValue())
        })

        // CodeMirror.extendMode('xml', {
        //   commentStart: '<!--',
        //   commentEnd: '-->',
        //   newlineAfterToken: function (type, content, textAfter) {
        //     // eslint-disable-next-line no-mixed-operators
        //     return type === 'tag' && />$/.test(content) || /^</.test(textAfter)
        //   }
        // })
      },
      // 动态引入语法高亮库
      importThemDynamic: () => {
        return new Promise(resolve => {
          codemirrorThemList.forEach(value => {
            if (props.theme === value) {
              import(`codemirror/theme/${props.theme}.css`)
              resolve()
            }
          })
        })
      }
    })
    // watch(() => {
    //   return props.value
    // }, () => {
    //   console.log(222)
    // })
    onMounted(() => {
      console.log(222)
      // console.log('value:', props.value)
      data.importThemDynamic().then(() => {
        data.initialize()
      })
    })
    onBeforeUnmount(() => {
      coder.off(props.eventType)
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style>
.in-coder-panel {
  flex-grow: 1;
  display: flex;
  position: relative;
}

.in-coder-panel .CodeMirror {
  flex-grow: 1;
  text-align: left !important;
  z-index: 1;
}

.in-coder-panel .CodeMirror .CodeMirror-code {
  line-height: 20px;
}
</style>
