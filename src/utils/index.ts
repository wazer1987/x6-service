export const getConfigList = () => {
  return JSON.parse(localStorage.getItem('nodeList') as string)
}

export const setConfigList = (value:any):void => {
  const data = getConfigList()
  if (data) {
    data.push(value)
    localStorage.setItem('nodeList', JSON.stringify(data))
  } else {
    localStorage.setItem('nodeList', JSON.stringify([value]))
  }
}

export const SERVICE_KEY = 'serviceList'

export const editConfigList = (data:any) => {
  localStorage.setItem('nodeList', JSON.stringify(data))
}

export const getItem = (key:string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}

export const setItem = (key:string, value:any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// 服务属性
export const SERVICE_PROP_KEY = 'serviceList'

export const getServicePropItem = () => {
  return JSON.parse(localStorage.getItem(SERVICE_PROP_KEY) as string)
}

export const setServicePropItem = (data:any) => {
  localStorage.setItem(SERVICE_PROP_KEY, JSON.stringify(data))
}

const getQuery = (str:any) => {
  const arr = str.split('&')
  // result为存储参数键值的集合
  const result = {}
  for (let i = 0; i < arr.length; i++) {
    // item的两个元素分别为参数名和参数值
    const item = arr[i].split('=')
    result[item[0]] = item[1]
  }
  return result
}

// 根据url参数 获取值
export const getQueryParam = ():any => {
  const hash = window.location.hash

  const index = hash.indexOf('?')

  const str = hash.substring(index + 1, hash.length)

  if (str.indexOf('=') !== -1) {
    return getQuery(str)
  }

  return undefined
}
// 去seesion 取路由代码 替换json
export const replaceJSON = (json:any) => {
  console.log(json, '==json')
  const routerCode = JSON.parse(sessionStorage.getItem('routerCode') as string).routeCode
  console.log(routerCode, '===routerCode')
  for (let index = 0; index < json.length; index++) {
    if (json[index].data.meanName === 'from') {
      json[index].data.serviceParams[0].value = routerCode
      break
    }
  }
  return json
}
