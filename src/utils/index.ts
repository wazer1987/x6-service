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
