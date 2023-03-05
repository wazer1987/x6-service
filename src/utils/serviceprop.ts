
// 格式化 方法入参的方法
const formatValue = (data:any) => {
  const arr:any = []
  data = JSON.parse(data)
  data.forEach((item:any) => {
    let str = ''
    for (const key in item) {
      if (!item[key]) {
        continue
      }
      str += `${item[key]}:`
    }
    str = str.substring(0, str.length - 1)
    arr.push(str)
  })

  return arr
}

// 初始化表单的方法
const initServicePropForm = (options:any) => {
  const obj = {}
  options.forEach((item:any) => {
    if (item.flag) {
      obj[item.prop] = item.value
    } else {
      obj[item.prop] = formatValue(item.value).join(',')
    }
  })
  return obj
}

export const initServiceProp = (node:any) => {
  // 拿到 属性key名称
  let { servicePropForm, servicePropOptions } = node.getData()
  if (Object.keys(servicePropForm).length > 0) {
    return servicePropForm
  } else {
    servicePropForm = initServicePropForm(servicePropOptions)
  }
  return servicePropForm
}

// 拼接参数的方法
export const splicingParams = (obj:any) => {
  const arr = []
  for (const key in obj) {
    arr.push(`'${obj[key]}'`)
  }
  return arr.join()
}

export const formatParams = (serviceParams:any) => {
  // console.log(serviceParams, '==serviceParams')

  const paramsArr:any = []
  let typeParams = ''
  let currentIndex:any
  serviceParams.forEach((item:any, index:number) => {
    if (item.flag) {
      paramsArr.push(item.value)
    } else {
      if (!paramsArr[index]) {
        currentIndex = index
      }
      typeParams += formatValue(item.value)[0] + ','
    }
  })
  typeParams = typeParams.substring(0, typeParams.length - 1)
  paramsArr[currentIndex] = typeParams
  return paramsArr
}
