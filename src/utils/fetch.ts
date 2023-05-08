import axios from 'axios'
// const apis = 'http://10.10.1.82:8124'
const apis = ' http://10.100.3.16:8124'
//
export const getNodeList = ():any => {
  return axios.get(apis + '/tbCamelInfo/findNode?')
}
