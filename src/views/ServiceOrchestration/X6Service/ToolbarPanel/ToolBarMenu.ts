import { Graph } from '@antv/x6'

export const toolbarMenu = [
  { label: '撤销', command: 'crtl+z', icon: 'iconfont git-icon-undo' },
  { label: '重做', command: 'crtl+shift+z', icon: 'iconfont git-icon-redo' },
  { label: '复制', command: 'crtl+c', icon: 'iconfont git-icon-copy' },
  { label: '粘贴', command: 'crtl+v', icon: 'iconfont git-icon-paste' },
  { label: '清空画布', command: 'crtl+shift+c', icon: 'iconfont git-icon-clear' },
  { label: '放大', command: 'crtl++', icon: 'iconfont git-icon-zoom-in' },
  { label: '缩小', command: 'crtl+-', icon: 'iconfont git-icon-zoom-out' },
  { label: '预览', command: 'preview', icon: 'iconfont git-icon-preview' },
  { label: '上传', command: 'upload', icon: 'iconfont git-icon-upload' },
  { label: '下载', command: 'down', icon: 'iconfont git-icon-download' }
]

export const toolbarMenuFn = {
  'crtl+z': (graph:Graph) => {
    graph.undo()
  },
  'crtl+shift+z': (graph:Graph) => {
    graph.redo()
  },
  'crtl+c': (graph:Graph) => {
    const cells = graph.getSelectedCells()
    if (cells && cells.length) {
      graph.copy(cells)
    }
  },
  'crtl+v': (graph:Graph) => {
    const cells = graph.paste()
    graph.cleanSelection()
    graph.select(cells)
  },
  'crtl+shift+c': (graph:Graph) => {
    graph.clearCells()
  },
  'crtl++': (graph:Graph) => {
    graph.zoom(0.2)
  },
  'crtl+-': (graph:Graph) => {
    graph.zoom(-0.2)
  }
}
