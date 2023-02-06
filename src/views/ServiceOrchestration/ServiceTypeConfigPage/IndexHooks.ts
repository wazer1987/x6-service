
import { getItem, SERVICE_KEY, setItem } from '@/utils'
import { nextTick, reactive, ref } from 'vue'

const states = reactive({
  tableLoaidng: false,
  radioId: null,
  currentRow: null,
  btnLoading: false,
  title: '',
  tableData: []
})
const dialogRef:any = ref()
const change = (row:any) => {
  states.radioId = row.id
  states.currentRow = row
}

const init = () => {
  states.tableLoaidng = true
  setTimeout(() => {
    const data = getItem(SERVICE_KEY)
    states.tableData = data
    states.tableLoaidng = false
  }, 1000)
}

const add = () => {
  dialogRef.value.openDialog('add', states.currentRow)
}
const edit = () => {
  dialogRef.value.openDialog('edit', states.currentRow)
}
const del = () => {
  const data = getItem(SERVICE_KEY)
  const index = data.findIndex((item:any) => item.id === states.radioId)
  data.splice(index, 1)
  setItem(SERVICE_KEY, data)
  init()
}
const pageFn = {
  change,
  add,
  edit,
  del,
  init
}
export const usePage = () => {
  return {
    states,
    pageFn,
    dialogRef
  }
}
