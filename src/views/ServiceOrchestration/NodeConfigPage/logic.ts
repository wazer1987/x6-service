import { getConfigList, setConfigList, editConfigList } from '@/utils/index'
import { reactive, ref, toRefs } from 'vue'
type item = {
  title:string,
  fn(refForm?:any, currentRow?:any, pageStatus?:any, callback?:any):any,
  init(refForm?:any, currentRow?:any, pageStatus?:any):any
}

interface logic{
  add:item,
  edit:item
}

export default {
  add: {
    title: '新增',
    init (refForm: any, currentRow:any, pageStatus?:any) {
      refForm.clearForm()
    },
    fn (refForm: any, currentRow:any, pageStatus?:any, callback?:any) {
      pageStatus.bntLoading = true
      setTimeout(() => {
        setConfigList(refForm.form)
        pageStatus.bntLoading = false
        pageStatus.dialogVisible = false
        callback()
      }, 1000)
    }
  },
  edit: {
    title: '编辑',
    fn (refForm: any, currentRow:any, pageStatus?:any, callback?:any) {
      pageStatus.bntLoading = true
      const { id } = currentRow
      const data = getConfigList()
      const index = data.findIndex((item:any) => item.id === id)
      setTimeout(() => {
        data[index] = refForm.form
        editConfigList(data)
        pageStatus.bntLoading = false
        pageStatus.dialogVisible = false
        callback()
      }, 1000)
    },
    init (refForm: any, currentRow:any, pageStatus?:any) {
      const { id } = currentRow
      let data = getConfigList()
      data = data.filter((item: { id: any }) => {
        return item.id === id
      })
      Object.assign(refForm.form, data[0])
    }
  }
}
