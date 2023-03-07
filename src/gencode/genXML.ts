import { Graph } from '@antv/x6'
import { splicingParams, formatParams } from '@/utils/serviceprop'
let xml: any = []
let graph:Graph
export const genXML = (canvase:Graph) => {
  xml = []
  graph = canvase
  const root = rootNode()
  const toStr = genXMLEntry(root)

  if (toStr) {
    xml.push(toStr)
    return routeTemplate(xml.join('\r\n'))
  } else {
    return routeTemplate(xml.reverse().join('\r\n'))
  }
}

const routeTemplate = (content:string) => {
  const root = rootNode()
  const { text: { text } } = root.getAttrs()
  const { meanName } = root.getData()
  return `<route  id='${meanName}'>
  <from id='${text}' uri='direct:${meanName}' />
  ${content}
</route>`
}

// 找到根节点
const rootNode = () => {
  const root = graph.getRootNodes()
  return root[0]
}
// 生成xml入口
const genXMLEntry = (node: any): any => {
  const nextNodes = genNeighbors(node)
  if (nextNodes.length === 0) return
  if (nextNodes.length > 1) {
    let choise = '<choice>'
    nextNodes.forEach((item: any) => {
      choise += genWhenTempLate(item)
    })
    choise += '\r\n</choice>\r\n'
    xml.push(choise)
  } else {
    const to = genToTempLate(nextNodes[0])
    return to
  }
}
// when 的模板
const genWhenTempLate = (node: any) => {
  return `
  <when>
    ${genToTempLate(node)}
  </when>`
}
const genToTempLate = (node: any) => {
  let to = ''
  const { text: { text } } = node.getAttrs()

  // 拿到mean方法名称
  const { meanName, serviceParams } = node.getData()

  // 如果 你的 serviceForm是个空对象 那就需要初始化如果不是 就直接返回
  const formData = formatParams(serviceParams)
  to = `<to id='${text}' uri="bean:${meanName}?method=doProcess(*,*,${splicingParams(formData)})" />`
  const nextTo = genXMLEntry(node)
  if (nextTo) {
    return `${to} 
        ${nextTo}`
  }
  return to
}

// // 查找当前节点下的子节点
const genNeighbors = (node: any) => {
  const nodes = graph.getNeighbors(node, { deep: false, outgoing: true })
  return nodes
}
