type item = {
  title:string,
  fn(refForm?:any, currentRow?:any):any
}

interface logic{
  add:item,
  edit:item
}

export default {
  add: {
    title: '新增',
    async fn (refForm: any, currentRow:any) {
      console.log(222)
    }
  },
  edit: {
    title: '编辑',
    fn (refForm: any, currentRow:any) {
      console.log('编辑', refForm)
    }
  }
}
