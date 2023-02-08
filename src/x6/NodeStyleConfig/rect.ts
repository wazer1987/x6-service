import { commonStyele } from './commonStyle'
export default {
  width: 70,
  height: 35,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  attrs: {
    rect: {
      fill: commonStyele.body.fill,
      stroke: commonStyele.body.stroke,
      strokeWidth: commonStyele.body.strokeWidth
    },
    text: {
      fontSize: commonStyele.label.fontSize,
      fill: commonStyele.label.fill,
      fontFamily: commonStyele.label.fontFamily,
      textAnchor: commonStyele.label.textAnchor,
      textVerticalAnchor: commonStyele.label.textVerticalAnchor
    }
  }
}
