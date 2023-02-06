import { nextTick, toRef } from 'vue'
import { SERVICE_KEY, setItem, getItem } from '@/utils/index'
type Item = {
  title:string,
  fn(states?:any, refFormDom?:any, callback?:() => void):any,
  init:(row?:any, refFormDom?:any) => void
}

interface Logic{
  add:Item,
  edit:Item
}
const logic:Logic = {
  add: {
    title: '新增',
    init (row:any, refFormDom:any) {
      nextTick(() => {
        refFormDom.value.clearForm()
      })
    },
    fn (states?:any, refFormDom?:any, callback?:() => void) {
      states.bntLoading = true
      setTimeout(() => {
        let data = getItem(SERVICE_KEY)
        if (data) {
          data.push(refFormDom.value.form)
        } else {
          data = [refFormDom.value.form]
        }
        setItem(SERVICE_KEY, data)
        callback!()
        states.dialogVisible = false
        states.bntLoading = false
      }, 1000)
    }
  },
  edit: {
    title: '编辑',
    fn (states?:any, refFormDom?:any, callback?:() => void) {
      states.bntLoading = true
      setTimeout(() => {
        const data = getItem(SERVICE_KEY)
        const index = data.findIndex((item:any) => item.id === states.currentRow.id)
        data[index] = refFormDom.value.form
        setItem(SERVICE_KEY, data)
        callback!()
        states.bntLoading = false
        states.dialogVisible = false
      }, 1000)
    },
    init (states:any, refFormDom?:any, callback?:() => void) {
      const data = getItem(SERVICE_KEY)
      const index = data.findIndex((item:any) => item.id === states.currentRow.id)
      nextTick(() => {
        Object.assign(refFormDom.value.form, data[index])
      })
    }
  }
}
export default logic
