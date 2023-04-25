import { commonStyele } from './commonStyle'
import set from '@/assets/set.png'
export default {
  width: 80,
  height: 45,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  // tools: commonStyele.tools,
  attrs: {
    rect: {
      fill: commonStyele.body.fill,
      stroke: commonStyele.body.stroke,
      strokeWidth: commonStyele.body.strokeWidth
    },
    image: {
      'xlink:href':
      set,
      width: 10,
      height: 10,
      x: 2,
      y: 2
    },
    text: {
      text: '',
      fontSize: commonStyele.label.fontSize,
      fill: commonStyele.label.fill,
      fontFamily: commonStyele.label.fontFamily,
      textAnchor: commonStyele.label.textAnchor,
      textVerticalAnchor: commonStyele.label.textVerticalAnchor
    }
  }
}
