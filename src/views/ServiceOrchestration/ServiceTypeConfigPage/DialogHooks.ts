import { reactive, ref } from 'vue'
import logic from './logic'
export const usePage = (emits:any) => {
  const refFormDom = ref()
  const states = reactive({
    title: '',
    dialogVisible: false,
    flag: '',
    bntLoading: false,
    currentRow: null
  })

  const openDialog = (flag: string, row?: any) => {
    states.dialogVisible = true
    states.flag = flag
    states.title = logic[flag].title
    states.currentRow = row
    logic[states.flag].init(states, refFormDom)
  }

  const save = () => {
    logic[states.flag].fn(states, refFormDom, () => {
      emits('initList')
    })
  }

  const pageFn = {
    save,
    openDialog
  }
  return {
    states,
    pageFn,
    refFormDom
  }
}
