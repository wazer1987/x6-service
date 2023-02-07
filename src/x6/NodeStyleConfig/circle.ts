import { commonStyele } from './commonStyle'
export default {
  width: 40,
  height: 40,
  markup: [
    {
      tagName: 'circle',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  attrs: {
    body: {
      fill: commonStyele.body.fill,
      stroke: commonStyele.body.stroke,
      strokeWidth: commonStyele.body.stroke
    },
    label: {
      fontSize: commonStyele.label.fontSize,
      fill: commonStyele.label.fill,
      fontFamily: commonStyele.label.fontFamily,
      textAnchor: commonStyele.label.textAnchor,
      textVerticalAnchor: commonStyele.label.textVerticalAnchor
    }
  }
}